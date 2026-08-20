# Smart Campus Manager

> **PS-1: Smart Campus Management Platform** — A role-based campus operations platform for students, faculty, coordinators, and administrators.

Smart Campus Manager centralises attendance, assignments, events, placements, announcements, notifications, user management, analytics, and activity logs in one responsive web application. It replaces scattered WhatsApp groups, spreadsheets, and disconnected portals with a single organised platform.

---

## Live Demo

> **Frontend**: _Deploy to Vercel — add link here after deployment_
> **Backend API**: _Deploy to Render — add link here after deployment_

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite 6 |
| Styling | Tailwind CSS 3, Lucide React icons |
| Charts | Recharts |
| Backend | Node.js, Express 5, TypeScript |
| ORM | Prisma 6 |
| Database | SQLite (dev) / PostgreSQL (production) |
| Auth | JWT (jsonwebtoken), bcryptjs |
| Validation | Zod |

---

## Features

- **Four role-based dashboards** — Student, Faculty, Coordinator, Admin
- **Role-aware navigation** — sidebar and mobile tabs hide items restricted to the current role
- **Demo authentication** — instant role switching with seeded credentials; backend JWT auth when API is running
- **Attendance module** — faculty creates sessions and marks students; students view subject-wise history and percentage
- **Assignment module** — faculty creates assignments; students submit GitHub links or files; faculty grades and adds feedback
- **Event management** — coordinator creates events with capacity; students register, receive ticket codes, and cancel
- **Placement module** — coordinator publishes job notices; students apply and track application status
- **Announcements** — role-targeted notices with priority levels (low / normal / high / urgent)
- **Notifications** — per-user inbox with read/unread state
- **Admin user management** — role assignment and activation controls for all accounts
- **Analytics dashboard** — area chart, pie chart, and bar charts for attendance, assignments, events, and placements
- **Global search** — role-aware search across assignments, events, placements, announcements, and users
- **Activity / audit log** — records sensitive admin and faculty actions
- **Settings** — profile update and security forms per role
- **Graceful offline fallback** — if the backend API is unavailable, the frontend uses seeded demo data so judging can continue

---

## Demo Credentials

All passwords: `demo1234`

| Role | Email |
|---|---|
| Admin | admin@smartcampusmanager.test |
| Faculty | faculty@smartcampusmanager.test |
| Coordinator | coordinator@smartcampusmanager.test |
| Student | student@smartcampusmanager.test |

The login screen shows credentials automatically when a role is selected.

---

## Local Setup

### Prerequisites

- Node.js 20 or later
- npm 9 or later

### Frontend (standalone demo mode)

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Open: `http://localhost:5173`

The frontend works with seeded data even without the backend running.

### Backend + Database

```bash
cd backend
npm install
cp .env.example .env
npm run prisma:migrate
npm run seed
npm run dev
```

The API runs on: `http://localhost:4000`

Health check: `http://localhost:4000/health`

### Production Builds

