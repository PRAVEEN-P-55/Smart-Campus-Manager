export type Role = "student" | "faculty" | "coordinator" | "admin";

export type UserStatus = "active" | "pending" | "suspended";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  departmentId: string;
  status: UserStatus;
  phone: string;
  avatarInitials: string;
  lastLoginAt: string;
};

export type Department = {
  id: string;
  name: string;
  code: string;
  headFacultyId: string;
  studentCount: number;
};

export type Course = {
  id: string;
  departmentId: string;
  facultyId: string;
  name: string;
  code: string;
  semester: number;
  credits: number;
};

export type AttendanceStatus = "present" | "absent" | "late" | "excused";

export type AttendanceSession = {
  id: string;
  courseId: string;
  facultyId: string;
  title: string;
  sessionDate: string;
  status: "draft" | "open" | "closed";
};

export type AttendanceRecord = {
  id: string;
  sessionId: string;
  studentId: string;
  status: AttendanceStatus;
  markedAt: string;
};

export type Assignment = {
  id: string;
  courseId: string;
  facultyId: string;
  title: string;
  description: string;
  deadline: string;
  maxMarks: number;
  status: "draft" | "published" | "closed";
};

export type AssignmentSubmission = {
  id: string;
  assignmentId: string;
  studentId: string;
  submissionType: "pdf" | "zip" | "github_link";
  submittedAt: string;
  late: boolean;
  marks?: number;
  feedback?: string;
  status: "submitted" | "reviewed" | "resubmitted";
};

export type CampusEvent = {
  id: string;
  createdBy: string;
  title: string;
  description: string;
  venue: string;
  eventStart: string;
  registrationDeadline: string;
  totalSeats: number;
  availableSeats: number;
  status: "draft" | "published" | "cancelled" | "completed";
};

export type EventRegistration = {
  id: string;
  eventId: string;
  studentId: string;
  ticketCode: string;
  status: "registered" | "cancelled" | "attended";
};

export type Placement = {
  id: string;
  createdBy: string;
  companyName: string;
  jobRole: string;
  eligibility: string;
  ctc: string;
  deadline: string;
  status: "open" | "closed" | "draft";
};

export type PlacementApplication = {
  id: string;
  placementId: string;
  studentId: string;
  status: "applied" | "shortlisted" | "rejected" | "selected" | "withdrawn";
  appliedAt: string;
};

export type Club = {
  id: string;
  coordinatorId: string;
  name: string;
  category: string;
  status: "active" | "inactive";
};

export type ClubMembership = {
  id: string;
  clubId: string;
  studentId: string;
  membershipRole: "member" | "lead" | "volunteer";
  status: "pending" | "approved" | "rejected" | "removed";
};

export type Announcement = {
  id: string;
  createdBy: string;
  title: string;
  body: string;
  audience: "all" | "students" | "faculty" | "coordinators" | "department";
  priority: "low" | "normal" | "high" | "urgent";
  publishedAt: string;
  status: "draft" | "published" | "archived";
};

export type Notification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "assignment" | "attendance" | "event" | "placement" | "system";
  read: boolean;
  createdAt: string;
};

export type ActivityLog = {
  id: string;
  actorId: string;
  action: string;
  entityType: string;
  entityId: string;
  createdAt: string;
};

export type MonthlyAnalytics = {
  month: string;
  attendance: number;
  assignmentCompletion: number;
  eventParticipation: number;
  placementApplications: number;
};

export const roles: { id: Role; label: string; description: string }[] = [
  { id: "admin", label: "Admin", description: "Full campus operations and audit access" },
  { id: "faculty", label: "Faculty", description: "Courses, attendance, assignments, and submissions" },
  { id: "coordinator", label: "Coordinator", description: "Events, announcements, clubs, and placements" },
  { id: "student", label: "Student", description: "Personal academics, events, placements, and notifications" },
];

export const departments: Department[] = [
  { id: "dept-cse", name: "Computer Science", code: "CSE", headFacultyId: "usr-faculty-1", studentCount: 520 },
  { id: "dept-ece", name: "Electronics", code: "ECE", headFacultyId: "usr-faculty-2", studentCount: 360 },
  { id: "dept-me", name: "Mechanical", code: "ME", headFacultyId: "usr-faculty-3", studentCount: 240 },
  { id: "dept-civil", name: "Civil", code: "CE", headFacultyId: "usr-faculty-4", studentCount: 164 },
];

