# Smart Campus Management Platform - Database Schema

This document defines a practical database schema for PS-1: Smart Campus Management Platform. It is written as planning documentation and can be adapted to PostgreSQL, MongoDB, Supabase, Firebase, or another free-tier database.

## 1. Core Design Notes

- The platform supports four main roles: Student, Faculty, Coordinator, and Admin.
- Users share one base account table/collection, with role-specific profile fields stored separately when needed.
- Sensitive admin actions should be recorded in activity logs.
- Files such as resumes, assignment attachments, profile pictures, event banners, and submissions should store URLs from a storage provider such as Cloudinary, Supabase Storage, Firebase Storage, or S3.
- Use server-side validation and role-based authorization for every protected action.

## 2. Entity Overview

Minimum required entities:

- Users
- Roles
- Departments
- Courses
- Attendance
- Assignments
- Assignment Submissions
- Events
- Event Registrations
- Notifications
- Placements
- Placement Applications
- Clubs
- Club Memberships
- Announcements
- Settings
- Activity Logs

Recommended supporting entities:

- Sessions
- Password Reset Tokens
- Email Verification Tokens
- Files
- Permissions
- Calendar Items

## 3. Tables / Collections

## users

Stores common login and identity details for every user.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| role_id | UUID / ObjectId | Yes | References roles.id |
| department_id | UUID / ObjectId | No | References departments.id |
| name | String | Yes | Full name |
| email | String | Yes | Unique |
| password_hash | String | No | Required for email/password accounts |
| auth_provider | Enum | Yes | email, google |
| provider_id | String | No | Google account id if OAuth |
| phone | String | No | User phone number |
| avatar_url | String | No | Profile picture URL |
| email_verified | Boolean | Yes | Default false |
| status | Enum | Yes | active, pending, suspended, deleted |
| last_login_at | DateTime | No | Last login timestamp |
| created_at | DateTime | Yes | Created timestamp |
| updated_at | DateTime | Yes | Updated timestamp |

Indexes:

- unique(email)
- index(role_id)
- index(department_id)
- index(status)

## roles

Stores user role definitions.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| name | Enum | Yes | student, faculty, coordinator, admin |
| description | String | No | Role description |
| created_at | DateTime | Yes | Created timestamp |
| updated_at | DateTime | Yes | Updated timestamp |

## permissions

Optional table for fine-grained admin permissions.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| role_id | UUID / ObjectId | Yes | References roles.id |
| resource | String | Yes | Example: users, events, attendance |
| action | String | Yes | Example: create, read, update, delete |
| allowed | Boolean | Yes | Permission value |
| created_at | DateTime | Yes | Created timestamp |

## departments

Stores college departments.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| name | String | Yes | Department name |
| code | String | Yes | Example: CSE, ECE |
| description | String | No | Department details |
| head_faculty_id | UUID / ObjectId | No | References users.id |
| created_at | DateTime | Yes | Created timestamp |
| updated_at | DateTime | Yes | Updated timestamp |

Indexes:

- unique(code)
- index(head_faculty_id)

## courses

Stores subjects/courses for attendance and assignment tracking.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| department_id | UUID / ObjectId | Yes | References departments.id |
| faculty_id | UUID / ObjectId | No | References users.id |
| name | String | Yes | Course name |
| code | String | Yes | Course code |
| semester | Number | Yes | Student semester |
| credits | Number | No | Optional |
| created_at | DateTime | Yes | Created timestamp |
| updated_at | DateTime | Yes | Updated timestamp |

Indexes:

- unique(code)
- index(department_id)
- index(faculty_id)

## student_profiles

Stores fields specific to students.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| user_id | UUID / ObjectId | Yes | References users.id |
| roll_number | String | Yes | Unique student roll number |
| semester | Number | Yes | Current semester |
| skills | String[] | No | Student skills |
| linkedin_url | String | No | LinkedIn profile |
| github_url | String | No | GitHub profile |
| resume_url | String | No | Resume file URL |
| bio | Text | No | Short bio |
| created_at | DateTime | Yes | Created timestamp |
| updated_at | DateTime | Yes | Updated timestamp |

