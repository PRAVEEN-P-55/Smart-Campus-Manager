# Smart Campus Management Platform - Product Requirements Document

## 1. Product Overview

Product name: Smart Campus Manager

Problem statement: PS-1 - Smart Campus Management Platform

Domain: EdTech, SaaS, Productivity

Smart Campus Manager is a centralized campus management platform for students, faculty, coordinators, and administrators. It replaces scattered communication channels such as WhatsApp groups, spreadsheets, notice boards, and disconnected portals with one organized web application for announcements, attendance, assignments, events, placements, notifications, and admin operations.

## 2. Problem

Many colleges manage daily academic and administrative work through disconnected tools. This creates missed announcements, manual attendance errors, unclear assignment tracking, poor event coordination, scattered placement updates, and limited visibility for administrators.

Students often do not know what requires their attention. Faculty spend time repeating updates across multiple channels. Coordinators struggle to manage registrations and participation. Admins lack a clear view of campus activity.

## 3. Goals

- Build a production-ready full-stack campus platform.
- Provide separate role-based dashboards for students, faculty, coordinators, and admins.
- Centralize attendance, assignments, announcements, events, placements, and notifications.
- Make the product easy to use on desktop and mobile.
- Keep the UI clean, human-designed, and light-theme focused.
- Deploy the application publicly with test credentials.
- Provide clear documentation, API details, schema, and demo flow.

## 4. Non-Goals

- Do not build every bonus feature before the core product works.
- Do not support multiple colleges in the MVP.
- Do not build real payment flows unless later required.
- Do not build face recognition, plagiarism detection, or live chat in MVP.
- Do not make an AI-generated looking interface or template-style product.

## 5. Target Users

## Student

Students use the platform to view attendance, submit assignments, register for events, check placement notices, receive notifications, and manage their profile.

Main needs:

- Know what is due today.
- Track attendance percentage.
- Submit assignments on time.
- Register for campus events.
- View placement opportunities.
- Receive important updates in one place.

## Faculty

Faculty use the platform to create assignments, mark attendance, publish notices, review submissions, and track student activity.

Main needs:

- Create and manage assignments quickly.
- Mark attendance accurately.
- Review student submissions.
- Share updates with students.
- View course-level performance.

## Coordinator

Coordinators manage campus events, club registrations, student approvals, and announcements.

Main needs:

- Create and manage events.
- Track registrations and capacity.
- Approve or reject participation requests.
- Communicate updates clearly.

## Admin

Admins manage users, roles, departments, courses, permissions, analytics, reports, and activity logs.

Main needs:

- Control platform access.
- Assign user roles.
- Monitor campus-wide activity.
- View analytics and reports.
- Audit sensitive actions.

## 6. User Roles And Permissions

| Role | Main Permissions | Restricted Actions |
|---|---|---|
| Student | View dashboard, edit profile, submit assignments, view attendance, register events, view placements, receive notifications | Cannot delete users, create notices, manage attendance |
| Faculty | Create assignments, upload material, mark attendance, publish notices, review submissions | Cannot delete college data or manage admins |
| Coordinator | Manage events, club registrations, student approvals, announcements | Cannot manage platform settings unless permitted |
| Admin | Full access to users, roles, analytics, settings, permissions, reports, events, attendance, placements | None in MVP |

## 7. MVP Scope

The MVP should focus on a complete demo-ready workflow rather than every listed feature.

Required MVP modules:

1. Authentication and role-based access
2. Student dashboard
3. Faculty dashboard
4. Admin dashboard
5. Attendance module
6. Assignment module
7. Event management
8. Announcements
9. Placement notices
10. Notifications
11. Basic analytics
12. Admin user management

## 8. Feature Requirements

## Authentication

Requirements:

- Users can sign up with email/password.
- Users can log in with email/password.
- Google OAuth should be supported if time allows.
- Email verification should be included or clearly represented.
- Forgot password should use OTP or reset link.
- Authenticated sessions should use secure cookies or JWT.
- Logout should invalidate the session.
- Protected pages should redirect unauthenticated users.

Acceptance criteria:

- A logged-out user cannot access dashboards.
- A student cannot access admin pages.
- A faculty user cannot manage admins.
- Logout prevents reuse of protected pages without logging in again.

## Landing Page

Requirements:

- Light theme primary design.
- Hero section with clear product value.
- Feature highlights.
- Statistics section.
- Testimonials section.
- FAQ.
- Footer.
- Responsive navigation.
- SEO-friendly page structure.

UI direction:

- Professional college SaaS feel.
- Clean whitespace and readable sections.
- Avoid generic AI-looking gradients and decorative clutter.
- Use restrained color and practical layout.

Acceptance criteria:

