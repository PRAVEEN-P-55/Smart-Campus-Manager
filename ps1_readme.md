# Smart Campus Manager - Smart Campus Management Platform

Smart Campus Manager is a modern campus management platform built for DevFusion 4.O - The Developers Hackathon, based on PS-1: Smart Campus Management Platform.

It helps students, faculty, coordinators, and administrators manage academic and campus workflows from one centralized web application.

## Problem Statement

Most colleges manage announcements, attendance, assignments, events, placements, club activities, and faculty-student communication through disconnected systems such as WhatsApp groups, spreadsheets, manual records, and multiple portals.

Smart Campus Manager solves this by providing one role-based platform for:

- Student portal
- Faculty portal
- Event management
- Attendance
- Placement notices
- Club activities
- Assignment submission
- Announcements
- Notifications
- Admin controls

## Live Demo

Live application link:

```text
Add deployed link here
```

## GitHub Repository

Repository link:

```text
Add public GitHub repository link here
```

## Tech Stack

Frontend:

- React / Next.js
- TypeScript
- Tailwind CSS

Backend:

- Node.js
- Express / Next.js API routes

Database:

- MongoDB / PostgreSQL / Supabase / Firebase

Authentication:

- Email and password login
- Google OAuth
- JWT or secure sessions

Storage:

- Cloudinary / Supabase Storage / Firebase Storage / S3-compatible storage

Deployment:

- Vercel
- Render / Railway if backend is separate

## User Roles

## Student

Students can:

- View dashboard
- Edit profile
- Register for events
- Submit assignments
- View attendance
- View placement updates
- Receive notifications
- Manage club memberships

## Faculty

Faculty can:

- Create assignments
- Upload study material
- Mark attendance
- Publish notices
- Review submissions

## Coordinator

Coordinators can:

- Manage events
- Manage club registrations
- Approve students
- Create announcements

## Admin

Admins can:

- Manage users
- Delete or deactivate users
- Assign roles
- View analytics
- Manage settings
- Manage permissions
- Manage events
- Manage attendance
- Manage placements
- Generate reports
- View activity logs

## Features

## Authentication And Authorization

- Email/password signup and login
- Google OAuth support
- Email verification
- Forgot password flow
- Protected routes
- Role-based access control
- Secure logout

## Dashboards

Student dashboard:

- Attendance summary
- Assignments
- Upcoming events
- Placement updates
- Notifications
- Quick actions
- Recent activity

Faculty dashboard:

- Assigned classes
- Attendance actions
- Assignments
- Student count
- Recent submissions
- Performance analytics

Admin dashboard:

- Total students
- Faculty count
- Departments
- Events
- Attendance percentage
- Assignment statistics
- Placement statistics
- Charts
- System logs

## Attendance Module

- Faculty can create attendance sessions.
- Faculty can mark students present, absent, late, or excused.
- Students can view attendance percentage.
- Students can view attendance history and subject-wise analytics.

## Assignment Module

- Faculty can create assignments with deadlines, attachments, rubrics, and marks.
- Students can submit PDF, ZIP, or GitHub links.
- Late submissions are tracked.
- Faculty can review submissions and add marks and feedback.

## Event Management

- Coordinators/admins can create events.
- Events include banner, description, venue, seats, speakers, and deadline.
- Students can register for events.
- Students can cancel registration.
- Tickets or QR passes can be shown if implemented.

## Placement Module

- Admins/coordinators can create placement notices.
- Notices include company, role, eligibility, CTC, deadline, and description.
- Students can apply and track application status.

## Announcements And Notifications

- Announcements can target all users, students, faculty, or departments.
- Notifications appear for assignments, attendance, events, placements, and system alerts.
- Users can mark notifications as read.

## Search And Analytics

- Global search for students, faculty, events, assignments, and placements.
- Admin analytics for attendance, departments, assignments, placements, and events.

## UI/UX

The application uses a polished light theme designed for a college SaaS environment.

Design priorities:

- Clean dashboard-first experience
- Responsive mobile-friendly layouts
- Accessible forms and navigation
- Loading skeletons
- Empty states
- Error states
- Toast notifications
- Clear visual hierarchy

## Database Schema

Main entities:

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
- Clubs
- Club Memberships
- Settings
- Activity Logs

Schema documentation:

```text
Add database schema file/link here
```

## API Documentation

API documentation should include:

- Auth APIs
- User/profile APIs
- Attendance APIs
- Assignment APIs
- Event APIs
- Placement APIs
- Announcement APIs
- Notification APIs
- Analytics APIs
- Activity log APIs

API docs:

```text
Add Swagger/OpenAPI/Postman/Markdown API docs link here
```

## Environment Variables

Create a `.env.example` file with:

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

## Local Setup

1. Clone the repository.

```text
git clone <repository-url>
```

2. Install dependencies.

```text
npm install
```

3. Create environment file.

```text
cp .env.example .env
```

4. Add required environment variables.

5. Run database setup or migrations.

```text
Add database setup command here
```

6. Start the development server.

```text
npm run dev
```

7. Open the app.

```text
http://localhost:3000
```

## Test Credentials

Use these demo accounts during evaluation:

| Role | Email | Password |
|---|---|---|
| Admin | admin@smartcampusmanager.test | Add password |
| Faculty | faculty@smartcampusmanager.test | Add password |
| Coordinator | coordinator@smartcampusmanager.test | Add password |
| Student | student@smartcampusmanager.test | Add password |

## Demo Flow

Recommended demo:

1. Open landing page.
2. Log in as admin.
3. Show admin dashboard, users, analytics, and activity logs.
4. Create an announcement or event.
5. Log in as faculty.
6. Create assignment and mark attendance.
7. Review a student submission.
8. Log in as student.
9. View dashboard updates.
10. Submit assignment.
11. Register for event.
12. Apply to placement notice.

## Known Bugs Or Limitations

Add honest limitations here before submission.

Example:

- Google OAuth may be limited to test users.
- Email delivery may use a sandbox provider.
- QR pass may be simulated in MVP.
- Some analytics may use seeded demo data.

## Security

Security measures:

- Password hashing
- Server-side validation
- Role-based authorization
- Protected routes
- Secure session handling
- File upload validation
- Environment variables
- Activity logging for sensitive actions

## Team Members

| Name | Role | Contributions |
|---|---|---|
| Add name | Add role | Add contributions |
| Add name | Add role | Add contributions |
| Add name | Add role | Add contributions |

## Project Structure

```text
Add project folder structure here after implementation
```

## Architecture Diagram

```text
Add architecture diagram image/link here
```

## ER Diagram

```text
Add ER diagram image/link here
```

## Deployment

Frontend deployed on:

```text
Add platform name and link
```

Backend deployed on:

```text
Add platform name and link if separate
```

Database hosted on:

```text
Add provider name
```

## License

Add license details here.

Recommended:

```text
MIT License
```