Indexes:

- unique(user_id)
- unique(roll_number)

## faculty_profiles

Stores fields specific to faculty members.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| user_id | UUID / ObjectId | Yes | References users.id |
| employee_id | String | Yes | Unique faculty id |
| designation | String | No | Assistant Professor, HOD, etc. |
| specialization | String | No | Area of expertise |
| office_location | String | No | Optional |
| bio | Text | No | Short bio |
| created_at | DateTime | Yes | Created timestamp |
| updated_at | DateTime | Yes | Updated timestamp |

Indexes:

- unique(user_id)
- unique(employee_id)

## attendance_sessions

Stores attendance sessions created by faculty.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| course_id | UUID / ObjectId | Yes | References courses.id |
| faculty_id | UUID / ObjectId | Yes | References users.id |
| title | String | Yes | Example: Lecture 12 |
| session_date | Date | Yes | Date of class |
| start_time | Time | No | Class start time |
| end_time | Time | No | Class end time |
| status | Enum | Yes | draft, open, closed |
| created_at | DateTime | Yes | Created timestamp |
| updated_at | DateTime | Yes | Updated timestamp |

Indexes:

- index(course_id)
- index(faculty_id)
- index(session_date)

## attendance_records

Stores attendance for each student in a session.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| attendance_session_id | UUID / ObjectId | Yes | References attendance_sessions.id |
| student_id | UUID / ObjectId | Yes | References users.id |
| status | Enum | Yes | present, absent, late, excused |
| marked_by | UUID / ObjectId | Yes | References users.id |
| marked_at | DateTime | Yes | Marked timestamp |
| remarks | String | No | Optional note |

Indexes:

- unique(attendance_session_id, student_id)
- index(student_id)
- index(status)

## assignments

Stores assignments created by faculty.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| course_id | UUID / ObjectId | Yes | References courses.id |
| faculty_id | UUID / ObjectId | Yes | References users.id |
| title | String | Yes | Assignment title |
| description | Text | Yes | Assignment details |
| deadline | DateTime | Yes | Submission deadline |
| attachment_url | String | No | Assignment file URL |
| rubric | Text | No | Evaluation criteria |
| max_marks | Number | No | Optional marks |
| status | Enum | Yes | draft, published, closed |
| created_at | DateTime | Yes | Created timestamp |
| updated_at | DateTime | Yes | Updated timestamp |

Indexes:

- index(course_id)
- index(faculty_id)
- index(deadline)
- index(status)

## assignment_submissions

Stores student assignment submissions.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| assignment_id | UUID / ObjectId | Yes | References assignments.id |
| student_id | UUID / ObjectId | Yes | References users.id |
| submission_type | Enum | Yes | pdf, zip, github_link |
| file_url | String | No | Required for PDF/ZIP |
| github_url | String | No | Required for GitHub link |
| submitted_at | DateTime | Yes | Submission timestamp |
| late | Boolean | Yes | True if after deadline |
| marks | Number | No | Faculty review marks |
| feedback | Text | No | Faculty feedback |
| reviewed_by | UUID / ObjectId | No | References users.id |
| reviewed_at | DateTime | No | Review timestamp |
| status | Enum | Yes | submitted, reviewed, resubmitted |

Indexes:

- unique(assignment_id, student_id)
- index(student_id)
- index(status)

## events

Stores campus events.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| created_by | UUID / ObjectId | Yes | References users.id |
| title | String | Yes | Event title |
| description | Text | Yes | Event details |
| banner_url | String | No | Event banner |
| venue | String | Yes | Event venue |
| event_start | DateTime | Yes | Start date/time |
| event_end | DateTime | No | End date/time |
| registration_deadline | DateTime | Yes | Last date to register |
| total_seats | Number | Yes | Seat capacity |
| available_seats | Number | Yes | Remaining seats |
| speakers | String[] | No | Speaker names |
| status | Enum | Yes | draft, published, cancelled, completed |
| created_at | DateTime | Yes | Created timestamp |
| updated_at | DateTime | Yes | Updated timestamp |

