# Task Manager API

A RESTful backend API for managing tasks with user authentication and role-based access control. Built using Node.js, Express, MongoDB, and JWT.

---

## 🚀 Features

* User Registration & Login (JWT Authentication)
* Secure password hashing (bcrypt)
* Role-based access control
* CRUD operations for tasks
* Protected routes using middleware
* Swagger API documentation

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT (JSON Web Tokens)
* Swagger (API Docs)

---

## 📁 Project Structure

```
project/
 ├── backend/
 │   ├── src/
 │   │   ├── config/
 │   │   ├── controllers/
 │   │   ├── middleware/
 │   │   ├── models/
 │   │   ├── routes/
 │   │   ├── utils/
 │   │   └── server.js
 │   ├── .env
 │   └── package.json
 └── frontend/
     └── index.html
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone <your-repo-link>
cd project/backend
```

---

### 2. Install dependencies

```
npm install
```

---

### 3. Create `.env` file

Create a `.env` file inside `backend/` and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

---

### 4. Run the server

```
npm run dev
```

Server will start at:

```
http://localhost:5000
```

---

## 📚 API Documentation

Swagger UI available at:

```
http://localhost:5000/api/docs
```

---

## 🔐 Authentication Flow

1. Register a user → `/auth/register`
2. Login user → `/auth/login`
3. Copy JWT token
4. Authorize in Swagger using:

```
Bearer <your_token>
```

---

## 📌 API Endpoints

### Auth Routes

* `POST /auth/register` → Register user
* `POST /auth/login` → Login user
* `GET /auth/me` → Get current user

---

### Task Routes (Protected)

* `GET /tasks` → Get all tasks
* `POST /tasks` → Create task
* `GET /tasks/:id` → Get single task
* `PUT /tasks/:id` → Update task
* `DELETE /tasks/:id` → Delete task

---

## 🧪 Testing the API

Use Swagger UI or tools like Postman.

Example request:

```
POST /tasks
```

Body:

```
{
  "title": "Test Task",
  "description": "Testing project"
}
```

---

## 🌐 Frontend

A basic frontend is available in:

```
frontend/index.html
```

You can open it directly in browser or serve using:

```
npx serve .
```

---

## ✅ Status

✔ Backend fully functional
✔ MongoDB connected
✔ Authentication working
✔ CRUD operations working

---

## 👨‍💻 Author

Sagar Das

---

## 📌 Notes

* Use MongoDB Atlas for database connection
* Ensure IP is whitelisted in MongoDB Atlas
* Always use correct JWT token for protected routes

---
