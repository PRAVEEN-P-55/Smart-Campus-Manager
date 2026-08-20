import bcrypt from "bcryptjs";
import cors from "cors";
import dotenv from "dotenv";
import express, { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const port = Number(process.env.PORT ?? 4000);
const appUrl = process.env.APP_URL ?? "http://localhost:5173";
const jwtSecret = process.env.JWT_SECRET ?? "dev-only-secret-change-before-deploy";
const jwtExpiresIn = process.env.JWT_EXPIRES_IN ?? "7d";

type AuthUser = {
  id: string;
  role: string;
  email: string;
};

type AuthedRequest = Request & {
  user?: AuthUser;
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const attendanceMarkSchema = z.object({
  records: z.array(
    z.object({
      studentId: z.string(),
      status: z.enum(["present", "absent", "late", "excused"]),
      remarks: z.string().optional(),
    })
  ),
});

const assignmentCreateSchema = z.object({
  courseId: z.string(),
  title: z.string().min(2),
  description: z.string().min(2),
  deadline: z.coerce.date(),
  maxMarks: z.number().int().positive().optional(),
  rubric: z.string().optional(),
});

const submissionCreateSchema = z.object({
  submissionType: z.enum(["pdf", "zip", "github_link"]),
  fileUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
});

const eventCreateSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  venue: z.string().min(2),
  eventStart: z.coerce.date(),
  registrationDeadline: z.coerce.date(),
  totalSeats: z.number().int().positive(),
});

const placementCreateSchema = z.object({
  companyName: z.string().min(2),
  jobRole: z.string().min(2),
  eligibility: z.string().min(2),
  ctc: z.string().optional(),
  deadline: z.coerce.date(),
});

const announcementCreateSchema = z.object({
  title: z.string().min(2),
  body: z.string().min(2),
  audience: z.enum(["all", "students", "faculty", "coordinators", "department"]),
  priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
  departmentId: z.string().optional(),
});

app.use(
  cors({
    origin: appUrl,
    credentials: true,
  })
);
app.use(express.json());

function ok(response: Response, message: string, data: unknown = {}) {
  response.json({ success: true, message, data });
}

function fail(response: Response, status: number, message: string, errors?: unknown) {
  response.status(status).json({ success: false, message, errors });
}

function asyncHandler(handler: (request: AuthedRequest, response: Response) => Promise<void>) {
  return (request: Request, response: Response, next: NextFunction) => {
    handler(request as AuthedRequest, response).catch(next);
  };
}

function signToken(user: AuthUser) {
  return jwt.sign(user, jwtSecret, { expiresIn: jwtExpiresIn } as jwt.SignOptions);
}

function paramId(request: Request) {
  return String(request.params.id);
}

function requireAuth(request: AuthedRequest, response: Response, next: NextFunction) {
  const header = request.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    fail(response, 401, "Authentication required.");
    return;
  }

  try {
    request.user = jwt.verify(token, jwtSecret) as AuthUser;
    next();
  } catch {
    fail(response, 401, "Invalid or expired token.");
  }
}

function requireRole(...roles: string[]) {
  return (request: AuthedRequest, response: Response, next: NextFunction) => {
    if (!request.user || !roles.includes(request.user.role)) {
      fail(response, 403, "You do not have permission for this action.");
      return;
    }
    next();
  };
}

async function getUserWithRole(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      role: true,
      department: true,
      studentProfile: true,
      facultyProfile: true,
    },
  });
}

function visibleAudienceForRole(role: string) {
  if (role === "student") return ["all", "students"];
  if (role === "faculty") return ["all", "faculty"];
  if (role === "coordinator") return ["all", "coordinators"];
  return ["all", "students", "faculty", "coordinators", "department"];
}

app.get("/health", (_request, response) => {
  ok(response, "Smart Campus Manager API is healthy.", {
    service: "smart-campus-manager-backend",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api", (_request, response) => {
  ok(response, "Smart Campus Manager API", {
    version: "0.1.0",
    modules: [
      "auth",
      "users",
      "attendance",
      "assignments",
      "events",
      "placements",
      "announcements",
      "notifications",
      "analytics",
      "activity-logs",
    ],
  });
});

app.post(
  "/api/auth/login",
  asyncHandler(async (request, response) => {
    const parsed = loginSchema.safeParse(request.body);
    if (!parsed.success) {
      fail(response, 400, "Invalid login payload.", parsed.error.flatten());
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email },
      include: { role: true, department: true },
    });

    if (!user?.passwordHash || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) {
      fail(response, 401, "Invalid email or password.");
      return;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const authUser = { id: user.id, role: user.role.name, email: user.email };
    ok(response, "Logged in successfully.", {
      token: signToken(authUser),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name,
        department: user.department?.name,
        status: user.status,
      },
    });
  })
);

