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
  activityLogs,
  attendanceRecords,
  attendanceSessions,
  campusSummary,
  clubMemberships,
  clubs,
  courses,
  demoCredentials,
  departments,
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

            <WorkspaceContent view={activeView} user={currentUser} />
          </section>
        </main>
      </div>
    </div>
  );
}

function WorkspaceContent({ view, user }: { view: View; user: User }) {
  if (view === "attendance") {
    return <AttendanceModule user={user} />;
  }

  if (view === "assignments") {
    return <AssignmentModule user={user} />;
  }

  if (view === "events") {
    return <EventModule user={user} />;
  }

  if (view === "placements") {
    return <PlacementModule user={user} />;
  }

  if (view === "announcements") {
    return <AnnouncementsModule user={user} />;
  }

  if (view === "dashboard" && user.role === "student") {
    return <StudentDashboard user={user} />;
  }

  if (view === "dashboard" && user.role === "faculty") {
    return <FacultyDashboard user={user} />;
  }

  if (view === "dashboard" && user.role === "coordinator") {
    return <CoordinatorDashboard user={user} />;
  }

  if (view === "dashboard" && user.role === "admin") {
    return <AdminDashboard />;
  }

  return <FoundationSummary />;
}

function AnnouncementsModule({ user }: { user: User }) {
  const canPublish = user.role === "faculty" || user.role === "coordinator" || user.role === "admin";
  const visibleAnnouncements = announcements.filter((announcement) => {
    if (announcement.audience === "all") {
      return true;
    }
    if (announcement.audience === "students") {
      return user.role === "student";
    }
    if (announcement.audience === "faculty") {
      return user.role === "faculty";
    }
    if (announcement.audience === "coordinators") {
      return user.role === "coordinator";
    }
    return true;
  });
  const userNotifications = notifications.filter((notification) => notification.userId === user.id);

  return (
    <div className="space-y-6">
      <div className="app-card-grid">
        <StatCard label="Visible announcements" value={String(visibleAnnouncements.length)} badge="Targeted" badgeClass="app-badge-info" />
        <StatCard label="Urgent notices" value={String(visibleAnnouncements.filter((item) => item.priority === "urgent").length)} badge="Priority" badgeClass="app-badge-danger" />
        <StatCard label="Notifications" value={String(userNotifications.length)} badge="Inbox" badgeClass="app-badge-warning" />
        <StatCard label="Unread" value={String(userNotifications.filter((item) => !item.read).length)} badge="Action" badgeClass="app-badge-success" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="app-panel">
          <div className="app-panel-header">
            <div>
              <h2 className="text-xl font-bold">Announcements</h2>
              <p className="mt-1 text-sm text-muted">Role-aware notices for students, faculty, coordinators, departments, or everyone.</p>
            </div>
            {canPublish ? <button className="app-button-primary">Publish announcement</button> : <button className="app-button-secondary">Mark read</button>}
          </div>
          <div className="overflow-x-auto">
            <table className="app-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Audience</th>
                  <th>Priority</th>
                  <th>Published</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {visibleAnnouncements.map((announcement) => (
                  <tr key={announcement.id}>
                    <td>{announcement.title}</td>
                    <td>{announcement.audience}</td>
                    <td>{announcement.priority}</td>
                    <td>{formatShortDate(announcement.publishedAt)}</td>
                    <td>{announcement.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="app-panel">
          {canPublish ? <AnnouncementComposer /> : <NotificationCenter notificationsForUser={userNotifications} />}
        </section>
      </div>

      {canPublish ? (
        <section className="app-panel">
          <div className="app-panel-header">
            <div>
              <h2 className="text-xl font-bold">Notification center</h2>
              <p className="mt-1 text-sm text-muted">System, attendance, event, placement, and assignment alerts.</p>
            </div>
            <button className="app-button-secondary">Mark all read</button>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {notifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function AnnouncementComposer() {
  return (
    <form>
      <h2 className="text-xl font-bold">Create announcement</h2>
      <p className="mt-1 text-sm text-muted">Demo composer for targeted notices and priority levels.</p>
      <div className="mt-5 space-y-4">
        <label>
          <span className="app-label">Title</span>
          <input className="app-input" defaultValue="Internal assessment schedule updated" />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className="app-label">Audience</span>
            <select className="app-input" defaultValue="students">
              <option value="all">All</option>
              <option value="students">Students</option>
              <option value="faculty">Faculty</option>
              <option value="coordinators">Coordinators</option>
              <option value="department">Department</option>
            </select>
          </label>
          <label>
            <span className="app-label">Priority</span>
            <select className="app-input" defaultValue="high">
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </label>
        </div>
        <label>
          <span className="app-label">Message</span>
          <textarea className="app-input min-h-28 py-3" defaultValue="Students should check their course dashboards for updated assessment slots." />
        </label>
      </div>
      <button className="app-button-primary mt-5 w-full" type="button">
        Publish notice
      </button>
    </form>
  );
}

function NotificationCenter({ notificationsForUser }: { notificationsForUser: typeof notifications }) {
  return (
    <div>
      <h2 className="text-xl font-bold">My notifications</h2>
      <p className="mt-1 text-sm text-muted">Read and unread notifications for the active account.</p>
      <div className="mt-5 space-y-3">
        {notificationsForUser.length ? (
          notificationsForUser.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))
        ) : (
          <div className="app-empty-state">No notifications for this account.</div>
        )}
      </div>
    </div>
  );
}

function NotificationItem({ notification }: { notification: (typeof notifications)[number] }) {
  return (
    <div className="rounded-app border border-line bg-slate-50 p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-ink">{notification.title}</p>
          <p className="mt-1 text-xs capitalize text-muted">{notification.type}</p>
        </div>
        <span className={`app-badge ${notification.read ? "app-badge-info" : "app-badge-danger"}`}>
          {notification.read ? "Read" : "Unread"}
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-muted">{notification.message}</p>
    </div>
  );
}

function PlacementModule({ user }: { user: User }) {
  const canManage = user.role === "coordinator" || user.role === "admin";
  const visiblePlacements = canManage && user.role === "coordinator"
    ? placements.filter((placement) => placement.createdBy === user.id)
    : placements;
  const studentApplications = placementApplications.filter((application) => application.studentId === user.id);
  const appliedPlacementIds = new Set(studentApplications.map((application) => application.placementId));

  return (
    <div className="space-y-6">
      <div className="app-card-grid">
        <StatCard label="Placement notices" value={String(visiblePlacements.length)} badge="Notices" badgeClass="app-badge-info" />
        <StatCard label="Open roles" value={String(visiblePlacements.filter((placement) => placement.status === "open").length)} badge="Hiring" badgeClass="app-badge-success" />
        <StatCard label="Applications" value={String(placementApplications.length)} badge="Students" badgeClass="app-badge-warning" />
        <StatCard label="Shortlisted" value={String(placementApplications.filter((application) => application.status === "shortlisted").length)} badge="Review" badgeClass="app-badge-danger" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="app-panel">
          <div className="app-panel-header">
            <div>
              <h2 className="text-xl font-bold">{canManage ? "Manage placement notices" : "Open placement notices"}</h2>
              <p className="mt-1 text-sm text-muted">Eligibility, CTC, deadline, and application state.</p>
            </div>
            {canManage ? <button className="app-button-primary">Create notice</button> : <button className="app-button-secondary">My applications</button>}
          </div>
          <div className="overflow-x-auto">
            <table className="app-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>CTC</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {visiblePlacements.map((placement) => (
                  <tr key={placement.id}>
                    <td>{placement.companyName}</td>
                    <td>{placement.jobRole}</td>
                    <td>{placement.ctc}</td>
                    <td>{formatShortDate(placement.deadline)}</td>
                    <td>{placement.status}</td>
                    <td>{canManage ? "Manage" : appliedPlacementIds.has(placement.id) ? "Applied" : "Apply"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="app-panel">
          {canManage ? <PlacementCreateForm /> : <StudentApplicationPanel applications={studentApplications} />}
        </section>
      </div>

      {canManage ? (
        <section className="app-panel">
          <div className="app-panel-header">
            <div>
              <h2 className="text-xl font-bold">Placement applications</h2>
              <p className="mt-1 text-sm text-muted">Coordinator/admin status controls for applications.</p>
            </div>
            <button className="app-button-secondary">Export list</button>
          </div>
          <div className="overflow-x-auto">
            <table className="app-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Applied</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {placementApplications.map((application) => {
                  const placement = placements.find((item) => item.id === application.placementId);
                  return (
                    <tr key={application.id}>
                      <td>{getUserName(application.studentId)}</td>
                      <td>{placement?.companyName ?? "Company"}</td>
                      <td>{placement?.jobRole ?? "Role"}</td>
                      <td>{formatShortDate(application.appliedAt)}</td>
                      <td>{application.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function PlacementCreateForm() {
  return (
    <form>
      <h2 className="text-xl font-bold">Create placement notice</h2>
      <p className="mt-1 text-sm text-muted">Demo form for company, role, eligibility, CTC, and deadline.</p>
      <div className="mt-5 space-y-4">
        <label>
          <span className="app-label">Company</span>
          <input className="app-input" defaultValue="Campus Partner Technologies" />
        </label>
        <label>
          <span className="app-label">Role</span>
          <input className="app-input" defaultValue="Frontend Engineer Intern" />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className="app-label">CTC</span>
            <input className="app-input" defaultValue="7.5 LPA" />
          </label>
          <label>
            <span className="app-label">Deadline</span>
            <input className="app-input" type="date" defaultValue="2026-09-15" />
          </label>
        </div>
        <label>
          <span className="app-label">Eligibility</span>
          <textarea className="app-input min-h-28 py-3" defaultValue="CSE/ECE students with portfolio projects and no active backlogs." />
        </label>
      </div>
      <button className="app-button-primary mt-5 w-full" type="button">
        Publish placement
      </button>
    </form>
  );
}

function StudentApplicationPanel({ applications }: { applications: typeof placementApplications }) {
  return (
    <div>
      <h2 className="text-xl font-bold">My applications</h2>
      <p className="mt-1 text-sm text-muted">Track placement applications and current review status.</p>
      <div className="mt-5 space-y-3">
        {applications.length ? (
          applications.map((application) => {
            const placement = placements.find((item) => item.id === application.placementId);
            return (
              <div key={application.id} className="rounded-app border border-line bg-slate-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-bold text-ink">{placement?.companyName ?? "Company"}</p>
                  <span className="app-badge app-badge-info">{application.status}</span>
                </div>
                <p className="mt-2 text-sm text-muted">{placement?.jobRole ?? "Role"} - applied {formatShortDate(application.appliedAt)}</p>
              </div>
            );
          })
        ) : (
          <div className="app-empty-state">No placement applications yet.</div>
        )}
      </div>
      <button className="app-button-primary mt-5 w-full">Apply to selected notice</button>
    </div>
  );
}

function EventModule({ user }: { user: User }) {
  const canManage = user.role === "coordinator" || user.role === "admin";
  const managedEvents = canManage && user.role === "coordinator"
    ? events.filter((event) => event.createdBy === user.id)
    : events;
  const studentRegistrations = eventRegistrations.filter((registration) => registration.studentId === user.id);
  const registeredEventIds = new Set(studentRegistrations.map((registration) => registration.eventId));

  return (
    <div className="space-y-6">
      <div className="app-card-grid">
        <StatCard label="Events" value={String(managedEvents.length)} badge="Campus" badgeClass="app-badge-info" />
        <StatCard label="Published" value={String(managedEvents.filter((event) => event.status === "published").length)} badge="Live" badgeClass="app-badge-success" />
        <StatCard label="Registrations" value={String(eventRegistrations.length)} badge="Tickets" badgeClass="app-badge-warning" />
        <StatCard label="Seats open" value={String(managedEvents.reduce((sum, event) => sum + event.availableSeats, 0))} badge="Capacity" badgeClass="app-badge-danger" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="app-panel">
          <div className="app-panel-header">
            <div>
              <h2 className="text-xl font-bold">{canManage ? "Manage events" : "Browse events"}</h2>
              <p className="mt-1 text-sm text-muted">Capacity, venue, registration deadline, and event status.</p>
            </div>
            {canManage ? <button className="app-button-primary">Create event</button> : <button className="app-button-secondary">My tickets</button>}
          </div>
          <div className="overflow-x-auto">
            <table className="app-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Venue</th>
                  <th>Date</th>
                  <th>Seats</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {managedEvents.map((event) => {
                  const isRegistered = registeredEventIds.has(event.id);
                  return (
                    <tr key={event.id}>
                      <td>{event.title}</td>
                      <td>{event.venue}</td>
                      <td>{formatShortDate(event.eventStart)}</td>
                      <td>
                        {event.availableSeats}/{event.totalSeats}
                      </td>
                      <td>{event.status}</td>
                      <td>{canManage ? "Edit" : isRegistered ? "Cancel" : "Register"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="app-panel">
          {canManage ? <EventCreateForm /> : <StudentTicketPanel registrations={studentRegistrations} />}
        </section>
      </div>

      {canManage ? (
        <section className="app-panel">
          <div className="app-panel-header">
            <div>
              <h2 className="text-xl font-bold">Event registrations</h2>
              <p className="mt-1 text-sm text-muted">Registration status and ticket codes for managed events.</p>
            </div>
            <button className="app-button-secondary">Export CSV</button>
          </div>
          <div className="overflow-x-auto">
            <table className="app-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Event</th>
                  <th>Ticket</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {eventRegistrations.map((registration) => (
                  <tr key={registration.id}>
                    <td>{getUserName(registration.studentId)}</td>
                    <td>{getEventTitle(registration.eventId)}</td>
                    <td>{registration.ticketCode}</td>
                    <td>{registration.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function EventCreateForm() {
  return (
    <form>
      <h2 className="text-xl font-bold">Create event</h2>
      <p className="mt-1 text-sm text-muted">Demo form for event publishing and capacity setup.</p>
      <div className="mt-5 space-y-4">
        <label>
          <span className="app-label">Title</span>
          <input className="app-input" defaultValue="Campus innovation meetup" />
        </label>
        <label>
          <span className="app-label">Venue</span>
          <input className="app-input" defaultValue="Innovation Hall" />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className="app-label">Event date</span>
            <input className="app-input" type="date" defaultValue="2026-09-10" />
          </label>
          <label>
            <span className="app-label">Seats</span>
            <input className="app-input" type="number" defaultValue="100" />
          </label>
        </div>
        <label>
          <span className="app-label">Description</span>
          <textarea className="app-input min-h-28 py-3" defaultValue="A student-focused event for campus project demos." />
        </label>
      </div>
      <button className="app-button-primary mt-5 w-full" type="button">
        Publish event
      </button>
    </form>
  );
}

function StudentTicketPanel({ registrations }: { registrations: typeof eventRegistrations }) {
  return (
    <div>
      <h2 className="text-xl font-bold">My event tickets</h2>
      <p className="mt-1 text-sm text-muted">Registered events, cancellation state, and ticket codes.</p>
      <div className="mt-5 space-y-3">
        {registrations.length ? (
          registrations.map((registration) => (
            <div key={registration.id} className="rounded-app border border-line bg-slate-50 p-3">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-bold text-ink">{getEventTitle(registration.eventId)}</p>
                <span className="app-badge app-badge-success">{registration.status}</span>
              </div>
              <p className="mt-2 text-sm text-muted">Ticket: {registration.ticketCode}</p>
              <button className="app-button-secondary mt-4 w-full">Cancel registration</button>
            </div>
          ))
        ) : (
          <div className="app-empty-state">No event registrations yet.</div>
        )}
      </div>
    </div>
  );
}

function AssignmentModule({ user }: { user: User }) {
  const visibleAssignments =
    user.role === "faculty"
      ? assignments.filter((assignment) => assignment.facultyId === user.id)
      : assignments.filter((assignment) => assignment.status !== "draft" || user.role === "admin");
  const studentSubmissions = assignmentSubmissions.filter((submission) => submission.studentId === user.id);
  const canManage = user.role === "faculty" || user.role === "admin";

  return (
    <div className="space-y-6">
      <div className="app-card-grid">
        <StatCard label="Assignments" value={String(visibleAssignments.length)} badge="Visible" badgeClass="app-badge-info" />
        <StatCard label="Published" value={String(visibleAssignments.filter((item) => item.status === "published").length)} badge="Open" badgeClass="app-badge-success" />
        <StatCard label="Submissions" value={String(assignmentSubmissions.length)} badge="Total" badgeClass="app-badge-warning" />
        <StatCard label="Pending review" value={String(assignmentSubmissions.filter((item) => item.status === "submitted").length)} badge="Faculty" badgeClass="app-badge-danger" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="app-panel">
          <div className="app-panel-header">
            <div>
              <h2 className="text-xl font-bold">{user.role === "student" ? "Assigned work" : "Assignment listing"}</h2>
              <p className="mt-1 text-sm text-muted">Deadlines, marks, course mapping, and publication status.</p>
            </div>
            {canManage ? <button className="app-button-primary">Create assignment</button> : <button className="app-button-primary">Submit work</button>}
          </div>
          <div className="overflow-x-auto">
            <table className="app-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Course</th>
                  <th>Deadline</th>
                  <th>Marks</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {visibleAssignments.map((assignment) => (
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

        <section className="app-panel">
          {canManage ? (
            <AssignmentCreateForm />
          ) : (
            <StudentSubmissionPanel submissions={studentSubmissions} />
          )}
        </section>
      </div>

      {canManage ? (
        <section className="app-panel">
          <div className="app-panel-header">
            <div>
              <h2 className="text-xl font-bold">Submission review</h2>
              <p className="mt-1 text-sm text-muted">Faculty can inspect submissions, marks, and feedback state.</p>
            </div>
            <button className="app-button-secondary">Save feedback</button>
          </div>
          <div className="overflow-x-auto">
            <table className="app-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Assignment</th>
                  <th>Type</th>
                  <th>Late</th>
                  <th>Marks</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {assignmentSubmissions.map((submission) => (
                  <tr key={submission.id}>
                    <td>{getUserName(submission.studentId)}</td>
                    <td>{getAssignmentTitle(submission.assignmentId)}</td>
                    <td>{submission.submissionType.replace("_", " ")}</td>
                    <td>{submission.late ? "Yes" : "No"}</td>
                    <td>{submission.marks ?? "Pending"}</td>
                    <td>{submission.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function AssignmentCreateForm() {
  return (
    <form>
      <h2 className="text-xl font-bold">Create assignment</h2>
      <p className="mt-1 text-sm text-muted">Demo form for title, course, deadline, rubric, and marks.</p>
      <div className="mt-5 space-y-4">
        <label>
          <span className="app-label">Title</span>
          <input className="app-input" defaultValue="Mini project checkpoint" />
        </label>
        <label>
          <span className="app-label">Course</span>
          <select className="app-input" defaultValue={courses[0]?.id}>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className="app-label">Deadline</span>
            <input className="app-input" type="date" defaultValue="2026-08-30" />
          </label>
          <label>
            <span className="app-label">Max marks</span>
            <input className="app-input" type="number" defaultValue="50" />
          </label>
        </div>
        <label>
          <span className="app-label">Rubric</span>
          <textarea className="app-input min-h-28 py-3" defaultValue="Correctness, UX quality, code organization, and demo readiness." />
        </label>
      </div>
      <button className="app-button-primary mt-5 w-full" type="button">
        Publish assignment
      </button>
    </form>
  );
}

function StudentSubmissionPanel({ submissions }: { submissions: typeof assignmentSubmissions }) {
  return (
    <div>
      <h2 className="text-xl font-bold">Submit assignment</h2>
      <p className="mt-1 text-sm text-muted">Demo submission accepts PDF, ZIP, or GitHub links.</p>
      <div className="mt-5 space-y-4">
        <label>
          <span className="app-label">Assignment</span>
          <select className="app-input" defaultValue={assignments[0]?.id}>
            {assignments
              .filter((assignment) => assignment.status === "published")
              .map((assignment) => (
                <option key={assignment.id} value={assignment.id}>
                  {assignment.title}
                </option>
              ))}
          </select>
        </label>
        <label>
          <span className="app-label">GitHub or file URL</span>
          <input className="app-input" defaultValue="https://github.com/student/campus-assignment" />
        </label>
        <button className="app-button-primary w-full" type="button">
          Submit work
        </button>
      </div>
      <div className="mt-6 space-y-3">
        <h3 className="font-bold">Submission history</h3>
        {submissions.length ? (
          submissions.map((submission) => (
            <div key={submission.id} className="rounded-app border border-line bg-slate-50 p-3 text-sm">
              <p className="font-bold text-ink">{getAssignmentTitle(submission.assignmentId)}</p>
              <p className="mt-1 text-muted">
                {submission.status} - marks {submission.marks ?? "pending"}
              </p>
            </div>
          ))
        ) : (
          <div className="app-empty-state">No submissions yet.</div>
        )}
      </div>
    </div>
  );
}

function AttendanceModule({ user }: { user: User }) {
  if (user.role === "student") {
    const studentRecords = attendanceRecords.filter((record) => record.studentId === user.id);
    const positiveRecords = studentRecords.filter((record) =>
      ["present", "late", "excused"].includes(record.status)
    );
    const attendanceRate = studentRecords.length
      ? Math.round((positiveRecords.length / studentRecords.length) * 100)
      : 0;

    return (
      <div className="space-y-6">
        <div className="app-card-grid">
          <StatCard label="Overall attendance" value={`${attendanceRate}%`} badge="Current" badgeClass="app-badge-info" />
          <StatCard label="Present count" value={String(positiveRecords.length)} badge="Marked" badgeClass="app-badge-success" />
          <StatCard label="Total sessions" value={String(studentRecords.length)} badge="History" badgeClass="app-badge-warning" />
          <StatCard label="Action needed" value={String(studentRecords.filter((record) => record.status === "absent").length)} badge="Absences" badgeClass="app-badge-danger" />
        </div>

        <section className="app-panel">
          <div className="app-panel-header">
            <div>
              <h2 className="text-xl font-bold">My attendance history</h2>
              <p className="mt-1 text-sm text-muted">Subject-wise attendance records visible only to the student.</p>
            </div>
            <button className="app-button-secondary">Download report</button>
          </div>
          <div className="overflow-x-auto">
            <table className="app-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Session</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Marked at</th>
                </tr>
              </thead>
              <tbody>
                {studentRecords.map((record) => {
                  const session = attendanceSessions.find((item) => item.id === record.sessionId);
                  return (
                    <tr key={record.id}>
                      <td>{session ? getCourseName(session.courseId) : "Course"}</td>
                      <td>{session?.title ?? "Session"}</td>
                      <td>{session ? formatShortDate(session.sessionDate) : "N/A"}</td>
                      <td>{record.status}</td>
                      <td>{formatShortDate(record.markedAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }

  const manageableSessions =
    user.role === "faculty"
      ? attendanceSessions.filter((session) => session.facultyId === user.id)
      : attendanceSessions;
  const studentUsers = users.filter((candidate) => candidate.role === "student");
  const selectedSession = manageableSessions[0];

  return (
    <div className="space-y-6">
      <div className="app-card-grid">
        <StatCard label="Sessions" value={String(manageableSessions.length)} badge="Total" badgeClass="app-badge-info" />
        <StatCard label="Open sessions" value={String(manageableSessions.filter((session) => session.status === "open").length)} badge="Marking" badgeClass="app-badge-warning" />
        <StatCard label="Closed sessions" value={String(manageableSessions.filter((session) => session.status === "closed").length)} badge="Locked" badgeClass="app-badge-success" />
        <StatCard label="Students" value={String(studentUsers.length)} badge="Roster" badgeClass="app-badge-danger" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <section className="app-panel">
          <div className="app-panel-header">
            <div>
              <h2 className="text-xl font-bold">Attendance sessions</h2>
              <p className="mt-1 text-sm text-muted">Faculty and admins can create, inspect, and close sessions.</p>
            </div>
            <button className="app-button-primary">Create session</button>
          </div>
          <div className="overflow-x-auto">
            <table className="app-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Course</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {manageableSessions.map((session) => (
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
              <h2 className="text-xl font-bold">Mark attendance</h2>
              <p className="mt-1 text-sm text-muted">
                Demo controls for {selectedSession ? getSessionTitle(selectedSession.id) : "an attendance session"}.
              </p>
            </div>
            <button className="app-button-secondary">Save marks</button>
          </div>
          <div className="space-y-3">
            {studentUsers.map((student, index) => {
              const status = index === 0 ? "present" : "absent";
              return (
                <div key={student.id} className="flex flex-wrap items-center justify-between gap-3 rounded-app border border-line bg-slate-50 p-3">
                  <div>
                    <p className="text-sm font-bold text-ink">{student.name}</p>
                    <p className="text-xs text-muted">{student.email}</p>
                  </div>
                  <div className="flex gap-2">
                    {(["present", "absent", "late", "excused"] as const).map((option) => (
                      <button
                        key={option}
                        className={`app-badge ${option === status ? "app-badge-info" : "bg-white text-muted"}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const activeUsers = users.filter((user) => user.status === "active");
  const publishedEvents = events.filter((event) => event.status === "published");
  const reviewedSubmissions = assignmentSubmissions.filter((submission) => submission.status === "reviewed");
  const assignmentCompletion = assignments.length
    ? Math.round((reviewedSubmissions.length / assignments.length) * 100)
    : 0;
  const positiveAttendance = attendanceRecords.filter((record) =>
    ["present", "late", "excused"].includes(record.status)
  ).length;
  const averageAttendance = attendanceRecords.length
    ? Math.round((positiveAttendance / attendanceRecords.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <div className="app-card-grid">
        <StatCard label="Students" value={String(campusSummary.studentCount)} badge="Campus" badgeClass="app-badge-info" />
        <StatCard label="Faculty" value={String(campusSummary.facultyCount)} badge="Users" badgeClass="app-badge-success" />
        <StatCard label="Departments" value={String(campusSummary.departmentCount)} badge="Academic" badgeClass="app-badge-warning" />
        <StatCard label="Open placements" value={String(campusSummary.openPlacements)} badge="Career" badgeClass="app-badge-danger" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="app-panel">
          <div className="app-panel-header">
            <div>
              <h2 className="text-xl font-bold">Campus operations</h2>
              <p className="mt-1 text-sm text-muted">A consolidated view of users, academics, events, and placements.</p>
            </div>
            <button className="app-button-primary">Generate report</button>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <AdminMetric label="Active users" value={String(activeUsers.length)} detail="Seeded accounts" />
            <AdminMetric label="Average attendance" value={`${averageAttendance}%`} detail="Across marked records" />
            <AdminMetric label="Assignment completion" value={`${assignmentCompletion}%`} detail="Reviewed submissions" />
            <AdminMetric label="Published events" value={String(publishedEvents.length)} detail="Accepting registrations" />
            <AdminMetric label="Placement applications" value={String(placementApplications.length)} detail="Student applications" />
            <AdminMetric label="Announcements" value={String(announcements.length)} detail="Published notices" />
          </div>
        </section>

        <section className="app-panel">
          <div className="app-panel-header">
            <div>
              <h2 className="text-xl font-bold">Audit log preview</h2>
              <p className="mt-1 text-sm text-muted">Sensitive actions for admin review.</p>
            </div>
            <button className="app-button-secondary">View all</button>
          </div>
          <div className="space-y-3">
            {activityLogs.map((log) => (
              <div key={log.id} className="rounded-app border border-line bg-slate-50 p-3">
                <p className="text-sm font-bold text-ink">{log.action.replaceAll("_", " ")}</p>
                <p className="mt-2 text-sm text-muted">
                  {getUserName(log.actorId)} updated {log.entityType} on {formatShortDate(log.createdAt)}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className="app-panel">
          <div className="app-panel-header">
            <h2 className="text-xl font-bold">Department stats</h2>
            <button className="app-button-ghost">Manage departments</button>
          </div>
          <div className="overflow-x-auto">
            <table className="app-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Code</th>
                  <th>Students</th>
                  <th>Head</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((department) => (
                  <tr key={department.id}>
                    <td>{department.name}</td>
                    <td>{department.code}</td>
                    <td>{department.studentCount}</td>
                    <td>{getUserName(department.headFacultyId)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="app-panel">
          <div className="app-panel-header">
            <h2 className="text-xl font-bold">User role overview</h2>
            <button className="app-button-ghost">Manage users</button>
          </div>
          <div className="overflow-x-auto">
            <table className="app-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

function AdminMetric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-app border border-line bg-white p-4">
      <p className="text-sm font-semibold text-muted">{label}</p>
      <p className="mt-2 text-2xl font-bold text-ink">{value}</p>
      <p className="mt-1 text-xs text-muted">{detail}</p>
    </div>
  );
}

function CoordinatorDashboard({ user }: { user: User }) {
  const coordinatorEvents = events.filter((event) => event.createdBy === user.id);
  const coordinatorPlacements = placements.filter((placement) => placement.createdBy === user.id);
  const coordinatorClubs = clubs.filter((club) => club.coordinatorId === user.id);
  const coordinatorAnnouncements = announcements.filter((announcement) => announcement.createdBy === user.id);
  const registrationCount = eventRegistrations.filter((registration) =>
    coordinatorEvents.some((event) => event.id === registration.eventId)
  ).length;
  const pendingClubRequests = clubMemberships.filter((membership) => membership.status === "pending");

  return (
    <div className="space-y-6">
      <div className="app-card-grid">
        <StatCard label="Managed events" value={String(coordinatorEvents.length)} badge="Events" badgeClass="app-badge-info" />
        <StatCard label="Registrations" value={String(registrationCount)} badge="Tickets" badgeClass="app-badge-success" />
        <StatCard label="Open placements" value={String(coordinatorPlacements.filter((placement) => placement.status === "open").length)} badge="Hiring" badgeClass="app-badge-warning" />
        <StatCard label="Club requests" value={String(pendingClubRequests.length)} badge="Approvals" badgeClass="app-badge-danger" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="app-panel">
          <div className="app-panel-header">
            <div>
              <h2 className="text-xl font-bold">Event coordination</h2>
              <p className="mt-1 text-sm text-muted">Capacity, venue, and status for managed campus events.</p>
            </div>
            <button className="app-button-primary">Create event</button>
          </div>
          <div className="overflow-x-auto">
            <table className="app-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Venue</th>
                  <th>Date</th>
                  <th>Seats</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {coordinatorEvents.map((event) => (
                  <tr key={event.id}>
                    <td>{event.title}</td>
                    <td>{event.venue}</td>
                    <td>{formatShortDate(event.eventStart)}</td>
                    <td>
                      {event.totalSeats - event.availableSeats}/{event.totalSeats}
                    </td>
                    <td>{event.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="app-panel">
          <div className="app-panel-header">
            <div>
              <h2 className="text-xl font-bold">Club approvals</h2>
              <p className="mt-1 text-sm text-muted">Pending and active club participation requests.</p>
            </div>
            <button className="app-button-secondary">Review</button>
          </div>
          <div className="space-y-3">
            {clubMemberships.map((membership) => (
              <div key={membership.id} className="rounded-app border border-line bg-slate-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-bold text-ink">{getClubName(membership.clubId)}</p>
                  <span className={`app-badge ${membership.status === "pending" ? "app-badge-warning" : "app-badge-success"}`}>
                    {membership.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted">
                  {getUserName(membership.studentId)} - {membership.membershipRole}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <StudentListPanel
          title="Managed clubs"
          rows={coordinatorClubs.map((club) => `${club.name} - ${club.category} - ${club.status}`)}
          emptyText="No clubs assigned."
        />
        <StudentListPanel
          title="Placement notices"
          rows={coordinatorPlacements.map((placement) => `${placement.companyName} - ${placement.jobRole} - ${placement.status}`)}
          emptyText="No placement notices."
        />
        <StudentListPanel
          title="Announcements"
          rows={coordinatorAnnouncements.map((announcement) => `${announcement.title} - ${announcement.priority}`)}
          emptyText="No announcements created."
        />
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

function getEventTitle(eventId: string) {
  return events.find((event) => event.id === eventId)?.title ?? "Event";
}

function getClubName(clubId: string) {
  return clubs.find((club) => club.id === clubId)?.name ?? "Club";
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
