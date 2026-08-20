# Smart Campus Management Platform - System Architecture And APIs

Product name: Smart Campus Manager

Problem statement: PS-1 - Smart Campus Management Platform

## 1. Architecture Overview

Smart Campus Manager is a full-stack web application for managing campus workflows across students, faculty, coordinators, and administrators. The system uses role-based access control to show each user the right dashboard, permissions, and actions.

Recommended architecture:

- Frontend: Next.js or React with TypeScript and Tailwind CSS
- Backend: Node.js with Express or Next.js API routes
- Database: PostgreSQL, MongoDB, Supabase, or Firebase
- Authentication: Email/password, Google OAuth, JWT or secure sessions
- Storage: Cloudinary, Supabase Storage, Firebase Storage, or S3-compatible storage
- Deployment: Vercel for frontend, Render/Railway/Vercel serverless for backend

## 2. High-Level System Diagram

```text
User Browser
    |
    v
Frontend Web App
    |
    v
API Layer / Backend
    |
    +--> Authentication Service
    +--> Role And Permission Middleware
    +--> Campus Modules
    |       +--> Attendance
    |       +--> Assignments
    |       +--> Events
    |       +--> Announcements
    |       +--> Placements
    |       +--> Notifications
    |       +--> Analytics
    |
    +--> File Upload Service
    |
    v
Database
    |
    v
Activity Logs / Audit Trail
```

## 3. Main Application Layers

## Frontend Layer

Responsibilities:

- Render landing page and role dashboards.
- Handle forms, tables, filters, search, charts, and responsive UI.
- Display loading, empty, success, and error states.
- Store only safe client-side state.
- Call backend APIs for protected actions.

Main frontend areas:

- Landing page
- Login and signup
- Student dashboard
- Faculty dashboard
- Coordinator dashboard
- Admin dashboard
- Attendance screens
- Assignment screens
- Event screens
- Placement screens
- Notifications
- Settings

## Backend/API Layer

Responsibilities:

- Authenticate users.
- Authorize role-based actions.
- Validate all request data.
- Manage business rules.
- Read and write database records.
- Generate notifications.
- Record activity logs for sensitive actions.
- Return clean API responses.

## Database Layer

Responsibilities:

- Store users, roles, departments, courses, attendance, assignments, events, placements, notifications, and logs.
- Preserve relationships between users and campus activity.
- Support dashboard analytics.

## Storage Layer

Responsibilities:

- Store profile photos.
- Store resumes.
- Store assignment attachments.
- Store assignment submissions.
- Store event banners.

Only file URLs and metadata should be stored in the database.

## 4. Role-Based Access Model

| Role | Access Level |
|---|---|
| Student | Own profile, own attendance, own submissions, events, placements, notifications |
| Faculty | Assigned courses, attendance sessions, assignments, submissions, notices |
| Coordinator | Events, club registrations, announcements, selected approvals |
| Admin | Full platform access, users, roles, analytics, settings, logs |

Every protected API should check:

1. Is the user authenticated?
2. Is the email verified where required?
3. Does the user role allow this action?
4. Is the user allowed to access this specific record?

## 5. Core Backend Modules

## Auth Module

Handles signup, login, logout, email verification, forgot password, and session validation.

## User Module

Handles user profiles, role assignment, departments, student profiles, and faculty profiles.

## Attendance Module

Handles attendance sessions and attendance records.

## Assignment Module

Handles assignment creation, student submissions, review, marks, and feedback.

## Event Module

Handles event creation, registrations, tickets, capacity, and event status.

## Placement Module

Handles placement notices and student applications.

## Announcement Module

Handles targeted notices for all users, departments, students, or faculty.

## Notification Module

Handles in-app notifications and read/unread status.

## Analytics Module

Aggregates attendance, assignments, events, placements, and department performance.

## Activity Log Module

Tracks sensitive actions for admin review and judging credibility.

## 6. API Response Format

Recommended success response:

```json
{
  "success": true,
  "message": "Request completed successfully.",
  "data": {}
}
```

