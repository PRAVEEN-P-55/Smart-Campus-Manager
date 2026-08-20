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
import { campusSummary, demoCredentials, roles, type Role, users } from "./data/campusData";
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
  const [role, setRole] = useState<Role>("admin");
  const [activeView, setActiveView] = useState<View>("dashboard");
  const currentUser = users.find((user) => user.role === role) ?? users[0];
  const availableNavItems = useMemo(
    () => navItems.filter((item) => item.allowedRoles.includes(role)),
    [role]
  );

  function handleRoleChange(nextRole: Role) {
    setRole(nextRole);
    setActiveView("dashboard");
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
              <select
                className="app-input w-40 font-bold"
                value={role}
                onChange={(event) => handleRoleChange(event.target.value as Role)}
              >
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
            <button className="app-icon-button" aria-label="Log out">
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

            <div className="app-card-grid">
              {[
                ["Students", campusSummary.studentCount.toLocaleString("en-IN"), "app-badge-info"],
                ["Faculty", campusSummary.facultyCount.toLocaleString("en-IN"), "app-badge-success"],
                ["Events", campusSummary.activeEvents.toLocaleString("en-IN"), "app-badge-warning"],
                ["Alerts", campusSummary.unreadNotifications.toLocaleString("en-IN"), "app-badge-danger"]
              ].map(([label, value, badgeClass]) => (
                <article className="app-stat-card" key={label}>
                  <span className={`app-badge ${badgeClass}`}>Foundation</span>
                  <p className="mt-4 text-sm font-semibold text-muted">{label}</p>
                  <p className="mt-1 text-3xl font-bold">{value}</p>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
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

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