export const users: User[] = [
  {
    id: "usr-admin-1",
    name: "Asha Rao",
    email: "admin@smartcampusmanager.test",
    role: "admin",
    departmentId: "dept-cse",
    status: "active",
    phone: "+91 90000 11001",
    avatarInitials: "AR",
    lastLoginAt: "2026-08-20T08:12:00.000Z",
  },
  {
    id: "usr-faculty-1",
    name: "Dr. Meera Iyer",
    email: "faculty@smartcampusmanager.test",
    role: "faculty",
    departmentId: "dept-cse",
    status: "active",
    phone: "+91 90000 11002",
    avatarInitials: "MI",
    lastLoginAt: "2026-08-20T07:30:00.000Z",
  },
  {
    id: "usr-coordinator-1",
    name: "Rahul Menon",
    email: "coordinator@smartcampusmanager.test",
    role: "coordinator",
    departmentId: "dept-cse",
    status: "active",
    phone: "+91 90000 11003",
    avatarInitials: "RM",
    lastLoginAt: "2026-08-19T16:45:00.000Z",
  },
  {
    id: "usr-student-1",
    name: "Praveen Kumar",
    email: "student@smartcampusmanager.test",
    role: "student",
    departmentId: "dept-cse",
    status: "active",
    phone: "+91 90000 11004",
    avatarInitials: "PK",
    lastLoginAt: "2026-08-20T06:25:00.000Z",
  },
  {
    id: "usr-student-2",
    name: "Nisha Varghese",
    email: "nisha@smartcampusmanager.test",
    role: "student",
    departmentId: "dept-ece",
    status: "active",
    phone: "+91 90000 11005",
    avatarInitials: "NV",
    lastLoginAt: "2026-08-19T10:10:00.000Z",
  },
];

export const courses: Course[] = [
  { id: "course-web", departmentId: "dept-cse", facultyId: "usr-faculty-1", name: "Web Development", code: "CSE401", semester: 7, credits: 4 },
  { id: "course-dsa", departmentId: "dept-cse", facultyId: "usr-faculty-1", name: "Data Structures", code: "CSE203", semester: 3, credits: 4 },
  { id: "course-dbms", departmentId: "dept-cse", facultyId: "usr-faculty-1", name: "Database Systems", code: "CSE305", semester: 5, credits: 3 },
];

export const attendanceSessions: AttendanceSession[] = [
  { id: "att-001", courseId: "course-web", facultyId: "usr-faculty-1", title: "Lecture 12", sessionDate: "2026-08-20", status: "closed" },
  { id: "att-002", courseId: "course-dsa", facultyId: "usr-faculty-1", title: "Lab 06", sessionDate: "2026-08-19", status: "closed" },
  { id: "att-003", courseId: "course-dbms", facultyId: "usr-faculty-1", title: "Lecture 09", sessionDate: "2026-08-21", status: "open" },
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: "ar-001", sessionId: "att-001", studentId: "usr-student-1", status: "present", markedAt: "2026-08-20T05:15:00.000Z" },
  { id: "ar-002", sessionId: "att-002", studentId: "usr-student-1", status: "late", markedAt: "2026-08-19T05:20:00.000Z" },
  { id: "ar-003", sessionId: "att-001", studentId: "usr-student-2", status: "absent", markedAt: "2026-08-20T05:15:00.000Z" },
];

export const assignments: Assignment[] = [
  {
    id: "asn-react",
    courseId: "course-web",
    facultyId: "usr-faculty-1",
    title: "React Campus Portal",
    description: "Build a responsive portal screen with reusable dashboard components.",
    deadline: "2026-08-24T18:00:00.000Z",
    maxMarks: 50,
    status: "published",
  },
  {
    id: "asn-indexing",
    courseId: "course-dbms",
    facultyId: "usr-faculty-1",
    title: "Indexing Case Study",
    description: "Analyze query plans and propose useful indexes for a campus database.",
    deadline: "2026-08-27T18:00:00.000Z",
    maxMarks: 40,
    status: "published",
  },
  {
    id: "asn-graphs",
    courseId: "course-dsa",
    facultyId: "usr-faculty-1",
    title: "Graph Algorithms Lab",
    description: "Submit shortest path and traversal implementations with test cases.",
    deadline: "2026-09-02T18:00:00.000Z",
    maxMarks: 60,
    status: "draft",
  },
];