app.get(
  "/api/auth/me",
  requireAuth,
  asyncHandler(async (request, response) => {
    const user = await getUserWithRole(request.user!.id);
    ok(response, "Current user loaded.", user);
  })
);

app.get(
  "/api/users",
  requireAuth,
  requireRole("admin"),
  asyncHandler(async (_request, response) => {
    const users = await prisma.user.findMany({
      include: { role: true, department: true },
      orderBy: { createdAt: "desc" },
    });
    ok(response, "Users loaded.", users);
  })
);

app.patch(
  "/api/users/:id/role",
  requireAuth,
  requireRole("admin"),
  asyncHandler(async (request, response) => {
    const role = await prisma.role.findUnique({ where: { name: String(request.body.role) } });
    if (!role) {
      fail(response, 400, "Unknown role.");
      return;
    }
    const user = await prisma.user.update({
      where: { id: paramId(request) },
      data: { roleId: role.id },
      include: { role: true },
    });
    await prisma.activityLog.create({
      data: {
        actorId: request.user!.id,
        action: "USER_ROLE_CHANGED",
        entityType: "user",
        entityId: user.id,
      },
    });
    ok(response, "User role updated.", user);
  })
);

app.patch(
  "/api/users/:id/status",
  requireAuth,
  requireRole("admin"),
  asyncHandler(async (request, response) => {
    const status = z.enum(["active", "pending", "suspended"]).parse(request.body.status);
    const user = await prisma.user.update({
      where: { id: paramId(request) },
      data: { status },
    });
    await prisma.activityLog.create({
      data: {
        actorId: request.user!.id,
        action: "USER_STATUS_CHANGED",
        entityType: "user",
        entityId: user.id,
      },
    });
    ok(response, "User status updated.", user);
  })
);

app.get(
  "/api/departments",
  requireAuth,
  asyncHandler(async (_request, response) => {
    ok(response, "Departments loaded.", await prisma.department.findMany({ include: { courses: true } }));
  })
);

app.get(
  "/api/courses",
  requireAuth,
  asyncHandler(async (_request, response) => {
    ok(response, "Courses loaded.", await prisma.course.findMany({ include: { department: true, faculty: true } }));
  })
);

app.get(
  "/api/attendance/sessions",
  requireAuth,
  asyncHandler(async (request, response) => {
    const where = request.user!.role === "faculty" ? { facultyId: request.user!.id } : {};
    ok(
      response,
      "Attendance sessions loaded.",
      await prisma.attendanceSession.findMany({
        where,
        include: { course: true, faculty: true, records: true },
        orderBy: { sessionDate: "desc" },
      })
    );
  })
);

app.post(
  "/api/attendance/sessions/:id/records",
  requireAuth,
  requireRole("faculty", "admin"),
  asyncHandler(async (request, response) => {
    const parsed = attendanceMarkSchema.safeParse(request.body);
    if (!parsed.success) {
      fail(response, 400, "Invalid attendance records.", parsed.error.flatten());
      return;
    }

    const records = await Promise.all(
      parsed.data.records.map((record) =>
        prisma.attendanceRecord.upsert({
          where: {
            attendanceSessionId_studentId: {
              attendanceSessionId: paramId(request),
              studentId: record.studentId,
            },
          },
          update: {
            status: record.status,
            remarks: record.remarks,
            markedBy: request.user!.id,
            markedAt: new Date(),
          },
          create: {
            attendanceSessionId: paramId(request),
            studentId: record.studentId,
            status: record.status,
            remarks: record.remarks,
            markedBy: request.user!.id,
          },
        })
      )
    );

    await prisma.activityLog.create({
      data: {
        actorId: request.user!.id,
        action: "ATTENDANCE_MARKED",
        entityType: "attendance_session",
        entityId: paramId(request),
      },
    });
    ok(response, "Attendance marked.", records);
  })
);

app.get(
  "/api/attendance/me",
  requireAuth,
  requireRole("student"),
  asyncHandler(async (request, response) => {
    ok(
      response,
      "Student attendance loaded.",
      await prisma.attendanceRecord.findMany({
        where: { studentId: request.user!.id },
        include: { session: { include: { course: true } } },
      })
    );
  })
);

app.get(
  "/api/assignments",
  requireAuth,
  asyncHandler(async (request, response) => {
    const where = request.user!.role === "faculty" ? { facultyId: request.user!.id } : {};
    ok(
      response,
      "Assignments loaded.",
      await prisma.assignment.findMany({
        where,
        include: { course: true, submissions: true },
        orderBy: { deadline: "asc" },
      })
    );
  })
);

