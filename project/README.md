# ⬡ TaskFlow API

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=flat)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat)

A scalable REST API with JWT Authentication, Role-Based Access Control (RBAC), pagination, input validation, and a clean frontend UI. Built for the Primetrade.ai Backend Intern Assignment.

---

## Features

- **JWT Authentication** — Secure login & registration with bcrypt password hashing
- **Role-Based Access** — `user` vs `admin` roles with protected routes
- **Task CRUD** — Full create, read, update, delete with ownership checks
- **Pagination & Filters** — `?page=1&limit=10&status=pending&priority=high`
- **Input Validation** — Per-field validation with meaningful error messages
- **Global Error Handler** — Handles Mongoose, JWT, and runtime errors gracefully
- **Swagger Docs** — Auto-generated API documentation at `/api/docs`
- **Frontend UI** — Vanilla JS dashboard with auth, CRUD, filters, and loading states

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| Validation | express-validator |
| API Docs | Swagger (OpenAPI 3.0) |
| Frontend | Vanilla JS / HTML / CSS |

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally or a MongoDB Atlas URI

### 1. Clone & install
```bash
git clone https://github.com/yourusername/taskflow-api.git
cd taskflow-api/backend
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=change_this_to_a_strong_secret
JWT_EXPIRES_IN=7d
```

### 3. Run the server
```bash
npm run dev        # development (nodemon)
npm start          # production
```

### 4. Open the frontend
Open `frontend/index.html` in your browser (or use VS Code Live Server).

---

## API Reference

**Base URL:** `http://localhost:5000/api/v1`  
**Docs:** `http://localhost:5000/api/docs`

### Auth Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/auth/register` | Register new user | None |
| POST | `/auth/login` | Login, returns JWT | None |
| GET | `/auth/me` | Get current user | JWT |

### Task Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/tasks` | Get tasks (paginated + filtered) | JWT |
| POST | `/tasks` | Create a task | JWT |
| GET | `/tasks/:id` | Get single task | JWT |
| PUT | `/tasks/:id` | Update a task | JWT |
| DELETE | `/tasks/:id` | Delete a task | JWT |

**Query params for GET /tasks:**
- `page` (default: 1)
- `limit` (default: 10, max: 50)
- `status` — `pending` | `in-progress` | `completed`
- `priority` — `low` | `medium` | `high`

### User Endpoints (Admin Only)

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/users` | Get all users | JWT + Admin |
| DELETE | `/users/:id` | Delete a user | JWT + Admin |

---

## Request / Response Examples

**Register:**
```json
POST /api/v1/auth/register
{ "name": "Alice", "email": "alice@test.com", "password": "secret123" }

→ 201 { "success": true, "token": "eyJ...", "user": { "id": "...", "role": "user" } }
```

**Create Task:**
```json
POST /api/v1/tasks
Authorization: Bearer <token>
{ "title": "Fix login bug", "priority": "high" }

→ 201 { "success": true, "data": { "_id": "...", "title": "Fix login bug", ... } }
```

**Get Tasks (paginated):**
```json
GET /api/v1/tasks?page=1&limit=5&status=pending

→ 200 {
  "success": true,
  "count": 5,
  "pagination": { "total": 23, "page": 1, "pages": 5, "limit": 5 },
  "data": [...]
}
```

---

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js            # MongoDB connection
│   │   └── swagger.js       # Swagger config
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── task.controller.js
│   │   └── user.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js   # JWT protect + authorize
│   │   └── validate.middleware.js
│   ├── models/
│   │   ├── user.model.js
│   │   └── task.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── task.routes.js
│   │   └── user.routes.js
│   ├── utils/
│   │   └── jwt.utils.js
│   └── server.js
├── .env.example
└── package.json
frontend/
└── index.html
```

---

## Scalability Notes

This project is structured for production-grade scaling:

1. **Stateless JWT auth** — No server-side sessions means horizontal scaling works out of the box. Multiple API instances behind a load balancer (e.g., Nginx, AWS ALB) can all verify tokens independently.

2. **Modular architecture** — Routes, controllers, models, and middleware are fully decoupled. New modules (products, notes, teams) can be added without touching existing code.

3. **Pagination built-in** — All list endpoints support page/limit/filter params to prevent large payload responses and reduce database load as data grows.

4. **Redis caching (next step)** — Frequently read resources (user profile, task lists) can be cached in Redis with a short TTL to reduce MongoDB queries by 60–80% under heavy load.

5. **Microservices-ready** — Auth, tasks, and user management are logically isolated and can be extracted into separate Node.js services communicating via REST or a message broker (RabbitMQ / Kafka).

6. **Docker deployment** — The app can be containerized with a `Dockerfile` + `docker-compose.yml` pairing the API with MongoDB and optional Redis for consistent, reproducible deployments across environments.

---

## Security Practices

- Passwords hashed with **bcrypt** (12 salt rounds)
- JWT signed with environment secret, expires in 7 days
- Input sanitized and validated on every endpoint
- Ownership checks — users can only modify their own resources
- Admin role required for user management endpoints
- Mongoose CastError, duplicate key, and ValidationError handled globally

---

*Built by [Your Name] · Primetrade.ai Backend Intern Assignment*