Indexes:

- index(created_by)
- index(event_start)
- index(status)

## event_registrations

Stores student event registrations.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| event_id | UUID / ObjectId | Yes | References events.id |
| student_id | UUID / ObjectId | Yes | References users.id |
| ticket_code | String | Yes | Unique ticket/QR code |
| qr_code_url | String | No | Generated QR image URL |
| status | Enum | Yes | registered, cancelled, attended |
| registered_at | DateTime | Yes | Registration timestamp |
| cancelled_at | DateTime | No | Cancellation timestamp |

Indexes:

- unique(event_id, student_id)
- unique(ticket_code)
- index(student_id)
- index(status)

## placements

Stores placement notices and job opportunities.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| created_by | UUID / ObjectId | Yes | References users.id |
| company_name | String | Yes | Company name |
| job_role | String | Yes | Role title |
| eligibility | Text | Yes | Eligibility criteria |
| ctc | String | No | Example: 8 LPA |
| location | String | No | Job location |
| deadline | DateTime | Yes | Application deadline |
| description | Text | No | Job details |
| apply_url | String | No | External application link if any |
| status | Enum | Yes | open, closed, draft |
| created_at | DateTime | Yes | Created timestamp |
| updated_at | DateTime | Yes | Updated timestamp |

Indexes:

- index(company_name)
- index(deadline)
- index(status)

## placement_applications

Stores student applications for placement opportunities.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| placement_id | UUID / ObjectId | Yes | References placements.id |
| student_id | UUID / ObjectId | Yes | References users.id |
| resume_url | String | No | Resume used for application |
| status | Enum | Yes | applied, shortlisted, rejected, selected, withdrawn |
| applied_at | DateTime | Yes | Application timestamp |
| updated_at | DateTime | Yes | Updated timestamp |

Indexes:

- unique(placement_id, student_id)
- index(student_id)
- index(status)

## clubs

Stores student clubs.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| coordinator_id | UUID / ObjectId | No | References users.id |
| name | String | Yes | Club name |
| description | Text | No | Club description |
| category | String | No | Technical, cultural, sports, etc. |
| logo_url | String | No | Club logo |
| status | Enum | Yes | active, inactive |
| created_at | DateTime | Yes | Created timestamp |
| updated_at | DateTime | Yes | Updated timestamp |

Indexes:

- unique(name)
- index(coordinator_id)

## club_memberships

Stores student club memberships.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| club_id | UUID / ObjectId | Yes | References clubs.id |
| student_id | UUID / ObjectId | Yes | References users.id |
| membership_role | Enum | Yes | member, lead, volunteer |
| status | Enum | Yes | pending, approved, rejected, removed |
| joined_at | DateTime | No | Approved timestamp |
| created_at | DateTime | Yes | Created timestamp |

Indexes:

- unique(club_id, student_id)
- index(student_id)
- index(status)

## announcements

Stores notices and announcements.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| created_by | UUID / ObjectId | Yes | References users.id |
| title | String | Yes | Announcement title |
| body | Text | Yes | Announcement content |
| audience | Enum | Yes | all, students, faculty, coordinators, department |
| department_id | UUID / ObjectId | No | Required if audience is department |
| priority | Enum | Yes | low, normal, high, urgent |
| attachment_url | String | No | Optional file |
| published_at | DateTime | No | Publish timestamp |
| expires_at | DateTime | No | Expiry timestamp |
| status | Enum | Yes | draft, published, archived |
| created_at | DateTime | Yes | Created timestamp |
| updated_at | DateTime | Yes | Updated timestamp |

Indexes:

