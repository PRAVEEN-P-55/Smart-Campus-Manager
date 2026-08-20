# API Reference

Base path:

```text
/api
```

Response format:

```json
{
  "success": true,
  "message": "Request completed successfully.",
  "data": {}
}
```

Error format:

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

## Auth

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/auth/register` | Public | Create account |
| POST | `/auth/login` | Public | Login with email/password |
| POST | `/auth/logout` | Authenticated | Logout current session |
| GET | `/auth/me` | Authenticated | Get current user |
| POST | `/auth/forgot-password` | Public | Request reset |
| POST | `/auth/reset-password` | Public | Reset password |

## Users And Profile

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/users` | Admin | List users |
| GET | `/users/:id` | Admin / Owner | Get user details |
| PATCH | `/users/:id` | Admin / Owner | Update user |
| DELETE | `/users/:id` | Admin | Deactivate user |
| PATCH | `/users/:id/role` | Admin | Assign role |
| GET | `/profile` | Authenticated | Get own profile |
| PATCH | `/profile` | Authenticated | Update own profile |

## Attendance

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/attendance/sessions` | Faculty / Admin | Create session |
| GET | `/attendance/sessions` | Faculty / Admin | List sessions |
| POST | `/attendance/sessions/:id/records` | Faculty / Admin | Mark attendance |
| GET | `/attendance/me` | Student | View own attendance |
| GET | `/attendance/student/:studentId` | Faculty / Admin | View student attendance |

## Assignments

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/assignments` | Faculty / Admin | Create assignment |
| GET | `/assignments` | Authenticated | List visible assignments |
| POST | `/assignments/:id/submissions` | Student | Submit assignment |
| GET | `/assignments/:id/submissions` | Faculty / Admin | View submissions |
| PATCH | `/submissions/:id/review` | Faculty / Admin | Add marks and feedback |

## Events

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/events` | Coordinator / Admin | Create event |
| GET | `/events` | Authenticated | List events |
| PATCH | `/events/:id` | Coordinator / Admin | Update event |
| POST | `/events/:id/register` | Student | Register |
| POST | `/events/:id/cancel` | Student | Cancel registration |
| GET | `/events/:id/registrations` | Coordinator / Admin | View registrations |

## Placements

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/placements` | Coordinator / Admin | Create notice |
| GET | `/placements` | Authenticated | List notices |
| POST | `/placements/:id/apply` | Student | Apply |
| GET | `/placements/:id/applications` | Coordinator / Admin | View applications |
| PATCH | `/placement-applications/:id/status` | Coordinator / Admin | Update status |

## Announcements And Notifications

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/announcements` | Faculty / Coordinator / Admin | Publish announcement |
| GET | `/announcements` | Authenticated | List visible announcements |
| GET | `/notifications` | Authenticated | List own notifications |
| PATCH | `/notifications/:id/read` | Authenticated | Mark read |
| PATCH | `/notifications/read-all` | Authenticated | Mark all read |

## Search, Analytics, And Logs

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/search?q=` | Authenticated | Role-aware global search |
| GET | `/analytics/admin` | Admin | Campus analytics |
| GET | `/analytics/faculty` | Faculty | Faculty analytics |
| GET | `/analytics/events` | Admin / Coordinator | Event analytics |
| GET | `/analytics/placements` | Admin / Coordinator | Placement analytics |
| GET | `/activity-logs` | Admin | Audit logs |

Validation and business rules are detailed in `ps1_system_architecture_and_apis.md`.