export const assignmentSubmissions: AssignmentSubmission[] = [
  {
    id: "sub-001",
    assignmentId: "asn-react",
    studentId: "usr-student-1",
    submissionType: "github_link",
    submittedAt: "2026-08-20T09:15:00.000Z",
    late: false,
    marks: 44,
    feedback: "Strong component structure. Improve empty states.",
    status: "reviewed",
  },
  {
    id: "sub-002",
    assignmentId: "asn-indexing",
    studentId: "usr-student-2",
    submissionType: "pdf",
    submittedAt: "2026-08-20T07:50:00.000Z",
    late: false,
    status: "submitted",
  },
];

export const events: CampusEvent[] = [
  {
    id: "evt-devfusion",
    createdBy: "usr-coordinator-1",
    title: "DevFusion Project Expo",
    description: "Campus-wide showcase for hackathon prototypes and working demos.",
    venue: "Innovation Hall",
    eventStart: "2026-08-28T04:30:00.000Z",
    registrationDeadline: "2026-08-26T18:00:00.000Z",
    totalSeats: 120,
    availableSeats: 42,
    status: "published",
  },
  {
    id: "evt-cloud",
    createdBy: "usr-coordinator-1",
    title: "Cloud Career Clinic",
    description: "Resume and interview prep for entry-level cloud roles.",
    venue: "Seminar Block B",
    eventStart: "2026-09-04T08:30:00.000Z",
    registrationDeadline: "2026-09-02T18:00:00.000Z",
    totalSeats: 60,
    availableSeats: 16,
    status: "published",
  },
];

export const eventRegistrations: EventRegistration[] = [
  { id: "reg-001", eventId: "evt-devfusion", studentId: "usr-student-1", ticketCode: "SCM-EXPO-1042", status: "registered" },
  { id: "reg-002", eventId: "evt-cloud", studentId: "usr-student-2", ticketCode: "SCM-CLOUD-2044", status: "registered" },
];

export const placements: Placement[] = [
  {
    id: "plc-tata",
    createdBy: "usr-coordinator-1",
    companyName: "Tata Elxsi",
    jobRole: "Software Engineer Intern",
    eligibility: "CSE/ECE students with 7.0 CGPA and no active backlogs.",
    ctc: "8 LPA",
    deadline: "2026-08-30T18:00:00.000Z",
    status: "open",
  },
  {
    id: "plc-zoho",
    createdBy: "usr-coordinator-1",
    companyName: "Zoho",
    jobRole: "Product Developer",
    eligibility: "Strong problem solving and full-stack project experience.",
    ctc: "9.5 LPA",
    deadline: "2026-09-03T18:00:00.000Z",
    status: "open",
  },
];

export const placementApplications: PlacementApplication[] = [
  { id: "pla-001", placementId: "plc-tata", studentId: "usr-student-1", status: "applied", appliedAt: "2026-08-20T08:30:00.000Z" },
  { id: "pla-002", placementId: "plc-zoho", studentId: "usr-student-2", status: "shortlisted", appliedAt: "2026-08-19T12:40:00.000Z" },
];

export const clubs: Club[] = [
  { id: "club-code", coordinatorId: "usr-coordinator-1", name: "Code Studio", category: "Technical", status: "active" },
  { id: "club-robotics", coordinatorId: "usr-coordinator-1", name: "Robotics Club", category: "Technical", status: "active" },
  { id: "club-design", coordinatorId: "usr-coordinator-1", name: "Design Circle", category: "Creative", status: "active" },
];

export const clubMemberships: ClubMembership[] = [
  { id: "cm-001", clubId: "club-code", studentId: "usr-student-1", membershipRole: "lead", status: "approved" },
  { id: "cm-002", clubId: "club-robotics", studentId: "usr-student-2", membershipRole: "member", status: "pending" },
  { id: "cm-003", clubId: "club-design", studentId: "usr-student-1", membershipRole: "volunteer", status: "approved" },
];