- index(created_by)
- index(audience)
- index(department_id)
- index(status)

## notifications

Stores in-app notifications.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| user_id | UUID / ObjectId | Yes | References users.id |
| title | String | Yes | Notification title |
| message | Text | Yes | Notification message |
| type | Enum | Yes | assignment, attendance, event, placement, system |
| related_entity_type | String | No | Example: assignment, event |
| related_entity_id | UUID / ObjectId | No | Related record id |
| read | Boolean | Yes | Default false |
| created_at | DateTime | Yes | Created timestamp |

Indexes:

- index(user_id)
- index(read)
- index(type)
- index(created_at)

## calendar_items

Optional table for dashboard calendar views.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| user_id | UUID / ObjectId | No | Null for global items |
| title | String | Yes | Calendar title |
| item_type | Enum | Yes | class, assignment, event, placement, exam |
| related_entity_type | String | No | Linked entity type |
| related_entity_id | UUID / ObjectId | No | Linked entity id |
| start_at | DateTime | Yes | Start date/time |
| end_at | DateTime | No | End date/time |
| created_at | DateTime | Yes | Created timestamp |

Indexes:

- index(user_id)
- index(item_type)
- index(start_at)

## files

Stores uploaded file metadata.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| uploaded_by | UUID / ObjectId | Yes | References users.id |
| file_name | String | Yes | Original file name |
| file_url | String | Yes | Storage URL |
| file_type | String | Yes | MIME type |
| file_size | Number | Yes | Size in bytes |
| entity_type | String | No | Example: assignment, profile, event |
| entity_id | UUID / ObjectId | No | Related entity id |
| created_at | DateTime | Yes | Created timestamp |

Indexes:

- index(uploaded_by)
- index(entity_type, entity_id)

## settings

Stores user-specific settings.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| user_id | UUID / ObjectId | Yes | References users.id |
| theme | Enum | Yes | light, dark, system |
| email_notifications | Boolean | Yes | Default true |
| push_notifications | Boolean | Yes | Default true |
| privacy_profile_visible | Boolean | Yes | Default true |
| created_at | DateTime | Yes | Created timestamp |
| updated_at | DateTime | Yes | Updated timestamp |

Indexes:

- unique(user_id)

## sessions

Stores active login sessions if using database-backed sessions.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| user_id | UUID / ObjectId | Yes | References users.id |
| refresh_token_hash | String | Yes | Store hashed token only |
| user_agent | String | No | Browser/device info |
| ip_address | String | No | Login IP |
| expires_at | DateTime | Yes | Expiry timestamp |
| revoked_at | DateTime | No | Logout/revoke timestamp |
| created_at | DateTime | Yes | Created timestamp |

Indexes:

- index(user_id)
- index(expires_at)

## email_verification_tokens

Stores email verification tokens.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| user_id | UUID / ObjectId | Yes | References users.id |
| token_hash | String | Yes | Store hashed token only |
| expires_at | DateTime | Yes | Expiry timestamp |
| used_at | DateTime | No | Used timestamp |
| created_at | DateTime | Yes | Created timestamp |

Indexes:

- index(user_id)
- index(expires_at)

## password_reset_tokens

Stores password reset or OTP flow data.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| user_id | UUID / ObjectId | Yes | References users.id |
| token_hash | String | Yes | Store hashed token or OTP |
| expires_at | DateTime | Yes | Expiry timestamp |
| used_at | DateTime | No | Used timestamp |
| created_at | DateTime | Yes | Created timestamp |

Indexes:

- index(user_id)
- index(expires_at)

## activity_logs

Stores important system and admin actions.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | UUID / ObjectId | Yes | Primary key |
| actor_id | UUID / ObjectId | No | References users.id |
| action | String | Yes | Example: USER_ROLE_CHANGED |
| entity_type | String | No | Example: user, event, assignment |
| entity_id | UUID / ObjectId | No | Related record id |
| metadata | JSON | No | Extra details |
| ip_address | String | No | Actor IP |
| created_at | DateTime | Yes | Created timestamp |

