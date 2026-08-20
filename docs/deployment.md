# Deployment

The project is split into deployable workspaces:

```text
frontend/   React + Vite app
backend/    Express + Prisma API
database/   Local SQLite database target and database docs
```

## Local Full-Stack Run

Install dependencies:

```bash
cd backend
npm install
cd ../frontend
npm install
```

Prepare database:

```bash
cd backend
copy .env.example .env
npm run prisma:migrate
npm run seed
```

Run backend:

```bash
cd backend
npm run dev
```

Run frontend in another terminal:

```bash
cd frontend
npm run dev
```

Open:

```text
http://localhost:5173
```

API health:

```text
http://localhost:4000/health
```

## Production Deployment

Frontend:

- Deploy `frontend/` to Vercel, Netlify, or any static host.
- Build command: `npm run build`
- Output directory: `dist`
- Set `VITE_API_URL` to the deployed backend URL.

Backend:

- Deploy `backend/` to Render, Railway, Fly.io, or a Node host.
- Build command: `npm install && npm run prisma:generate && npm run build`
- Start command: `npm run prisma:deploy && npm run start`
- Set `DATABASE_URL`, `JWT_SECRET`, `APP_URL`, and `PORT`.

Database:

- Local development uses SQLite at `database/dev.db`.
- Production should use a managed PostgreSQL database URL.
- Before production PostgreSQL deployment, update `backend/prisma/schema.prisma` datasource provider from `sqlite` to `postgresql`, then create a production migration.

## Required Environment Variables

Backend:

```text
NODE_ENV=production
PORT=4000
APP_URL=https://your-frontend-domain
DATABASE_URL=your-production-database-url
JWT_SECRET=long-random-secret
JWT_EXPIRES_IN=7d
```

Frontend:

```text
VITE_API_URL=https://your-backend-domain
```
