# Smart Campus Manager Milestones

Workflow rule: finish one milestone, stop, push it, then continue only after the user says `continue`.

Repository target:

```text
PRAVEEN-P-55/Smart-Campus-Manager
```

## Milestone 1 - Project Plan And Repo Workflow

- Read all provided PS-1 specification files.
- Create this 20-milestone implementation plan.
- Confirm the push-after-each-milestone workflow.

Push after completion:

```bash
git init
git branch -M main
git remote add origin https://github.com/PRAVEEN-P-55/Smart-Campus-Manager.git
git add .
git commit -m "docs: add project milestone plan"
git push -u origin main
```

## Milestone 2 - App Scaffold

- Create React + TypeScript + Vite project files.
- Add Tailwind CSS setup.
- Add `.env.example` and `.gitignore`.
- Verify the empty app builds.

Push after completion:

```bash
git add .
git commit -m "chore: scaffold app foundation"
git push
```

## Milestone 3 - Design System Foundation

- Add global styles, theme tokens, layout rules, and accessibility basics.
- Define app shell spacing, colors, typography, buttons, panels, tables, and responsive behavior.

Push after completion:

```bash
git add .
git commit -m "style: add design system foundation"
git push
```

## Milestone 4 - Seed Data Layer

- Add typed mock data for users, roles, departments, courses, attendance, assignments, events, placements, announcements, notifications, analytics, and activity logs.
- Keep data centralized for easy replacement with an API later.

Push after completion:

```bash
git add .
git commit -m "feat: add seeded campus data"
git push
```

## Milestone 5 - App Shell And Navigation

- Build sidebar, header, mobile navigation, global search field, notification button, and demo account switcher.
- Enforce role-aware navigation visibility.

Push after completion:

```bash
git add .
git commit -m "feat: add role-aware app shell"
git push
```

## Milestone 6 - Authentication Demo Flow

- Add login/demo account screen.
- Add fake session state, logout, protected app shell, and role selection.
- Document test credentials.

Push after completion:

```bash
git add .
git commit -m "feat: add demo authentication flow"
git push
```

## Milestone 7 - Student Dashboard

- Build student metrics, priorities, attendance summary, upcoming assignments, events, placements, notifications, and recent activity.

Push after completion:

```bash
git add .
git commit -m "feat: add student dashboard"
git push
```

## Milestone 8 - Faculty Dashboard

- Build faculty class metrics, attendance actions, assignment queue, submissions, and course performance widgets.

Push after completion:

```bash
git add .
git commit -m "feat: add faculty dashboard"
git push
```

## Milestone 9 - Coordinator Dashboard

- Build event, announcement, registration, club, and placement coordination overview.

Push after completion:

```bash
git add .
git commit -m "feat: add coordinator dashboard"
git push
```

## Milestone 10 - Admin Dashboard

- Build campus-wide metrics, user counts, department stats, event stats, placement stats, and audit log preview.

Push after completion:

```bash
git add .
git commit -m "feat: add admin dashboard"
git push
```

## Milestone 11 - Attendance Module

- Build attendance sessions table.
- Build student attendance history.
- Build faculty/admin mark-attendance UI.

Push after completion:

```bash
git add .
git commit -m "feat: add attendance module"
git push
```

## Milestone 12 - Assignment Module

- Build assignment listing.
- Build create assignment form.
- Build student submission UI.
- Build faculty review UI.

Push after completion:

```bash
git add .
git commit -m "feat: add assignment module"
git push
```

## Milestone 13 - Event Module

- Build event listing.
- Build create/manage event UI.
- Build student registration and cancellation UI.

Push after completion:

```bash
git add .
git commit -m "feat: add event module"
git push
```

## Milestone 14 - Placement Module

- Build placement notice listing.
- Build create/manage placement UI.
- Build student application tracking UI.

Push after completion:

```bash
git add .
git commit -m "feat: add placement module"
git push
```

## Milestone 15 - Announcements And Notifications

- Build targeted announcements UI.
- Build notification center with read/unread states.

Push after completion:

```bash
git add .
git commit -m "feat: add announcements and notifications"
git push
```

## Milestone 16 - Admin User Management

- Build users table, role assignment controls, status controls, and admin-only access.

Push after completion:

```bash
git add .
git commit -m "feat: add admin user management"
git push
```

## Milestone 17 - Analytics And Search

- Add charts for attendance, assignments, placements, events, and departments.
- Add role-aware global search results.

Push after completion:

```bash
git add .
git commit -m "feat: add analytics and search"
git push
```

## Milestone 18 - API And Database Documentation

- Add API reference markdown.
- Add database schema reference in project docs.
- Add architecture and ER diagram source text.

Push after completion:

```bash
git add .
git commit -m "docs: add api and database references"
git push
```

## Milestone 19 - README And Submission Polish

- Update README with setup, features, tech stack, test credentials, known limitations, deployment placeholders, and demo flow.

Push after completion:

```bash
git add .
git commit -m "docs: polish submission readme"
git push
```

## Milestone 20 - Final Build And QA

- Install dependencies.
- Run production build.
- Run local preview or dev server.
- Check responsive UI.
- Prepare final push and deployment instructions.

Push after completion:

```bash
git add .
git commit -m "chore: final qa updates"
git push
```