Recommended error response:

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    {
      "field": "email",
      "message": "Email is required."
    }
  ]
}
```

## 7. API Endpoint Plan

Base path:

```text
/api
```

## Auth APIs

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | /auth/register | Public | Create account |
| POST | /auth/login | Public | Login with email/password |
| GET | /auth/google | Public | Start Google OAuth |
| GET | /auth/google/callback | Public | Google OAuth callback |
| POST | /auth/logout | Authenticated | Logout current session |
| GET | /auth/me | Authenticated | Get current user |
| POST | /auth/verify-email | Public | Verify email token or OTP |
| POST | /auth/resend-verification | Public | Resend verification |
| POST | /auth/forgot-password | Public | Request reset link or OTP |
| POST | /auth/reset-password | Public | Reset password |

## User APIs

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | /users | Admin | List users |
| GET | /users/:id | Admin / Owner | Get user details |
| PATCH | /users/:id | Admin / Owner | Update user details |
| DELETE | /users/:id | Admin | Delete or deactivate user |
| PATCH | /users/:id/role | Admin | Assign role |
| GET | /profile | Authenticated | Get own profile |
| PATCH | /profile | Authenticated | Update own profile |

## Department And Course APIs

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | /departments | Authenticated | List departments |
| POST | /departments | Admin | Create department |
| PATCH | /departments/:id | Admin | Update department |
| DELETE | /departments/:id | Admin | Delete department |
| GET | /courses | Authenticated | List courses |
| POST | /courses | Admin | Create course |
| PATCH | /courses/:id | Admin / Faculty | Update course |
| DELETE | /courses/:id | Admin | Delete course |

## Attendance APIs

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | /attendance/sessions | Faculty / Admin | Create attendance session |
| GET | /attendance/sessions | Faculty / Admin | List attendance sessions |
| GET | /attendance/sessions/:id | Faculty / Admin | Get session details |
| PATCH | /attendance/sessions/:id | Faculty / Admin | Update session |
| POST | /attendance/sessions/:id/records | Faculty / Admin | Mark attendance |
| GET | /attendance/me | Student | View own attendance |
| GET | /attendance/student/:studentId | Faculty / Admin | View student attendance |
| GET | /attendance/reports/monthly | Admin / Faculty | Monthly attendance report |

## Assignment APIs

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | /assignments | Faculty / Admin | Create assignment |
| GET | /assignments | Authenticated | List visible assignments |
| GET | /assignments/:id | Authenticated | Get assignment details |
| PATCH | /assignments/:id | Faculty / Admin | Update assignment |
| DELETE | /assignments/:id | Faculty / Admin | Delete assignment |
| POST | /assignments/:id/submissions | Student | Submit assignment |
| GET | /assignments/:id/submissions | Faculty / Admin | View submissions |
| PATCH | /submissions/:id/review | Faculty / Admin | Add marks and feedback |
| GET | /submissions/me | Student | View own submissions |

## Event APIs

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | /events | Coordinator / Admin | Create event |
| GET | /events | Authenticated | List events |
| GET | /events/:id | Authenticated | Get event details |
| PATCH | /events/:id | Coordinator / Admin | Update event |
| DELETE | /events/:id | Coordinator / Admin | Cancel/delete event |
| POST | /events/:id/register | Student | Register for event |
| POST | /events/:id/cancel | Student | Cancel registration |
| GET | /events/:id/registrations | Coordinator / Admin | View registrations |
| GET | /events/tickets/me | Student | View own tickets |

## Placement APIs

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | /placements | Coordinator / Admin | Create placement notice |
| GET | /placements | Authenticated | List placement notices |
| GET | /placements/:id | Authenticated | Get placement details |
| PATCH | /placements/:id | Coordinator / Admin | Update placement |
| DELETE | /placements/:id | Coordinator / Admin | Delete placement |
| POST | /placements/:id/apply | Student | Apply for placement |
| GET | /placements/:id/applications | Coordinator / Admin | View applications |
| GET | /placement-applications/me | Student | View own applications |
| PATCH | /placement-applications/:id/status | Coordinator / Admin | Update application status |

## Announcement APIs

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | /announcements | Faculty / Coordinator / Admin | Create announcement |
| GET | /announcements | Authenticated | List visible announcements |
| GET | /announcements/:id | Authenticated | Get announcement |
| PATCH | /announcements/:id | Creator / Admin | Update announcement |
| DELETE | /announcements/:id | Creator / Admin | Archive announcement |

## Notification APIs

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | /notifications | Authenticated | List own notifications |
| PATCH | /notifications/:id/read | Authenticated | Mark one notification read |
| PATCH | /notifications/read-all | Authenticated | Mark all read |
| DELETE | /notifications/:id | Authenticated | Delete notification |

## Search APIs

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | /search?q= | Authenticated | Global role-aware search |

Searchable records:

- Students
- Faculty
- Events
- Assignments
- Placements
- Announcements

## Analytics APIs

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | /analytics/admin | Admin | Admin dashboard analytics |
| GET | /analytics/faculty | Faculty | Faculty dashboard analytics |
| GET | /analytics/student | Student | Student dashboard analytics |
| GET | /analytics/events | Admin / Coordinator | Event participation analytics |
| GET | /analytics/placements | Admin / Coordinator | Placement analytics |

## File APIs

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | /files/upload | Authenticated | Upload file |
| DELETE | /files/:id | Owner / Admin | Delete file metadata |

Allowed file use cases:

- Profile picture
- Resume
- Assignment attachment
- Assignment submission
- Event banner

## Activity Log APIs

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | /activity-logs | Admin | List system activity |
| GET | /activity-logs/:id | Admin | View log details |

## Settings APIs

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | /settings | Authenticated | Get own settings |
| PATCH | /settings | Authenticated | Update own settings |
| PATCH | /settings/password | Authenticated | Change password |
| DELETE | /settings/account | Authenticated | Request account deletion |

## 8. Business Rules

Authentication:

- Users must be logged in before accessing protected dashboards.
- Email verification is required before sensitive dashboard access.
- Passwords must be hashed.
- Reset tokens and verification tokens must be stored as hashes.

Attendance:

- Only faculty or admin can create attendance sessions.
- Students can only view their own attendance.
- One student can have only one record per attendance session.
- Closed sessions should not be editable except by admin.

Assignments:

- Only faculty or admin can create assignments.
- Students can only submit to visible assignments.
- One student should have one active submission per assignment.
- Late submissions should be marked automatically based on deadline.

Events:

- Only coordinators or admins can create events.
- Students cannot register after the deadline.
- Students cannot register twice for the same event.
- Registration should fail if seats are full.

Placements:

- Only coordinators or admins can create placement notices.
- Students cannot apply after the deadline.
- Students cannot apply twice for the same placement.

Announcements:

- Announcements should only appear to the intended audience.
- Expired announcements should be hidden or marked archived.

Activity logs:

- Admin actions must be logged.
- Sensitive role and status changes must be logged.

## 9. Validation Rules

Common validation:

- Required fields must not be empty.
- Email must be valid and unique.
- IDs must refer to existing records.
- Dates must be valid.
- Deadlines cannot be in the past when creating new assignments, events, or placements.
- Uploaded files must match allowed type and size.

Suggested file limits:

- Profile picture: JPG, PNG, WEBP up to 2 MB
- Resume: PDF up to 5 MB
- Assignment attachment: PDF, DOCX, ZIP up to 10 MB
- Assignment submission: PDF, ZIP up to 25 MB
- Event banner: JPG, PNG, WEBP up to 5 MB

## 10. Dashboard Data Contracts

## Student Dashboard

Should return:

- Profile summary
- Attendance percentage
- Upcoming assignments
- Upcoming events
- Placement updates
- Recent notifications
- Recent activity

## Faculty Dashboard

Should return:

- Assigned courses
- Total students
- Recent submissions
- Attendance sessions
- Assignment completion summary
- Recent notifications

## Admin Dashboard

Should return:

- Total students
- Total faculty
- Department count
- Active events
- Average attendance
- Assignment completion rate
- Placement application count
- Recent activity logs
- Chart data

## 11. Security Checklist

- Hash passwords with bcrypt or Argon2.
- Use secure session handling.
- Protect all dashboard and module APIs.
- Validate request bodies on the server.
- Prevent users from accessing records outside their role.
- Rate limit login and password reset endpoints.
- Validate file type and file size.
- Store secrets in environment variables.
- Log sensitive admin actions.
- Avoid exposing internal errors in API responses.

## 12. Deployment Architecture

Simple deployment option:

```text
Vercel
  - Frontend
  - Next.js API routes if using full-stack Next.js

Database Provider
  - Supabase / MongoDB Atlas / Firebase

Storage Provider
  - Cloudinary / Supabase Storage / Firebase Storage
```

Split deployment option:

```text
Vercel
  - Frontend

Render / Railway
  - Backend API

Database Provider
  - PostgreSQL / MongoDB

Storage Provider
  - Cloudinary / S3-compatible storage
```

## 13. Environment Variables

Example environment variable names:

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
APP_URL=
```

## 14. API Documentation Plan

For submission, prepare one of these:

- Swagger/OpenAPI page
- Postman collection
- Markdown API reference

Minimum API docs should include:

- Endpoint
- Method
- Required role
- Request body
- Success response
- Error response
- Notes about validation

## 15. MVP API Priority

Build/document these first:

1. Auth APIs
2. Current user/profile APIs
3. Role-protected dashboard APIs
4. Assignment APIs
5. Attendance APIs
6. Event APIs
7. Announcement APIs
8. Notification APIs
9. Placement APIs
10. Admin analytics APIs

