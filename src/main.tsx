import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bell,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Search,
  Settings,
  Users,
} from "lucide-react";
import {
  announcements,
  assignments,
  assignmentSubmissions,
  attendanceRecords,
  attendanceSessions,
  campusSummary,
  courses,
  demoCredentials,
  eventRegistrations,
  events,
  notifications,
  placementApplications,
  placements,
  roles,
  type Role,
  type User,
  users,
} from "./data/campusData";
import "./styles.css";

type View =
  | "dashboard"
  | "attendance"
  | "assignments"
  | "events"
  | "placements"
  | "announcements"
  | "users"
  | "settings";

const navItems: {
  id: View;
  label: string;
  icon: React.ElementType;
  allowedRoles: Role[];
}[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, allowedRoles: ["student", "faculty", "coordinator", "admin"] },
  { id: "attendance", label: "Attendance", icon: ClipboardCheck, allowedRoles: ["student", "faculty", "admin"] },
  { id: "assignments", label: "Assignments", icon: BookOpen, allowedRoles: ["student", "faculty", "admin"] },
  { id: "events", label: "Events", icon: CalendarDays, allowedRoles: ["student", "coordinator", "admin"] },
  { id: "placements", label: "Placements", icon: BriefcaseBusiness, allowedRoles: ["student", "coordinator", "admin"] },
  { id: "announcements", label: "Announcements", icon: Megaphone, allowedRoles: ["student", "faculty", "coordinator", "admin"] },
  { id: "users", label: "Users", icon: Users, allowedRoles: ["admin"] },
  { id: "settings", label: "Settings", icon: Settings, allowedRoles: ["student", "faculty", "coordinator", "admin"] },
];

