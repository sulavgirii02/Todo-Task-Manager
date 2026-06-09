// =============================================
// taskRoutes.js - Define API Endpoints
// =============================================
// This file maps HTTP methods and URLs to the
// correct controller functions.
//
// Think of routes as a menu - they tell Express
// which function to call for each URL.

const express = require("express");
const router = express.Router();

// Import our controller functions
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  completeTask,
} = require("../controllers/taskController");

// ---- DEFINE ROUTES ----

// POST /api/tasks - Create a new task
router.post("/", createTask);

// GET /api/tasks - Get all tasks
router.get("/", getAllTasks);

// GET /api/tasks/:id - Get a single task by ID
router.get("/:id", getTaskById);

// PUT /api/tasks/:id - Update a task
router.put("/:id", updateTask);

// DELETE /api/tasks/:id - Delete a task
router.delete("/:id", deleteTask);

// PATCH /api/tasks/:id/complete - Mark task as complete
router.patch("/:id/complete", completeTask);

// Export the router
module.exports = router;