```bash
# Frontend
cd frontend && npm run build

# Backend
cd backend && npm run build

# Or use root helper
npm run build
```

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `PORT` | API server port | `4000` |
| `APP_URL` | Frontend origin for CORS | `http://localhost:5173` |
| `DATABASE_URL` | Prisma database connection | `file:../../database/dev.db` |
| `JWT_SECRET` | Token signing secret | `replace-with-long-random-secret` |
| `JWT_EXPIRES_IN` | Token expiry | `7d` |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:4000` |

---

## Project Structure

```
Smart-Campus-Manager/
├── docs/
│   ├── api-reference.md       API route reference
│   ├── architecture.md        System architecture and ER diagram
│   ├── deployment.md          Vercel + Render deployment steps
│   └── demo-credentials.md    Test accounts
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma      Full database schema (18 models)
│   │   └── migrations/        Applied migration history
│   └── src/
│       ├── server.ts          Express API (all routes, auth, middleware)
│       └── seed.ts            Database seeder
├── database/
│   └── dev.db                 SQLite database (seeded)
├── frontend/
│   ├── src/
│   │   ├── main.tsx           Full React application (~2100 lines)
│   │   ├── styles.css         Design system (Tailwind components + tokens)
│   │   ├── data/
│   │   │   └── campusData.ts  Typed seeded demo data
│   │   └── lib/
│   │       └── api.ts         Backend API client
│   └── vite.config.mjs
├── ps1_prd.md                 Product Requirements Document
├── ps1_database_schema.md     Database schema reference
├── ps1_system_architecture_and_apis.md  Architecture and API docs
├── MILESTONES.md              20-milestone implementation plan
└── README.md
```

---

## API Reference

All routes require `Authorization: Bearer <token>` except `/health` and `/api/auth/login`.

| Method | Route | Role | Description |
|---|---|---|---|
| GET | `/health` | Public | Health check |
| POST | `/api/auth/login` | Public | JWT login |
| GET | `/api/auth/me` | All | Current user |
| GET | `/api/users` | Admin | All users |
| PATCH | `/api/users/:id/role` | Admin | Change user role |
| PATCH | `/api/users/:id/status` | Admin | Change user status |
| GET | `/api/departments` | All | Departments list |
| GET | `/api/courses` | All | Courses list |
| GET | `/api/attendance/sessions` | Faculty/Admin | Attendance sessions |
| POST | `/api/attendance/sessions/:id/records` | Faculty/Admin | Mark attendance |
| GET | `/api/attendance/me` | Student | My attendance |
| GET | `/api/assignments` | All | Assignments |
| POST | `/api/assignments` | Faculty/Admin | Create assignment |
| POST | `/api/assignments/:id/submissions` | Student | Submit assignment |
| PATCH | `/api/submissions/:id/review` | Faculty/Admin | Grade submission |
| GET | `/api/events` | All | Events |
| POST | `/api/events` | Coordinator/Admin | Create event |
| POST | `/api/events/:id/register` | Student | Register for event |
| POST | `/api/events/:id/cancel` | Student | Cancel registration |
| GET | `/api/placements` | All | Placement notices |
| POST | `/api/placements` | Coordinator/Admin | Create placement |
| POST | `/api/placements/:id/apply` | Student | Apply to placement |
| GET | `/api/announcements` | All | Role-filtered announcements |
| POST | `/api/announcements` | Faculty/Coordinator/Admin | Publish announcement |
| GET | `/api/notifications` | All | My notifications |
| PATCH | `/api/notifications/:id/read` | All | Mark as read |
| PATCH | `/api/notifications/read-all` | All | Mark all read |
| GET | `/api/analytics/admin` | Admin | Campus analytics |
| GET | `/api/search` | All | Role-aware search |
| GET | `/api/activity-logs` | Admin | Audit log |

Full docs: `docs/api-reference.md`

---

## Demo Flow

Recommended 3–5 minute walkthrough:

1. **Landing** — Open the app, select **Admin** and enter the dashboard.
2. **Admin** — Show admin dashboard metrics, user management table, audit log, and analytics charts.
3. **Coordinator** — Switch role, show event coordination, club approvals, placement notices.
4. **Faculty** — Switch role, show class attendance marking, assignment creation form, and submission review.
5. **Student** — Switch role, show dashboard priorities, attendance history, assignment submission, event registration, placement application, and notification inbox.
6. **Search** — Type a keyword in the search bar to show role-filtered results.

---

## Known Limitations

- File upload (PDF/ZIP) shows a URL input only — no file storage integration yet (Cloudinary/S3 planned).
- Google OAuth is planned but not implemented.
- Email verification and password reset are planned.
- Forms in demo mode do not persist to the database — they demonstrate the workflow UI. When the backend is running, the REST API endpoints do persist changes.
- The frontend falls back to seeded demo data when the backend is offline.

---

## Deployment

See `docs/deployment.md` for full Vercel + Render setup steps.

Quick reference:
- **Frontend** → Vercel: set `VITE_API_URL` to your Render backend URL
- **Backend** → Render: set `DATABASE_URL` (PostgreSQL), `JWT_SECRET`, `APP_URL` to Vercel frontend URL

---

## Repository

```
https://github.com/PRAVEEN-P-55/Smart-Campus-Manager
```

---

## License

MIT
