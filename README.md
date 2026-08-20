# Smart Campus Manager

Smart Campus Manager is a role-based campus management platform for PS-1: Smart Campus Management Platform. It centralizes dashboards, attendance, assignments, events, placements, announcements, notifications, admin user management, analytics, and activity logs in one responsive web app.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Recharts
- Seeded frontend data for the current MVP

## Features

- Demo authentication with four roles.
- Student, faculty, coordinator, and admin dashboards.
- Role-aware sidebar and mobile navigation.
- Attendance sessions, history, and marking UI.
- Assignment listing, creation, submission, and review UI.
- Event creation, registration, ticket, and cancellation UI.
- Placement notices and application tracking.
- Targeted announcements and notifications.
- Admin-only user management.
- Analytics charts and role-aware global search.
- API, architecture, and ER documentation.

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@smartcampusmanager.test | demo1234 |
| Faculty | faculty@smartcampusmanager.test | demo1234 |
| Coordinator | coordinator@smartcampusmanager.test | demo1234 |
| Student | student@smartcampusmanager.test | demo1234 |

## Local Setup

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

Production build:

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env` when backend services are added.

```text
DATABASE_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
SESSION_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
EMAIL_SERVER_HOST=
EMAIL_SERVER_PORT=
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_FROM=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
APP_URL=http://localhost:5173
```

## Documentation

- API reference: `docs/api-reference.md`
- Architecture and ER diagram source: `docs/architecture.md`
- Demo credentials: `docs/demo-credentials.md`
- Product requirements: `ps1_prd.md`
- Database schema: `ps1_database_schema.md`
- System architecture and API plan: `ps1_system_architecture_and_apis.md`

## Demo Flow

1. Open the app and log in as admin.
2. Show admin dashboard, analytics, users, and activity logs.
3. Switch to coordinator and show events, placements, announcements, and club approvals.
4. Switch to faculty and show class dashboard, attendance, assignments, and submissions.
5. Switch to student and show priorities, attendance, assignment submission, events, placements, and notifications.
6. Use global search to show role-aware results.

## Known Limitations

- Authentication is simulated with React state.
- Data is seeded in the frontend instead of persisted in a database.
- Forms demonstrate workflow UI but do not save records yet.
- File upload, Google OAuth, email verification, and password reset are planned backend integrations.
- Deployment link will be added after hosting.

## Project Structure

```text
.
├── docs/
│   ├── api-reference.md
│   ├── architecture.md
│   └── demo-credentials.md
├── src/
│   ├── data/
│   │   └── campusData.ts
│   ├── main.tsx
│   └── styles.css
├── .env.example
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Repository

```text
https://github.com/PRAVEEN-P-55/Smart-Campus-Manager
```

## License

MIT License recommended for final submission.