app.post(
  "/api/assignments",
  requireAuth,
  requireRole("faculty", "admin"),
  asyncHandler(async (request, response) => {
    const parsed = assignmentCreateSchema.safeParse(request.body);
    if (!parsed.success) {
      fail(response, 400, "Invalid assignment payload.", parsed.error.flatten());
      return;
    }
    const assignment = await prisma.assignment.create({
      data: {
        ...parsed.data,
        facultyId: request.user!.id,
        status: "published",
      },
    });
    ok(response, "Assignment created.", assignment);
  })
);

app.post(
  "/api/assignments/:id/submissions",
  requireAuth,
  requireRole("student"),
  asyncHandler(async (request, response) => {
    const parsed = submissionCreateSchema.safeParse(request.body);
    if (!parsed.success) {
      fail(response, 400, "Invalid submission payload.", parsed.error.flatten());
      return;
    }
    const assignment = await prisma.assignment.findUnique({ where: { id: paramId(request) } });
    if (!assignment) {
      fail(response, 404, "Assignment not found.");
      return;
    }
    const submission = await prisma.assignmentSubmission.upsert({
      where: {
        assignmentId_studentId: {
          assignmentId: assignment.id,
          studentId: request.user!.id,
        },
      },
      update: {
        ...parsed.data,
        submittedAt: new Date(),
        late: new Date() > assignment.deadline,
        status: "resubmitted",
      },
      create: {
        ...parsed.data,
        assignmentId: assignment.id,
        studentId: request.user!.id,
        late: new Date() > assignment.deadline,
      },
    });
    ok(response, "Assignment submitted.", submission);
  })
);

app.patch(
  "/api/submissions/:id/review",
  requireAuth,
  requireRole("faculty", "admin"),
  asyncHandler(async (request, response) => {
    const submission = await prisma.assignmentSubmission.update({
      where: { id: paramId(request) },
      data: {
        marks: Number(request.body.marks),
        feedback: String(request.body.feedback ?? ""),
        reviewedBy: request.user!.id,
        reviewedAt: new Date(),
        status: "reviewed",
      },
    });
    ok(response, "Submission reviewed.", submission);
  })
);

app.get(
  "/api/events",
  requireAuth,
  asyncHandler(async (_request, response) => {
    ok(response, "Events loaded.", await prisma.campusEvent.findMany({ include: { registrations: true } }));
  })
);

app.post(
  "/api/events",
  requireAuth,
  requireRole("coordinator", "admin"),
  asyncHandler(async (request, response) => {
    const parsed = eventCreateSchema.safeParse(request.body);
    if (!parsed.success) {
      fail(response, 400, "Invalid event payload.", parsed.error.flatten());
      return;
    }
    const event = await prisma.campusEvent.create({
      data: {
        ...parsed.data,
        createdBy: request.user!.id,
        availableSeats: parsed.data.totalSeats,
        status: "published",
      },
    });
    ok(response, "Event created.", event);
  })
);

app.post(
  "/api/events/:id/register",
  requireAuth,
  requireRole("student"),
  asyncHandler(async (request, response) => {
    const event = await prisma.campusEvent.findUnique({ where: { id: paramId(request) } });
    if (!event || event.status !== "published" || event.availableSeats <= 0 || event.registrationDeadline < new Date()) {
      fail(response, 400, "Event is not available for registration.");
      return;
    }
    const registration = await prisma.eventRegistration.create({
      data: {
        eventId: event.id,
        studentId: request.user!.id,
        ticketCode: `SCM-${Date.now()}`,
      },
    });
    await prisma.campusEvent.update({
      where: { id: event.id },
      data: { availableSeats: { decrement: 1 } },
    });
    ok(response, "Event registered.", registration);
  })
);

app.post(
  "/api/events/:id/cancel",
  requireAuth,
  requireRole("student"),
  asyncHandler(async (request, response) => {
    const registration = await prisma.eventRegistration.update({
      where: {
        eventId_studentId: {
          eventId: paramId(request),
          studentId: request.user!.id,
        },
      },
      data: { status: "cancelled", cancelledAt: new Date() },
    });
    await prisma.campusEvent.update({
      where: { id: paramId(request) },
      data: { availableSeats: { increment: 1 } },
    });
    ok(response, "Event registration cancelled.", registration);
  })
);

app.get(
  "/api/placements",
  requireAuth,
  asyncHandler(async (_request, response) => {
    ok(response, "Placements loaded.", await prisma.placement.findMany({ include: { applications: true } }));
  })
);

app.post(
  "/api/placements",
  requireAuth,
  requireRole("coordinator", "admin"),
  asyncHandler(async (request, response) => {
    const parsed = placementCreateSchema.safeParse(request.body);
    if (!parsed.success) {
      fail(response, 400, "Invalid placement payload.", parsed.error.flatten());
      return;
    }
    const placement = await prisma.placement.create({
      data: { ...parsed.data, createdBy: request.user!.id, status: "open" },
    });
    ok(response, "Placement created.", placement);
  })
);

