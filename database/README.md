# Database

This folder contains the deploy-ready database assets for Smart Campus Manager.

Planned database stack:

- Prisma ORM
- SQLite for local development
- PostgreSQL-compatible `DATABASE_URL` for production deployment

Runtime Prisma schema:

```text
../backend/prisma/schema.prisma
```

Local SQLite database path:

```text
database/dev.db
```

Use backend commands for migrations and seeding:

```bash
cd backend
npm run prisma:migrate
npm run seed
```