function App() {
  const [sessionUser, setSessionUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<View>("dashboard");
  const role = sessionUser?.role ?? "student";
  const currentUser = sessionUser ?? users.find((user) => user.role === role) ?? users[0];
  const availableNavItems = useMemo(
    () => navItems.filter((item) => item.allowedRoles.includes(role)),
    [role]
  );

  function handleLogin(nextRole: Role) {
    const demoUser = users.find((user) => user.role === nextRole) ?? users[0];
    setSessionUser(demoUser);
    setActiveView("dashboard");
  }

  function handleLogout() {
    setSessionUser(null);
    setActiveView("dashboard");
  }

  if (!sessionUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-line bg-white px-4 py-5 lg:block">
        <Brand />
        <nav className="mt-8 space-y-1" aria-label="Primary navigation">
          {availableNavItems.map((item) => (
            <NavButton
              key={item.id}
              item={item}
              isActive={activeView === item.id}
              onClick={() => setActiveView(item.id)}
            />
          ))}
        </nav>
        <div className="absolute bottom-5 left-4 right-4 rounded-app border border-line bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">Demo login</p>
          <p className="mt-2 break-all text-sm font-bold text-ink">{demoCredentials[role].email}</p>
          <p className="mt-1 text-xs text-muted">Password: {demoCredentials[role].password}</p>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-line bg-white/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <div className="lg:hidden">
              <Brand compact />
            </div>
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Global search</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input className="app-input pl-10" placeholder="Search students, events, assignments, placements" />
            </label>
            <label>
              <span className="sr-only">Switch role</span>
              <select className="app-input w-40 font-bold" value={role} onChange={(event) => handleLogin(event.target.value as Role)}>
                {roles.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <button className="app-icon-button" aria-label="Open notifications">
              <Bell className="h-5 w-5" />
            </button>
            <div className="flex min-h-11 items-center gap-3 rounded-app border border-line bg-white px-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                {currentUser.avatarInitials}
              </span>
              <div className="hidden sm:block">
                <p className="text-sm font-bold leading-4">{currentUser.name}</p>
                <p className="text-xs capitalize text-muted">{currentUser.role}</p>
              </div>
            </div>
            <button className="app-icon-button" aria-label="Log out" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </button>
          </div>
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden" aria-label="Mobile navigation">
            {availableNavItems.map((item) => (
              <button
                key={item.id}
                className={`app-mobile-tab ${activeView === item.id ? "app-mobile-tab-active" : ""}`}
                onClick={() => setActiveView(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </header>

        <main className="app-page">
          <section className="app-container app-panel">
            <div className="app-panel-header">
              <div>
                <p className="app-eyebrow">PS-1 Smart Campus Management Platform</p>
                <h1 className="app-title text-balance">{getViewTitle(activeView)}</h1>
                <p className="app-copy">
                  Role-aware navigation is active for the {currentUser.role} demo account.
                  Feature screens will be filled in upcoming milestones.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="app-button-primary">Primary action</button>
                <button className="app-button-secondary">Secondary</button>
              </div>
            </div>

            {currentUser.role === "student" && activeView === "dashboard" ? (
              <StudentDashboard user={currentUser} />
            ) : currentUser.role === "faculty" && activeView === "dashboard" ? (
              <FacultyDashboard user={currentUser} />
            ) : (
              <FoundationSummary />
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

function FacultyDashboard({ user }: { user: User }) {
  const assignedCourses = courses.filter((course) => course.facultyId === user.id);
  const facultyAssignments = assignments.filter((assignment) => assignment.facultyId === user.id);
  const facultySessions = attendanceSessions.filter((session) => session.facultyId === user.id);
  const reviewQueue = assignmentSubmissions.filter((submission) => submission.status === "submitted");
  const openSessions = facultySessions.filter((session) => session.status === "open");
  const totalStudents = users.filter((candidate) => candidate.role === "student").length;

  return (
    <div className="space-y-6">
      <div className="app-card-grid">
        <StatCard label="Assigned classes" value={String(assignedCourses.length)} badge="Courses" badgeClass="app-badge-info" />
        <StatCard label="Students tracked" value={String(totalStudents)} badge="Roster" badgeClass="app-badge-success" />
        <StatCard label="Pending reviews" value={String(reviewQueue.length)} badge="Submissions" badgeClass="app-badge-warning" />
        <StatCard label="Open attendance" value={String(openSessions.length)} badge="Sessions" badgeClass="app-badge-danger" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="app-panel">
          <div className="app-panel-header">
            <div>
              <h2 className="text-xl font-bold">Attendance actions</h2>
              <p className="mt-1 text-sm text-muted">Open and recent sessions for assigned courses.</p>
            </div>
            <button className="app-button-primary">Create session</button>
          </div>
          <div className="overflow-x-auto">
            <table className="app-table">
              <thead>
                <tr>
                  <th>Session</th>
                  <th>Course</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {facultySessions.map((session) => (
                  <tr key={session.id}>
                    <td>{session.title}</td>
                    <td>{getCourseName(session.courseId)}</td>
                    <td>{formatShortDate(session.sessionDate)}</td>
                    <td>{session.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="app-panel">
          <div className="app-panel-header">
            <div>
              <h2 className="text-xl font-bold">Recent submissions</h2>
              <p className="mt-1 text-sm text-muted">Student work waiting for review or already graded.</p>
            </div>
            <button className="app-button-secondary">Review all</button>
          </div>
          <div className="space-y-3">
            {assignmentSubmissions.map((submission) => (
              <div key={submission.id} className="rounded-app border border-line bg-slate-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-bold text-ink">{getAssignmentTitle(submission.assignmentId)}</p>
                  <span className={`app-badge ${submission.status === "reviewed" ? "app-badge-success" : "app-badge-warning"}`}>
                    {submission.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted">
                  {getUserName(submission.studentId)} - {submission.submissionType.replace("_", " ")}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {assignedCourses.map((course) => {
          const courseAssignments = facultyAssignments.filter((assignment) => assignment.courseId === course.id);
          const courseSessions = facultySessions.filter((session) => session.courseId === course.id);
          const courseAttendanceRecords = attendanceRecords.filter((record) =>
            courseSessions.some((session) => session.id === record.sessionId)
          );
          const presentCount = courseAttendanceRecords.filter((record) =>
            ["present", "late", "excused"].includes(record.status)
          ).length;
          const attendanceRate = courseAttendanceRecords.length
            ? Math.round((presentCount / courseAttendanceRecords.length) * 100)
            : 0;

          return (
            <article className="app-panel" key={course.id}>
              <span className="app-badge app-badge-info">{course.code}</span>
              <h3 className="mt-4 text-lg font-bold">{course.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Semester {course.semester} - {course.credits} credits
              </p>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-app bg-slate-50 p-3">
                  <dt className="font-semibold text-muted">Assignments</dt>
                  <dd className="mt-1 text-xl font-bold text-ink">{courseAssignments.length}</dd>
                </div>
                <div className="rounded-app bg-slate-50 p-3">
                  <dt className="font-semibold text-muted">Attendance</dt>
                  <dd className="mt-1 text-xl font-bold text-ink">{attendanceRate}%</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>

      <section className="app-panel">
        <div className="app-panel-header">
          <h2 className="text-xl font-bold">Assignment queue</h2>
          <button className="app-button-primary">Create assignment</button>
        </div>
        <div className="overflow-x-auto">
          <table className="app-table">
            <thead>
              <tr>
                <th>Assignment</th>
                <th>Course</th>
                <th>Deadline</th>
                <th>Marks</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {facultyAssignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td>{assignment.title}</td>
                  <td>{getCourseName(assignment.courseId)}</td>
                  <td>{formatShortDate(assignment.deadline)}</td>
                  <td>{assignment.maxMarks}</td>
                  <td>{assignment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StudentDashboard({ user }: { user: User }) {
  const studentAttendance = attendanceRecords.filter((record) => record.studentId === user.id);
  const positiveAttendance = studentAttendance.filter((record) =>
    ["present", "late", "excused"].includes(record.status)
  ).length;
  const attendanceRate = studentAttendance.length
    ? Math.round((positiveAttendance / studentAttendance.length) * 100)
    : 0;
  const studentNotifications = notifications.filter((notification) => notification.userId === user.id);
  const registeredEventIds = new Set(
    eventRegistrations
      .filter((registration) => registration.studentId === user.id && registration.status === "registered")
      .map((registration) => registration.eventId)
  );
  const appliedPlacementIds = new Set(
    placementApplications
      .filter((application) => application.studentId === user.id)
      .map((application) => application.placementId)
  );
  const openAssignments = assignments.filter((assignment) => assignment.status === "published");
  const registeredEvents = events.filter((event) => registeredEventIds.has(event.id));
  const openPlacements = placements.filter((placement) => placement.status === "open");

  return (
    <div className="space-y-6">
      <div className="app-card-grid">
        <StatCard label="Attendance" value={`${attendanceRate}%`} badge="Current term" badgeClass="app-badge-info" />
        <StatCard label="Open assignments" value={String(openAssignments.length)} badge="Due soon" badgeClass="app-badge-warning" />
        <StatCard label="Registered events" value={String(registeredEvents.length)} badge="Active" badgeClass="app-badge-success" />
        <StatCard label="Unread alerts" value={String(studentNotifications.filter((item) => !item.read).length)} badge="Inbox" badgeClass="app-badge-danger" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="app-panel">
          <div className="app-panel-header">
            <div>
              <h2 className="text-xl font-bold">Today priorities</h2>
              <p className="mt-1 text-sm text-muted">The student can see what needs action first.</p>
            </div>
            <button className="app-button-secondary">View calendar</button>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {openAssignments.slice(0, 2).map((assignment) => (
              <PriorityCard
                key={assignment.id}
                title={assignment.title}
                detail={`${getCourseName(assignment.courseId)} - due ${formatShortDate(assignment.deadline)}`}
                badge="Assignment"
              />
            ))}
            {openPlacements.slice(0, 1).map((placement) => (
              <PriorityCard
                key={placement.id}
                title={placement.companyName}
                detail={`${placement.jobRole} - closes ${formatShortDate(placement.deadline)}`}
                badge="Placement"
              />
            ))}
          </div>
        </section>

        <section className="app-panel">
          <h2 className="text-xl font-bold">Notifications</h2>
          <div className="mt-4 space-y-3">
            {studentNotifications.map((notification) => (
              <div key={notification.id} className="rounded-app border border-line bg-slate-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-bold text-ink">{notification.title}</p>
                  <span className={`app-badge ${notification.read ? "app-badge-info" : "app-badge-danger"}`}>
                    {notification.read ? "Read" : "New"}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">{notification.message}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <StudentListPanel
          title="Attendance history"
          rows={studentAttendance.map((record) => `${getSessionTitle(record.sessionId)} - ${record.status}`)}
          emptyText="No attendance records yet."
        />
        <StudentListPanel
          title="Registered events"
          rows={registeredEvents.map((event) => `${event.title} - ${formatShortDate(event.eventStart)}`)}
          emptyText="No event registrations yet."
        />
        <StudentListPanel
          title="Placement tracking"
          rows={openPlacements.map((placement) => {
            const applied = appliedPlacementIds.has(placement.id) ? "Applied" : "Not applied";
            return `${placement.companyName} - ${placement.jobRole} - ${applied}`;
          })}
          emptyText="No placement notices yet."
        />
      </div>

      <section className="app-panel">
        <div className="app-panel-header">
          <h2 className="text-xl font-bold">Announcements</h2>
          <button className="app-button-ghost">Mark all read</button>
        </div>
        <div className="overflow-x-auto">
          <table className="app-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Audience</th>
                <th>Priority</th>
                <th>Published</th>
              </tr>
            </thead>
            <tbody>
              {announcements
                .filter((announcement) => announcement.audience === "all" || announcement.audience === "students")
                .map((announcement) => (
                  <tr key={announcement.id}>
                    <td>{announcement.title}</td>
                    <td>{announcement.audience}</td>
                    <td>{announcement.priority}</td>
                    <td>{formatShortDate(announcement.publishedAt)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function FoundationSummary() {
  return (
    <div className="app-card-grid">
      {[
        ["Students", campusSummary.studentCount.toLocaleString("en-IN"), "app-badge-info"],
        ["Faculty", campusSummary.facultyCount.toLocaleString("en-IN"), "app-badge-success"],
        ["Events", campusSummary.activeEvents.toLocaleString("en-IN"), "app-badge-warning"],
        ["Alerts", campusSummary.unreadNotifications.toLocaleString("en-IN"), "app-badge-danger"]
      ].map(([label, value, badgeClass]) => (
        <StatCard key={label} label={label} value={value} badge="Foundation" badgeClass={badgeClass} />
      ))}
    </div>
  );
}

function StatCard({
  label,
  value,
  badge,
  badgeClass,
}: {
  label: string;
  value: string;
  badge: string;
  badgeClass: string;
}) {
  return (
    <article className="app-stat-card">
      <span className={`app-badge ${badgeClass}`}>{badge}</span>
      <p className="mt-4 text-sm font-semibold text-muted">{label}</p>
      <p className="mt-1 text-3xl font-bold">{value}</p>
    </article>
  );
}

function PriorityCard({ title, detail, badge }: { title: string; detail: string; badge: string }) {
  return (
    <article className="rounded-app border border-line bg-white p-4">
      <span className="app-badge app-badge-info">{badge}</span>
      <h3 className="mt-4 text-base font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{detail}</p>
      <button className="app-button-primary mt-4 w-full">Open</button>
    </article>
  );
}

function StudentListPanel({ title, rows, emptyText }: { title: string; rows: string[]; emptyText: string }) {
  return (
    <section className="app-panel">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-4 space-y-3">
        {rows.length ? (
          rows.map((row) => (
            <div key={row} className="rounded-app border border-line bg-slate-50 p-3 text-sm leading-6 text-slate-700">
              {row}
            </div>
          ))
        ) : (
          <div className="app-empty-state">{emptyText}</div>
        )}
      </div>
    </section>
  );
}

function LoginScreen({ onLogin }: { onLogin: (role: Role) => void }) {
  const [selectedRole, setSelectedRole] = useState<Role>("admin");
  const credentials = demoCredentials[selectedRole];

  return (
    <main className="app-page grid place-items-center">
      <section className="grid w-full max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="app-panel flex min-h-[520px] flex-col justify-between">
          <div>
            <Brand />
            <p className="app-eyebrow mt-10">Demo access</p>
            <h1 className="app-title text-balance">Sign in to Smart Campus Manager</h1>
            <p className="app-copy">
              Use a seeded account to preview role-based dashboards, protected
              navigation, and campus workflows without connecting a backend yet.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {roles.map((role) => (
              <button
                key={role.id}
                className={`rounded-app border p-4 text-left transition ${
                  selectedRole === role.id
                    ? "border-brand-100 bg-brand-50"
                    : "border-line bg-white hover:border-brand-100 hover:bg-slate-50"
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <p className="font-bold text-ink">{role.label}</p>
                <p className="mt-1 text-sm leading-6 text-muted">{role.description}</p>
              </button>
            ))}
          </div>
        </div>

        <form
          className="app-panel"
          onSubmit={(event) => {
            event.preventDefault();
            onLogin(selectedRole);
          }}
        >
          <p className="app-eyebrow">Test credentials</p>
          <h2 className="mt-3 text-2xl font-bold">Login as {roles.find((role) => role.id === selectedRole)?.label}</h2>
          <div className="mt-6 space-y-4">
            <label>
              <span className="app-label">Email</span>
              <input className="app-input" value={credentials.email} readOnly />
            </label>
            <label>
              <span className="app-label">Password</span>
              <input className="app-input" value={credentials.password} readOnly type="text" />
            </label>
          </div>
          <button className="app-button-primary mt-6 w-full" type="submit">
            Enter dashboard
          </button>
          <p className="mt-4 rounded-app bg-slate-50 p-3 text-sm leading-6 text-muted">
            Authentication is simulated in local state for the demo. Real password
            hashing, sessions, OAuth, and protected API checks are planned for backend
            integration.
          </p>
        </form>
      </section>
    </main>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-app bg-brand-600 text-white">
        <GraduationCap className="h-6 w-6" aria-hidden="true" />
      </div>
      {!compact && (
        <div>
          <p className="text-base font-bold leading-5">Smart Campus</p>
          <p className="text-xs font-semibold text-muted">Manager</p>
        </div>
      )}
    </div>
  );
}

function NavButton({
  item,
  isActive,
  onClick,
}: {
  item: { label: string; icon: React.ElementType };
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;

  return (
    <button className={`app-nav-button ${isActive ? "app-nav-button-active" : ""}`} onClick={onClick}>
      <Icon className="h-5 w-5" aria-hidden="true" />
      <span>{item.label}</span>
    </button>
  );
}

function getViewTitle(view: View) {
  return navItems.find((item) => item.id === view)?.label ?? "Dashboard";
}

function getCourseName(courseId: string) {
  return courses.find((course) => course.id === courseId)?.name ?? "Course";
}

function getAssignmentTitle(assignmentId: string) {
  return assignments.find((assignment) => assignment.id === assignmentId)?.title ?? "Assignment";
}

function getUserName(userId: string) {
  return users.find((user) => user.id === userId)?.name ?? "User";
}

function getSessionTitle(sessionId: string) {
  const session = attendanceSessions.find((item) => item.id === sessionId);
  return session ? `${getCourseName(session.courseId)} ${session.title}` : "Attendance session";
}

function formatShortDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