export const announcements: Announcement[] = [
  {
    id: "ann-review",
    createdBy: "usr-admin-1",
    title: "Semester project review schedule released",
    body: "Department review slots are available in the student dashboard.",
    audience: "students",
    priority: "high",
    publishedAt: "2026-08-20T05:00:00.000Z",
    status: "published",
  },
  {
    id: "ann-maintenance",
    createdBy: "usr-admin-1",
    title: "Campus maintenance window",
    body: "Network maintenance is scheduled for August 22 from 6 AM to 8 AM.",
    audience: "all",
    priority: "urgent",
    publishedAt: "2026-08-20T06:00:00.000Z",
    status: "published",
  },
];

export const notifications: Notification[] = [
  {
    id: "not-001",
    userId: "usr-student-1",
    title: "Assignment reviewed",
    message: "React Campus Portal has been reviewed with feedback.",
    type: "assignment",
    read: false,
    createdAt: "2026-08-20T09:35:00.000Z",
  },
  {
    id: "not-002",
    userId: "usr-student-1",
    title: "Placement open",
    message: "Tata Elxsi applications close on August 30.",
    type: "placement",
    read: false,
    createdAt: "2026-08-20T08:00:00.000Z",
  },
  {
    id: "not-003",
    userId: "usr-faculty-1",
    title: "Attendance session open",
    message: "Database Systems Lecture 09 is ready for marking.",
    type: "attendance",
    read: true,
    createdAt: "2026-08-20T06:45:00.000Z",
  },
];

export const activityLogs: ActivityLog[] = [
  { id: "log-001", actorId: "usr-admin-1", action: "USER_ROLE_CHANGED", entityType: "user", entityId: "usr-coordinator-1", createdAt: "2026-08-20T06:10:00.000Z" },
  { id: "log-002", actorId: "usr-faculty-1", action: "ATTENDANCE_MARKED", entityType: "attendance_session", entityId: "att-001", createdAt: "2026-08-20T05:15:00.000Z" },
  { id: "log-003", actorId: "usr-coordinator-1", action: "EVENT_PUBLISHED", entityType: "event", entityId: "evt-devfusion", createdAt: "2026-08-19T13:05:00.000Z" },
  { id: "log-004", actorId: "usr-coordinator-1", action: "PLACEMENT_OPENED", entityType: "placement", entityId: "plc-zoho", createdAt: "2026-08-19T12:20:00.000Z" },
];

export const monthlyAnalytics: MonthlyAnalytics[] = [
  { month: "Apr", attendance: 82, assignmentCompletion: 65, eventParticipation: 180, placementApplications: 18 },
  { month: "May", attendance: 85, assignmentCompletion: 72, eventParticipation: 220, placementApplications: 24 },
  { month: "Jun", attendance: 81, assignmentCompletion: 70, eventParticipation: 205, placementApplications: 31 },
  { month: "Jul", attendance: 88, assignmentCompletion: 78, eventParticipation: 270, placementApplications: 38 },
  { month: "Aug", attendance: 91, assignmentCompletion: 83, eventParticipation: 326, placementApplications: 46 },
];

export const demoCredentials: Record<Role, { email: string; password: string }> = {
  admin: { email: "admin@smartcampusmanager.test", password: "demo1234" },
  faculty: { email: "faculty@smartcampusmanager.test", password: "demo1234" },
  coordinator: { email: "coordinator@smartcampusmanager.test", password: "demo1234" },
  student: { email: "student@smartcampusmanager.test", password: "demo1234" },
};

export const campusSummary = {
  studentCount: departments.reduce((sum, department) => sum + department.studentCount, 0),
  facultyCount: users.filter((user) => user.role === "faculty").length,
  departmentCount: departments.length,
  activeEvents: events.filter((event) => event.status === "published").length,
  openPlacements: placements.filter((placement) => placement.status === "open").length,
  activeClubs: clubs.filter((club) => club.status === "active").length,
  unreadNotifications: notifications.filter((notification) => !notification.read).length,
};
