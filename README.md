# 📝 Console-Based TODO App

**Batch:** 18
**Topic:** Simple CRUD Project
**Stack:** JavaScript (Node.js) + MySQL (Sequelize ORM)

A console/terminal-based TODO application with user registration, login, and full task CRUD (Create, Read, Update, Delete, Search).

---

## 🚀 Features

- **Authentication:** Register & Login with validation
- **Task Management:** Add, View, Edit, Delete, Search tasks
- **Persistent Storage:** MySQL database via Sequelize ORM

---

## 📁 Project Structure

```
basic-curd/
├── main.js            # Entry point — CLI menus & flow control
├── authService.js      # Register / Login logic
├── taskService.js      # Task CRUD logic
├── db.js               # Sequelize DB connection & models
├── .env.example         # Sample environment variables
├── .gitignore
└── package.json
```

---

## ⚙️ Setup & Execution

### Prerequisites
- Node.js installed
- MySQL server installed & running

### 1. Clone the repo
```bash
git clone <https://github.com/tanha1242/Basic-CURD>
cd basic-curd
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy `.env.example` to `.env` and update with  MySQL credentials:
```bash
cp .env.example .env
```
Then edit `.env`:
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tododb
DB_USER=root
DB_PASSWORD=your_mysql_password
```

### 4. Create the database
Log into MySQL and create the database (tables are auto-created by Sequelize):
```sql
CREATE DATABASE tododb;
```

### 5. Run the application
```bash
node main.js
```

---

## 🖥️ Usage Flow

```
Welcome to Todo App

1. Register
2. Login
3. Exit

Enter your choice:
```

After login:

```
Todo Menu

1. Add Task
2. View All Tasks
3. Edit Task
4. Delete Task
5. Search Tasks
6. Logout

Enter your choice:
```

---

## 🗄️ Database Schema

**User**
| Field | Type |
|---|---|
| id | INTEGER (PK, auto-increment) |
| name | STRING |
| email | STRING (unique) |
| password | STRING |

**Task**
| Field | Type |
|---|---|
| id | INTEGER (PK, auto-increment) |
| userId | INTEGER (FK → User.id) |
| title | STRING |
| description | STRING |
| dueDate | DATEONLY |
| priority | ENUM('Low','Medium','High') |
| status | ENUM('Pending','Completed') |
| createdAt / updatedAt | auto-managed |

---

## 🎥 Demo Video

<https://drive.google.com/file/d/1jTM31LfwgXZFvhnEu3xU7ABGbbZMCMJp/view?usp=sharing>

---

## ✅ Notes
- `node_modules/` and `.env` are excluded via `.gitignore`.
- `.env.example` is provided as a template for required environment variables.
