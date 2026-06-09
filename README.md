# AI Task Manager
A full-stack MERN application that uses AI-powered keyword matching to automatically classify tasks by priority and category. Built as a portfolio project demonstrating clean architecture, responsive design, and modern web development practices.

![Tech Stack](https://img.shields.io/badge/React-18-blue?logo=react)
![Tech Stack](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![Tech Stack](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen?logo=mongodb)

---

## ✨ Features

- **AI Auto-Classification** — Automatically assigns priority (High/Medium/Low) and category (Work/Personal/Education/Health/General) based on task title keywords
- **Full CRUD** — Create, Read, Update, Delete tasks with a clean REST API
- **Dashboard** — Overview with stats cards, recent tasks, and visual statistics
- **Search & Filter** — Find tasks by keyword, status, or priority
- **Responsive Design** — Works on desktop, tablet, and mobile
- **Modern UI** — Dark sidebar, gradient accents, smooth animations

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Router, Axios, React Icons |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| AI Module | Rule-based keyword matching |
| Styling | Vanilla CSS with CSS Custom Properties |

---

## 📁 Project Structure

```
ai-task-manager/
├── client/                    # React frontend
│   └── src/
│       ├── components/        # Reusable UI components
│       ├── pages/             # Route pages
│       ├── services/          # API service layer
│       ├── App.js             # Main app with routing
│       └── index.css          # Global styles
│
├── server/                    # Express backend
│   ├── controllers/           # Request handlers
│   ├── models/                # Mongoose schemas
│   ├── routes/                # API route definitions
│   ├── utils/                 # AI helper utility
│   └── server.js              # Entry point
│
└── README.md
```

---

## 🚀 Setup & Run

### Prerequisites
- Node.js (v16+)
- MongoDB (running locally on port 27017)

### 1. Clone the repo
```bash
git clone https://github.com/your-username/ai-task-manager.git
cd ai-task-manager
```

### 2. Start the Backend
```bash
cd server
npm install
npm run dev
```
Server runs on `http://localhost:5000`

### 3. Start the Frontend
```bash
cd client
npm install
npm start
```
App runs on `http://localhost:3000`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a single task |
| POST | `/api/tasks` | Create a new task (AI auto-classifies) |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| PATCH | `/api/tasks/:id/complete` | Mark task as completed |

### Example: Create a Task (Postman)
```
POST http://localhost:5000/api/tasks
Content-Type: application/json

{
  "title": "Complete urgent assignment for tomorrow",
  "description": "Finish the math homework before deadline"
}
```

The AI will auto-detect:
- **Priority**: High (keyword: "urgent", "tomorrow")
- **Category**: Education (keyword: "assignment")

---

## 🧠 How the AI Works

The AI module (`server/utils/aiHelper.js`) uses a **keyword-matching** approach:

1. It receives the task title as input
2. Scans for priority keywords (e.g., "urgent" → High, "later" → Low)
3. Scans for category keywords (e.g., "meeting" → Work, "gym" → Health)
4. Returns `{ priority, category }` to auto-fill the task

This is a beginner-friendly approach that demonstrates the concept of intelligent classification without requiring machine learning libraries.

---

## 🎨 Design System

- **Color Palette**: Dark sidebar (`#1a1a2e`), purple-red gradients, light content area
- **Typography**: Inter (Google Font)
- **Components**: Gradient-bordered cards, colored badges, SVG ring chart
- **Animations**: Fade-in transitions, bar chart growth, hover effects

---

## 📝 Git Commands Used

```bash
git init
git add .
git commit -m "Initial commit: AI Task Manager"
git branch -M main
git remote add origin https://github.com/your-username/ai-task-manager.git
git push -u origin main
```