Indexes:

- index(actor_id)
- index(action)
- index(entity_type, entity_id)
- index(created_at)

## 4. Main Relationships

| Relationship | Type | Description |
|---|---|---|
| roles to users | One-to-many | One role can belong to many users |
| departments to users | One-to-many | One department can contain many users |
| departments to courses | One-to-many | One department can offer many courses |
| users to student_profiles | One-to-one | A student user has one student profile |
| users to faculty_profiles | One-to-one | A faculty user has one faculty profile |
| courses to assignments | One-to-many | One course can have many assignments |
| assignments to submissions | One-to-many | One assignment can have many submissions |
| users to submissions | One-to-many | One student can submit many assignments |
| courses to attendance_sessions | One-to-many | One course can have many attendance sessions |
| attendance_sessions to attendance_records | One-to-many | One session has many student records |
| events to event_registrations | One-to-many | One event has many registrations |
| users to event_registrations | One-to-many | One student can register for many events |
| placements to placement_applications | One-to-many | One placement notice has many applications |
| users to placement_applications | One-to-many | One student can apply to many placements |
| clubs to club_memberships | One-to-many | One club has many members |
| users to notifications | One-to-many | One user can receive many notifications |
| users to activity_logs | One-to-many | One actor can generate many log entries |

## 5. Suggested ER Diagram Outline

Use this outline to create a visual ER diagram:

```text
roles 1 --- * users * --- 1 departments
users 1 --- 1 student_profiles
users 1 --- 1 faculty_profiles
departments 1 --- * courses
courses 1 --- * assignments
assignments 1 --- * assignment_submissions
users 1 --- * assignment_submissions
courses 1 --- * attendance_sessions
attendance_sessions 1 --- * attendance_records
users 1 --- * attendance_records
users 1 --- * events
events 1 --- * event_registrations
users 1 --- * event_registrations
users 1 --- * placements
placements 1 --- * placement_applications
users 1 --- * placement_applications
users 1 --- * announcements
users 1 --- * notifications
clubs 1 --- * club_memberships
users 1 --- * club_memberships
users 1 --- * settings
users 1 --- * sessions
users 1 --- * activity_logs
```

## 6. MVP Schema Priority

For the first working version, build only these first:

1. roles
2. users
3. departments
4. courses
5. student_profiles
6. faculty_profiles
7. attendance_sessions
8. attendance_records
9. assignments
10. assignment_submissions
11. events
12. event_registrations
13. announcements
14. notifications
15. placements
16. placement_applications
17. activity_logs

Add clubs, settings, files, calendar items, permissions, and advanced auth tables after the main demo flow works.

## 7. Demo Data Suggestions

Create test accounts:

| Role | Example Email | Purpose |
|---|---|---|
| Admin | admin@smartcampusmanager.test | Manage users, events, reports |
| Faculty | faculty@smartcampusmanager.test | Create assignments and attendance |
| Coordinator | coordinator@smartcampusmanager.test | Manage events and clubs |
| Student | student@smartcampusmanager.test | View dashboard, submit work, register |

Create sample records:

- 2 departments: Computer Science, Electronics
- 3 courses: Web Development, Data Structures, DBMS
- 2 assignments
- 2 attendance sessions
- 2 events
- 2 placement notices
- 5 notifications
- 5 activity logs

## 8. Security Notes

- Never store plain-text passwords.
- Store reset and verification tokens as hashes.
- Validate file type and size before upload.
- Use role checks before every protected action.
- Admin delete, role change, attendance update, and placement update actions should create activity logs.
- Use environment variables for database URLs, OAuth secrets, JWT secrets, email credentials, and storage keys.

## 9. Recommended Naming

Possible project names:

- Smart Campus Manager
- UniSync
- CampusHub
- EduSphere
- CampusBridge

