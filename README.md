# Team Task Board — Feature Sprint

## Overview

A full-stack **Team Task Board** application built with:

- **Frontend:** React 18 with React Router
- **Backend:** Spring Boot 3.2 with Spring Security
- **Database:** MySQL 8

The app is fully working out of the box — login, view tasks, create tasks, update status, and delete. Your team's mission is to **build new features** from the backlog below.

## Getting Started

### Prerequisites

- **Java 17** (JDK)
- **Maven** 3.8+
- **Node.js** 18+ and **npm**
- **MySQL** 8.0+

### Database Setup

1. Start your MySQL server
2. Create the database:

```sql
CREATE DATABASE IF NOT EXISTS task_board_db;
```

3. Update `backend/src/main/resources/application.properties` with your MySQL credentials if they differ from the defaults (`root` / `root`).

### Backend Setup

```bash
cd backend
mvn spring-boot:run
```

The backend runs on **http://localhost:8080**. On first startup, it seeds sample data:

- **3 user accounts** (all passwords: `password123`)
  - alice@taskboard.com
  - bob@taskboard.com
  - carol@taskboard.com
- **8 sample tasks** with varied statuses

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend runs on **http://localhost:3000**.

## What's Already Working

- **Login** — Sign in with any seeded account
- **View Tasks** — See all tasks with status badges
- **Create Task** — Add new tasks with title and description
- **Update Status** — Change any task between TODO → IN_PROGRESS → DONE
- **Delete Task** — Remove tasks
- **Task Detail** — Click a task to see its full details

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login (body: `{email, password}`) |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/tasks` | List all tasks |
| GET | `/api/tasks/{id}` | Get task by ID |
| POST | `/api/tasks` | Create task (body: `{title, description, createdBy}`) |
| PUT | `/api/tasks/{id}` | Update task |
| DELETE | `/api/tasks/{id}` | Delete task |

## Project Structure

```
├── backend/
│   ├── pom.xml
│   └── src/main/java/com/taskboard/
│       ├── TaskBoardApplication.java
│       ├── config/
│       │   ├── SecurityConfig.java
│       │   └── DataInitializer.java
│       ├── controller/
│       │   ├── AuthController.java
│       │   └── TaskController.java
│       ├── dto/
│       │   └── LoginRequest.java
│       ├── model/
│       │   ├── User.java
│       │   ├── Task.java
│       │   └── TaskStatus.java
│       ├── repository/
│       │   ├── UserRepository.java
│       │   └── TaskRepository.java
│       └── service/
│           ├── TaskService.java
│           └── CustomUserDetailsService.java
├── frontend/
│   ├── package.json
│   └── src/
│       ├── App.js
│       ├── context/AuthContext.js
│       ├── services/api.js
│       └── components/
│           ├── Navbar.js
│           ├── Login.js
│           ├── TaskBoard.js
│           ├── CreateTask.js
│           └── TaskDetail.js
└── database/
    └── schema.sql
