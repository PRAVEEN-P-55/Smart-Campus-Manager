# Architecture And Diagrams

Smart Campus Manager is implemented as a React + TypeScript single-page app for the current MVP. The UI is backed by typed seeded data in `src/data/campusData.ts`, which mirrors the planned database entities and API contracts.

Future backend integration can replace the seed data layer with API calls while keeping the role-aware UI modules intact.

## System Diagram

```text
User Browser
    |
    v
React + TypeScript App
    |
    +--> Demo Auth State
    +--> Role-Aware Navigation
    +--> Dashboard Modules
    |       +--> Student Dashboard
    |       +--> Faculty Dashboard
    |       +--> Coordinator Dashboard
    |       +--> Admin Dashboard
    |
    +--> Campus Modules
    |       +--> Attendance
    |       +--> Assignments
    |       +--> Events
    |       +--> Placements
    |       +--> Announcements
    |       +--> Notifications
    |       +--> Users
    |       +--> Analytics
    |
    v
Typed Seed Data Layer
```

## Planned Production Architecture

```text
User Browser
    |
    v
Frontend Web App
    |
    v
Backend API
    |
    +--> Auth Service
    +--> Role Permission Middleware
    +--> Campus Modules
    +--> File Upload Service
    |
    v
Database
    |
    v
Activity Logs
```

## ER Diagram Source

```mermaid
erDiagram
  ROLES ||--o{ USERS : has
  DEPARTMENTS ||--o{ USERS : contains
  DEPARTMENTS ||--o{ COURSES : offers
  USERS ||--|| STUDENT_PROFILES : owns
  USERS ||--|| FACULTY_PROFILES : owns
  COURSES ||--o{ ASSIGNMENTS : has
  ASSIGNMENTS ||--o{ ASSIGNMENT_SUBMISSIONS : receives
  USERS ||--o{ ASSIGNMENT_SUBMISSIONS : submits
  COURSES ||--o{ ATTENDANCE_SESSIONS : has
  ATTENDANCE_SESSIONS ||--o{ ATTENDANCE_RECORDS : contains
  USERS ||--o{ ATTENDANCE_RECORDS : receives
  USERS ||--o{ EVENTS : creates
  EVENTS ||--o{ EVENT_REGISTRATIONS : receives
  USERS ||--o{ EVENT_REGISTRATIONS : registers
  USERS ||--o{ PLACEMENTS : creates
  PLACEMENTS ||--o{ PLACEMENT_APPLICATIONS : receives
  USERS ||--o{ PLACEMENT_APPLICATIONS : applies
  CLUBS ||--o{ CLUB_MEMBERSHIPS : has
  USERS ||--o{ CLUB_MEMBERSHIPS : joins
  USERS ||--o{ ANNOUNCEMENTS : publishes
  USERS ||--o{ NOTIFICATIONS : receives
  USERS ||--o{ ACTIVITY_LOGS : triggers
```

See `ps1_database_schema.md` for the detailed field-level schema.
