import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const password = "demo1234";

async function main() {
  await prisma.activityLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.clubMembership.deleteMany();
  await prisma.club.deleteMany();
  await prisma.placementApplication.deleteMany();
  await prisma.placement.deleteMany();
  await prisma.eventRegistration.deleteMany();
  await prisma.campusEvent.deleteMany();
  await prisma.assignmentSubmission.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.attendanceRecord.deleteMany();
  await prisma.attendanceSession.deleteMany();
  await prisma.course.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.facultyProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.department.deleteMany();
  await prisma.role.deleteMany();

  const [adminRole, facultyRole, coordinatorRole, studentRole] = await Promise.all([
    prisma.role.create({ data: { name: "admin", description: "Full platform access" } }),
    prisma.role.create({ data: { name: "faculty", description: "Academic workflow access" } }),
    prisma.role.create({ data: { name: "coordinator", description: "Campus coordination access" } }),
    prisma.role.create({ data: { name: "student", description: "Student self-service access" } }),
  ]);

  const cse = await prisma.department.create({ data: { name: "Computer Science", code: "CSE" } });
  const ece = await prisma.department.create({ data: { name: "Electronics", code: "ECE" } });
  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.user.create({
    data: {
      roleId: adminRole.id,
      departmentId: cse.id,
      name: "Asha Rao",
      email: "admin@smartcampusmanager.test",
      passwordHash,
      phone: "+91 90000 11001",
      status: "active",
    },
  });

  const faculty = await prisma.user.create({
    data: {
      roleId: facultyRole.id,
      departmentId: cse.id,
      name: "Dr. Meera Iyer",
      email: "faculty@smartcampusmanager.test",
      passwordHash,
      phone: "+91 90000 11002",
      status: "active",
      facultyProfile: {
        create: {
          employeeId: "FAC-CSE-001",
          designation: "Assistant Professor",
          specialization: "Web Engineering",
        },
      },
    },
  });

  const coordinator = await prisma.user.create({
    data: {
      roleId: coordinatorRole.id,
      departmentId: cse.id,
      name: "Rahul Menon",
      email: "coordinator@smartcampusmanager.test",
      passwordHash,
      phone: "+91 90000 11003",
      status: "active",
    },
  });

  const student = await prisma.user.create({
    data: {
      roleId: studentRole.id,
      departmentId: cse.id,
      name: "Praveen Kumar",
      email: "student@smartcampusmanager.test",
      passwordHash,
      phone: "+91 90000 11004",
      status: "active",
      studentProfile: {
        create: {
          rollNumber: "CSE-2026-041",
          semester: 7,
          skills: "React, TypeScript, Node.js",
          githubUrl: "https://github.com/PRAVEEN-P-55",
        },
      },
    },
  });

  const secondStudent = await prisma.user.create({
    data: {
      roleId: studentRole.id,
      departmentId: ece.id,
      name: "Nisha Varghese",
      email: "nisha@smartcampusmanager.test",
      passwordHash,
      phone: "+91 90000 11005",
      status: "active",
      studentProfile: {
        create: {
          rollNumber: "ECE-2026-019",
          semester: 7,
          skills: "IoT, Python",
        },
      },
    },
  });

  const web = await prisma.course.create({
    data: {
      departmentId: cse.id,
      facultyId: faculty.id,
      name: "Web Development",
      code: "CSE401",
      semester: 7,
      credits: 4,
    },
  });

  const dbms = await prisma.course.create({
    data: {
      departmentId: cse.id,
      facultyId: faculty.id,
      name: "Database Systems",
      code: "CSE305",
      semester: 5,
      credits: 3,
    },
  });

  const session = await prisma.attendanceSession.create({
    data: {
      courseId: web.id,
      facultyId: faculty.id,
      title: "Lecture 12",
      sessionDate: new Date("2026-08-20"),
      status: "closed",
      records: {
        create: [
          { studentId: student.id, status: "present", markedBy: faculty.id },
          { studentId: secondStudent.id, status: "absent", markedBy: faculty.id },
        ],
      },
    },
  });

  const assignment = await prisma.assignment.create({
    data: {
      courseId: web.id,
      facultyId: faculty.id,
      title: "React Campus Portal",
      description: "Build a responsive campus portal screen.",
      deadline: new Date("2026-08-24T18:00:00.000Z"),
      maxMarks: 50,
      status: "published",
      submissions: {
        create: {
          studentId: student.id,
          submissionType: "github_link",
          githubUrl: "https://github.com/student/campus-portal",
          marks: 44,
          feedback: "Strong component structure.",
          reviewedBy: faculty.id,
          reviewedAt: new Date("2026-08-20T09:30:00.000Z"),
          status: "reviewed",
        },
      },
    },
  });

  await prisma.assignment.create({
    data: {
      courseId: dbms.id,
      facultyId: faculty.id,
      title: "Indexing Case Study",
      description: "Analyze query plans and indexes.",
      deadline: new Date("2026-08-27T18:00:00.000Z"),
      maxMarks: 40,
      status: "published",
    },
  });

  const event = await prisma.campusEvent.create({
    data: {
      createdBy: coordinator.id,
      title: "DevFusion Project Expo",
      description: "Campus-wide showcase for hackathon prototypes.",
      venue: "Innovation Hall",
      eventStart: new Date("2026-08-28T04:30:00.000Z"),
      registrationDeadline: new Date("2026-08-26T18:00:00.000Z"),
      totalSeats: 120,
      availableSeats: 42,
      status: "published",
      registrations: {
        create: {
          studentId: student.id,
          ticketCode: "SCM-EXPO-1042",
          status: "registered",
        },
      },
    },
  });

  const placement = await prisma.placement.create({
    data: {
      createdBy: coordinator.id,
      companyName: "Tata Elxsi",
      jobRole: "Software Engineer Intern",
      eligibility: "CSE/ECE students with 7.0 CGPA and no active backlogs.",
      ctc: "8 LPA",
      deadline: new Date("2026-08-30T18:00:00.000Z"),
      status: "open",
      applications: {
        create: {
          studentId: student.id,
          status: "applied",
        },
      },
    },
  });

  const club = await prisma.club.create({
    data: {
      coordinatorId: coordinator.id,
      name: "Code Studio",
      category: "Technical",
      status: "active",
      memberships: {
        create: {
          studentId: student.id,
          membershipRole: "lead",
          status: "approved",
        },
      },
    },
  });

  await prisma.announcement.createMany({
    data: [
      {
        createdBy: admin.id,
        title: "Semester project review schedule released",
        body: "Department review slots are available in the student dashboard.",
        audience: "students",
        priority: "high",
        publishedAt: new Date("2026-08-20T05:00:00.000Z"),
        status: "published",
      },
      {
        createdBy: admin.id,
        title: "Campus maintenance window",
        body: "Network maintenance is scheduled for August 22 from 6 AM to 8 AM.",
        audience: "all",
        priority: "urgent",
        publishedAt: new Date("2026-08-20T06:00:00.000Z"),
        status: "published",
      },
    ],
  });

  await prisma.notification.createMany({
    data: [
      {
        userId: student.id,
        title: "Assignment reviewed",
        message: "React Campus Portal has been reviewed with feedback.",
        type: "assignment",
        relatedEntityType: "assignment",
        relatedEntityId: assignment.id,
      },
      {
        userId: student.id,
        title: "Placement open",
        message: "Tata Elxsi applications close on August 30.",
        type: "placement",
        relatedEntityType: "placement",
        relatedEntityId: placement.id,
      },
    ],
  });

  await prisma.activityLog.createMany({
    data: [
      { actorId: faculty.id, action: "ATTENDANCE_MARKED", entityType: "attendance_session", entityId: session.id },
      { actorId: coordinator.id, action: "EVENT_PUBLISHED", entityType: "event", entityId: event.id },
      { actorId: coordinator.id, action: "CLUB_UPDATED", entityType: "club", entityId: club.id },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Database seeded.");
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