```

## Data Model

**User** — `id`, `name`, `email`, `password`

**Task** — `id`, `title`, `description`, `status` (TODO/IN_PROGRESS/DONE), `createdBy`, `createdAt`

---

## The Feature Sprint

Your team has a **4-hour sprint** to build as many features as possible from the backlog below. Stories must be completed **in order** — no skipping ahead.

### The Backlog

| Story | Points | Title | Layer |
|-------|--------|-------|-------|
| TS-001 | 1 | Search & Filter | Frontend |
| TS-002 | 1 | Task Priority | Full Stack |
| TS-003 | 2 | Assign Tasks to Users | Full Stack |
| TS-004 | 2 | Due Dates with Overdue Alerts | Full Stack |
| TS-005 | 2 | Task Comments | Full Stack |
| TS-006 | 3 | Dashboard with Statistics | Full Stack |
| TS-007 | 3 | User Registration | Full Stack |
| TS-008 | 3 | Role-Based Access Control | Full Stack |

**Max possible: 17 points**

---

### TS-001 — Search & Filter (1 pt, Frontend Only)
> *"As a user, I want to search tasks by title and filter by status so I can quickly find what I'm looking for."*

**Acceptance Criteria:**
- A text input above the task list that filters tasks in real-time as you type (by title, case-insensitive)
- A dropdown/buttons to filter by status (All, TODO, IN_PROGRESS, DONE)
- Both filters work together (search + status)
- No backend changes needed — filter the existing data client-side

---

### TS-002 — Task Priority (1 pt, Full Stack)
> *"As a user, I want to set a priority (LOW, MEDIUM, HIGH) when creating a task, and see it visually distinguished in the list."*

**Acceptance Criteria:**
- New `priority` field on the Task entity (default: MEDIUM)
- Priority selectable when creating a task (dropdown)
- Priority displayed in the task list with color coding (green/yellow/red or similar)
- Database migration handled by JPA auto-update
- Existing seeded tasks should have varied priorities

---

### TS-003 — Assign Tasks to Users (2 pts, Full Stack)
> *"As a user, I want to assign a task to a team member so everyone knows who is responsible."*

**Acceptance Criteria:**
- New `assignee` relationship on Task (ManyToOne to User, nullable)
- A dropdown of users on the create/edit task form
- Assignee name displayed in the task list
- API endpoint to fetch all users for the dropdown (`GET /api/users`)
- Tasks can also be "unassigned"

---

### TS-004 — Due Dates with Overdue Alerts (2 pts, Full Stack)
> *"As a user, I want to set a due date on a task and see a visual warning when a task is overdue."*

**Acceptance Criteria:**
- New `dueDate` field on Task (LocalDate, nullable)
- Date picker on create/edit task form
- Tasks past their due date show a red "OVERDUE" badge (compare against current date)
- Tasks due today show a yellow "DUE TODAY" badge
- Overdue logic runs on the frontend (compare `dueDate` vs `new Date()`)

---

### TS-005 — Task Comments (2 pts, Full Stack)
> *"As a user, I want to add comments to a task so the team can discuss progress."*

**Acceptance Criteria:**
- New `Comment` entity (id, text, author, createdAt, linked to Task)
- `POST /api/tasks/{id}/comments` — add a comment
- `GET /api/tasks/{id}/comments` — list comments for a task
- Comments displayed on the task detail page, newest first
- Comment form with a text area + submit button
- Author name and timestamp shown on each comment

---

### TS-006 — Dashboard with Statistics (3 pts, Full Stack)
> *"As a user, I want a dashboard page showing task statistics so I can see project health at a glance."*

**Acceptance Criteria:**
- New `/dashboard` route and component
- Dashboard link in the navbar
- Shows: total tasks, count by status (TODO/IN_PROGRESS/DONE), count by priority
- Shows count of overdue tasks (if TS-004 was completed, otherwise skip)
- Backend endpoint `GET /api/tasks/stats` returns aggregated data
- Use simple cards/boxes for display (no charting library required, but bonus if you add one)

---

### TS-007 — User Registration (3 pts, Full Stack)
> *"As a new user, I want to register an account so I can access the task board."*

**Acceptance Criteria:**
- `POST /api/auth/register` endpoint accepting name, email, password
- Password must be hashed with BCrypt before storing
- Email must be unique (return 400 if duplicate)
- Registration form on a `/register` page
- After successful registration, redirect to login
- Link from login page: "Don't have an account? Register here"

---

### TS-008 — Role-Based Access Control (3 pts, Full Stack)
> *"As an admin, I want to control who can delete tasks and manage users."*

**Acceptance Criteria:**
- `role` field on User entity (ROLE_USER, ROLE_ADMIN)
- Only ADMIN users can: delete any task, view all users
- Regular users can only delete their own tasks (tasks they created)
- Admin-only UI elements hidden for regular users
- Security rules enforced on the backend (not just hidden in the UI)
- Seeded admin account: admin@taskboard.com

---

## Schedule

| Time | Activity |
|------|----------|
| 0:00 – 0:15 | Intro: clone repo, run app, read README, plan as a team |
| 0:15 – 4:00 | Sprint! Work through the backlog |

## Scoring

| Category | Points |
|----------|--------|
| Story completed & working | Story's point value (1–3) |
| Code quality bonus per story | +0.5 if clean, readable, no shortcuts |
| Demos well during presentation | +1 for the whole team |
| **Max possible** | **~22** |

## Rules

1. Must work stories **in order** — no skipping (simulates sprint priority)
2. A story is "done" only when it's testable in the browser — no partial credit
3. All team members must commit at least once (check git log)
4. No AI code generation tools
5. You CAN use documentation (MDN, Spring docs, React docs, Stack Overflow)

Good luck! 🚀