- Page looks polished on desktop and mobile.
- Primary call-to-action leads to login or demo access.
- Sections are readable and not overcrowded.

## Student Dashboard

Requirements:

- Show attendance summary.
- Show upcoming assignments.
- Show registered/upcoming events.
- Show placement updates.
- Show notifications.
- Show quick actions.
- Show recent activity.

Acceptance criteria:

- Student can understand today’s priorities within 10 seconds.
- Student can reach assignment submission and event registration from dashboard.

## Faculty Dashboard

Requirements:

- Show assigned courses/classes.
- Show recent assignment submissions.
- Show attendance actions.
- Show student count.
- Show basic performance analytics.

Acceptance criteria:

- Faculty can create an assignment.
- Faculty can mark attendance.
- Faculty can review a submission.

## Admin Dashboard

Requirements:

- Show total students.
- Show faculty count.
- Show departments.
- Show events.
- Show attendance percentage.
- Show assignment statistics.
- Show placement statistics.
- Show system logs.

Acceptance criteria:

- Admin can see campus-wide activity.
- Admin can manage users and roles.
- Admin can inspect recent sensitive actions.

## Attendance Module

Faculty requirements:

- Create attendance session.
- Select course and date.
- Mark students as present, absent, late, or excused.
- Close attendance session.

Student requirements:

- View overall attendance percentage.
- View subject-wise attendance.
- View attendance history.
- View monthly report.

Acceptance criteria:

- Attendance records are linked to course, session, faculty, and student.
- Student attendance percentage updates after faculty marks attendance.

## Assignment Module

Faculty requirements:

- Create assignment.
- Add title, description, deadline, attachment, rubric, and max marks.
- View submissions.
- Add marks and feedback.

Student requirements:

- View assigned work.
- Submit PDF, ZIP, or GitHub link.
- View submission history.
- See late submission status.
- View marks and feedback.

Acceptance criteria:

- A student can submit once per assignment, with status tracked.
- Faculty can review and update marks.
- Late submissions are clearly marked.

## Event Management

Coordinator/Admin requirements:

- Create event.
- Add banner, description, venue, deadline, seats, speakers, and status.
- View registrations.
- Cancel or complete event.

Student requirements:

- Browse events.
- Register for event.
- Cancel registration.
- View ticket.
- Download or view QR pass if implemented.

Acceptance criteria:

- Event seats reduce after registration.
- Duplicate registration is prevented.
- Registration closes after deadline.

## Placement Module

Admin/Coordinator requirements:

- Create placement notice.
- Add company, role, eligibility, CTC, deadline, description, and status.
- View student applications.

Student requirements:

- View placement notices.
- Apply to placement.
- Upload/select resume.
- Track application status.

Acceptance criteria:

- Student cannot apply twice to the same placement.
- Closed placement notices do not accept new applications.

## Announcements

Requirements:

- Admin/faculty/coordinator can publish announcements depending on role.
- Announcements can target all users, students, faculty, or a department.
- Announcements can have priority and expiry.

Acceptance criteria:

- Students see relevant announcements.
- Expired announcements are hidden or marked inactive.

## Notifications

Requirements:

- Create notifications for assignment due, attendance marked, event reminder, placement open, and system alerts.
- Users can mark notifications as read.

Acceptance criteria:

- Relevant notifications appear on dashboard.
- Read/unread state is visible.

## Global Search

Requirements:

- Search students, faculty, events, assignments, and placements.
- Results should be filtered by user role.

Acceptance criteria:

- Student cannot see restricted admin-only results.
- Search returns useful results quickly.

## Analytics

Requirements:

- Monthly attendance chart.
- Department performance chart.
- Assignment completion chart.
- Placement statistics chart.
- Event participation chart.

Acceptance criteria:

- Admin dashboard includes at least three meaningful charts in MVP.
- Charts use real database data or clear seeded demo data.

## 9. UI/UX Requirements

Primary theme: Light

Design principles:

- Human-made and practical.
- Clean, calm, and organized.
- Dashboard-first utility, not a marketing template.
- Responsive from mobile to desktop.
- Clear information hierarchy.
- Minimal decoration.
- Consistent spacing, borders, and typography.

Required UI states:

- Loading skeletons.
- Empty states.
- Error states.
- Success states.
- Toast notifications.
- Form validation.
- Accessible focus states.

Accessibility:

- Keyboard navigation.
- Semantic HTML.
- Good contrast.
- Labels for form fields.
- Clear button text.

## 10. Security Requirements

- Password hashing with bcrypt or Argon2.
- Input validation on client and server.
- Server-side validation for protected actions.
- Role-based authorization middleware.
- Rate limiting for auth routes.
- CSRF protection where applicable.
- XSS protection.
- Secure cookies if cookies are used.
- Environment variables for secrets.
- File upload type and size validation.
- Audit logs for sensitive admin actions.

