# Final QA

Milestone 20 checklist:

- Dependencies installed with `npm install`.
- Production build verified with `npm run build`.
- App uses role-aware navigation for student, faculty, coordinator, and admin.
- Core MVP screens are available for dashboards, attendance, assignments, events, placements, announcements, users, analytics, and search.
- Demo credentials are documented in `docs/demo-credentials.md` and `README.md`.
- API, architecture, and ER documentation are available in `docs/`.

Local run:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

Known final MVP limitation: data and authentication are demo-only frontend state. Backend persistence is the next major production step.
