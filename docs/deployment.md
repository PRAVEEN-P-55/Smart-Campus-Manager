# Deployment Guide

Smart Campus Manager supports a split deployment: the **frontend** on Vercel and the **backend** on Render.

---

## Frontend — Vercel

1. Push your repository to GitHub (`PRAVEEN-P-55/Smart-Campus-Manager`).

2. Go to [vercel.com](https://vercel.com) and create a new project from GitHub.

3. Set the **Root Directory** to `frontend`.

4. Vercel will detect Vite automatically. The build command is:
   ```
   npm run build
   ```
   The output directory is `dist`.

5. Add the following **Environment Variable** in the Vercel project settings:
   ```
   VITE_API_URL = https://your-backend.onrender.com
   ```
   Replace the value with the URL of your Render backend after step 9.

6. Click **Deploy**. Vercel will build and publish your frontend.

---

## Backend — Render

1. Go to [render.com](https://render.com) and create a **New Web Service**.

2. Connect your GitHub repository.

3. Set the **Root Directory** to `backend`.

4. Set the **Build Command** to:
   ```
   npm install && npm run build && npm run prisma:deploy && npm run seed
   ```

5. Set the **Start Command** to:
   ```
   npm run start
   ```
   This runs `node dist/server.js`.

6. Set the **Environment** to `Node`.

7. Add the following **Environment Variables**:

   | Key | Value |
   |---|---|
   | `NODE_ENV` | `production` |
   | `PORT` | `4000` |
   | `APP_URL` | `https://your-frontend.vercel.app` |
   | `DATABASE_URL` | Your PostgreSQL connection string (see note) |
   | `JWT_SECRET` | A long random string (use a password generator) |
   | `JWT_EXPIRES_IN` | `7d` |

8. **Database setup** — for production, use a managed PostgreSQL database.
   - On Render: add a **PostgreSQL** service and copy its internal or external database URL.
   - Update the `prisma/schema.prisma` datasource provider from `sqlite` to `postgresql` before deploying:
     ```prisma
     datasource db {
       provider = "postgresql"
       url      = env("DATABASE_URL")
     }
     ```
   - For a quick demo, you can use [Supabase](https://supabase.com) or [Neon](https://neon.tech) free tier PostgreSQL.

9. Click **Create Web Service**. Render will build, migrate, seed, and start your backend.

10. Copy the Render URL and paste it as `VITE_API_URL` in your Vercel project environment variables. Redeploy the frontend.

---

## Verify Deployment

After both services are live:

- Open your Vercel URL — the login screen should appear.
- The API status badge in the header should show **connected** (not offline).
- Log in as admin with `admin@smartcampusmanager.test` / `demo1234`.
- The admin dashboard should show live data from the seeded database.

---

## Local Development (Recap)

```bash
# Backend
cd backend && cp .env.example .env
npm install && npm run prisma:migrate && npm run seed && npm run dev

# Frontend (separate terminal)
cd frontend && cp .env.example .env
npm install && npm run dev
```

---

## Switching to SQLite for Local Dev

The default `DATABASE_URL` in `backend/.env.example` uses SQLite (`file:../../database/dev.db`).
This works out of the box locally without any database setup. Switch to PostgreSQL only for production.