Sensitive logged actions:

- User created.
- User deleted.
- Role changed.
- Attendance updated.
- Assignment reviewed.
- Placement status changed.
- Event cancelled.
- Settings changed.

## 11. Data Requirements

Core entities:

- Users
- Roles
- Departments
- Courses
- Student Profiles
- Faculty Profiles
- Attendance Sessions
- Attendance Records
- Assignments
- Assignment Submissions
- Events
- Event Registrations
- Announcements
- Notifications
- Placements
- Placement Applications
- Activity Logs
- Settings

## 12. Recommended Tech Stack

Frontend:

- Next.js or React
- TypeScript
- Tailwind CSS

Backend:

- Node.js with Express or Next.js API routes

Database:

- PostgreSQL, MongoDB, Supabase, or Firebase

Auth:

- Email/password
- Google OAuth if possible
- JWT or secure sessions

Deployment:

- Vercel for frontend
- Render, Railway, or Vercel serverless for backend
- Free-tier database hosting

Storage:

- Cloudinary, Supabase Storage, Firebase Storage, or S3-compatible storage

## 13. Success Metrics

Product success:

- Student can complete the main workflow without guidance.
- Faculty can create and review academic work.
- Admin can manage users and see analytics.
- Live deployment works without errors.
- Demo can be completed in under 5 minutes.

Judging alignment:

- Functionality: complete end-to-end flows.
- UI/UX: polished light theme and responsive screens.
- Code quality: modular structure and readable naming.
- Auth/security: real role checks and protected routes.
- Database design: normalized and well-related entities.
- Documentation: clear README, schema, API docs, and demo video.

## 14. Demo Flow

Recommended 3-5 minute demo:

1. Open landing page and briefly explain the product.
2. Log in as admin.
3. Show admin dashboard, users, analytics, and activity logs.
4. Admin creates an announcement or event.
5. Log in as faculty.
6. Faculty creates assignment and marks attendance.
7. Faculty reviews one student submission.
8. Log in as student.
9. Student views dashboard updates.
10. Student submits assignment.
11. Student registers for event.
12. Student views placement notice and applies.
13. End with README, live link, and deployment mention.

## 15. Milestones

## Milestone 1 - Foundation

- Project setup
- Database setup
- Auth setup
- Base roles
- Protected routes
- Light theme foundation

## Milestone 2 - Dashboards

- Student dashboard
- Faculty dashboard
- Admin dashboard
- Basic seeded data

## Milestone 3 - Academic Modules

- Attendance sessions
- Attendance records
- Assignment creation
- Assignment submission
- Faculty review

## Milestone 4 - Campus Modules

- Events
- Event registrations
- Announcements
- Notifications
- Placements
- Placement applications

## Milestone 5 - Admin And Analytics

- User management
- Role management
- Activity logs
- Charts
- Search

## Milestone 6 - Submission Polish

- Deployment
- Test credentials
- README
- API docs
- ER diagram
- Architecture diagram
- Demo video
- Final QA checklist

## 16. Risks And Mitigation

| Risk | Impact | Mitigation |
|---|---|---|
| Scope becomes too large | High | Prioritize MVP modules only |
| Deployment breaks near deadline | High | Deploy early and test often |
| Role permissions are incomplete | High | Test each role separately |
| UI looks generic | Medium | Use restrained light theme and realistic data |
| Dashboard feels empty | Medium | Seed demo data |
| Assignment/event flows are incomplete | High | Build end-to-end before adding bonus features |
| README is weak | Medium | Prepare README during development, not at the end |

## 17. Submission Checklist

- Public GitHub repository.
- Clean incremental commit history.
- Live deployed application.
- Backend deployed if separate.
- README at root.
- Project name and PS-1 mentioned.
- Tech stack listed.
- Local setup steps included.
- Feature list included.
- Live link included.
- Team names and roles included.
- Known bugs or limitations included.
- Test credentials included.
- Environment variable template included.
- Database schema or ER diagram included.
- Architecture diagram included.
- API documentation included.
- Demo video prepared.
- No broken buttons or empty dead-end pages.
- No console-crashing errors.

## 18. Future Enhancements

Add only after the MVP is complete:

- QR attendance scanner.
- Campus FAQ chatbot.
- Live chat between students and faculty.
- Calendar sync.
- PWA support.
- Offline mode.
- Multi-language support.
- Email reminders.
- Push notifications.
- WebSocket live updates.
- CSV/Excel export.
- Dockerized deployment.
- CI/CD pipeline.
- Swagger/OpenAPI documentation.