app.post(
  "/api/placements/:id/apply",
  requireAuth,
  requireRole("student"),
  asyncHandler(async (request, response) => {
    const placement = await prisma.placement.findUnique({ where: { id: paramId(request) } });
    if (!placement || placement.status !== "open" || placement.deadline < new Date()) {
      fail(response, 400, "Placement is not open for applications.");
      return;
    }
    const application = await prisma.placementApplication.create({
      data: {
        placementId: placement.id,
        studentId: request.user!.id,
        resumeUrl: request.body.resumeUrl,
      },
    });
    ok(response, "Placement application submitted.", application);
  })
);

app.get(
  "/api/announcements",
  requireAuth,
  asyncHandler(async (request, response) => {
    ok(
      response,
      "Announcements loaded.",
      await prisma.announcement.findMany({
        where: { audience: { in: visibleAudienceForRole(request.user!.role) }, status: "published" },
        orderBy: { publishedAt: "desc" },
      })
    );
  })
);

app.post(
  "/api/announcements",
  requireAuth,
  requireRole("faculty", "coordinator", "admin"),
  asyncHandler(async (request, response) => {
    const parsed = announcementCreateSchema.safeParse(request.body);
    if (!parsed.success) {
      fail(response, 400, "Invalid announcement payload.", parsed.error.flatten());
      return;
    }
    const announcement = await prisma.announcement.create({
      data: {
        ...parsed.data,
        createdBy: request.user!.id,
        publishedAt: new Date(),
        status: "published",
      },
    });
    ok(response, "Announcement published.", announcement);
  })
);

app.get(
  "/api/notifications",
  requireAuth,
  asyncHandler(async (request, response) => {
    ok(
      response,
      "Notifications loaded.",
      await prisma.notification.findMany({
        where: { userId: request.user!.id },
        orderBy: { createdAt: "desc" },
      })
    );
  })
);

app.patch(
  "/api/notifications/:id/read",
  requireAuth,
  asyncHandler(async (request, response) => {
    ok(
      response,
      "Notification marked read.",
      await prisma.notification.update({
        where: { id: paramId(request) },
        data: { read: true },
      })
    );
  })
);

app.patch(
  "/api/notifications/read-all",
  requireAuth,
  asyncHandler(async (request, response) => {
    await prisma.notification.updateMany({
      where: { userId: request.user!.id },
      data: { read: true },
    });
    ok(response, "All notifications marked read.");
  })
);

app.get(
  "/api/analytics/admin",
  requireAuth,
  requireRole("admin"),
  asyncHandler(async (_request, response) => {
    const [studentCount, facultyCount, departmentCount, activeEvents, openPlacements, placementApplications] =
      await Promise.all([
        prisma.user.count({ where: { role: { name: "student" } } }),
        prisma.user.count({ where: { role: { name: "faculty" } } }),
        prisma.department.count(),
        prisma.campusEvent.count({ where: { status: "published" } }),
        prisma.placement.count({ where: { status: "open" } }),
        prisma.placementApplication.count(),
      ]);
    ok(response, "Admin analytics loaded.", {
      studentCount,
      facultyCount,
      departmentCount,
      activeEvents,
      openPlacements,
      placementApplications,
    });
  })
);

app.get(
  "/api/search",
  requireAuth,
  asyncHandler(async (request, response) => {
    const q = String(request.query.q ?? "").trim();
    if (!q) {
      ok(response, "Search results loaded.", []);
      return;
    }
    const contains = { contains: q };
    const [assignments, events, placements, announcements, users] = await Promise.all([
      prisma.assignment.findMany({ where: { title: contains }, take: 5 }),
      prisma.campusEvent.findMany({ where: { title: contains }, take: 5 }),
      prisma.placement.findMany({ where: { companyName: contains }, take: 5 }),
      prisma.announcement.findMany({
        where: { title: contains, audience: { in: visibleAudienceForRole(request.user!.role) } },
        take: 5,
      }),
      request.user!.role === "admin" ? prisma.user.findMany({ where: { name: contains }, take: 5 }) : [],
    ]);
    ok(response, "Search results loaded.", { assignments, events, placements, announcements, users });
  })
);

app.get(
  "/api/activity-logs",
  requireAuth,
  requireRole("admin"),
  asyncHandler(async (_request, response) => {
    ok(
      response,
      "Activity logs loaded.",
      await prisma.activityLog.findMany({
        include: { actor: true },
        orderBy: { createdAt: "desc" },
      })
    );
  })
);

app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  if (error instanceof z.ZodError) {
    fail(response, 400, "Validation failed.", error.flatten());
    return;
  }
  console.error(error);
  fail(response, 500, "Internal server error.");
});

app.use((_request, response) => {
  fail(response, 404, "Route not found.");
});

app.listen(port, () => {
  console.log(`Smart Campus Manager API running on http://localhost:${port}`);
});

