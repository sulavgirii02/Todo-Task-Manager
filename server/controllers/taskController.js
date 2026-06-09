// =============================================
// taskController.js - Handle Task API Logic
// =============================================
// This file contains all the functions that handle
// our task-related API requests (CRUD operations).
// Each function is called by a specific route.

const Task = require("../models/Task");
const { analyzeTask } = require("../utils/aiHelper");

// ---- CREATE A NEW TASK ----
// POST /api/tasks
// Creates a new task and saves it to the database
const createTask = async (req, res) => {
  try {
    // Get the task data from the request body
    const { title, description, category, priority, status } = req.body;

    // Validate that title is provided
    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    // Use our AI helper to analyze the task title
    // It will suggest a priority and category based on keywords
    const aiSuggestion = analyzeTask(title);

    // Create the task object
    // If the user provided priority/category, use those
    // Otherwise, use the AI suggestions
    const newTask = new Task({
      title: title,
      description: description || "",
      category: category || aiSuggestion.category,
      priority: priority || aiSuggestion.priority,
      status: status || "Pending",
    });

    // Save the task to the database
    const savedTask = await newTask.save();

    // Send back the created task with 201 status (Created)
    res.status(201).json({
      message: "Task created successfully!",
      task: savedTask,
      aiSuggestion: aiSuggestion, // Show what AI suggested
    });
  } catch (error) {
    // If something goes wrong, send a 500 error
    res.status(500).json({ message: "Error creating task", error: error.message });
  }
};

// ---- GET ALL TASKS ----
// GET /api/tasks
// Retrieves all tasks from the database
const getAllTasks = async (req, res) => {
  try {
    // Find all tasks and sort by newest first
    const tasks = await Task.find().sort({ createdAt: -1 });

    // Send back the tasks with count
    res.status(200).json({
      count: tasks.length,
      tasks: tasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error: error.message });
  }
};

// ---- GET A SINGLE TASK ----
// GET /api/tasks/:id
// Retrieves one task by its ID
const getTaskById = async (req, res) => {
  try {
    // req.params.id gets the :id from the URL
    const task = await Task.findById(req.params.id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ task: task });
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error: error.message });
  }
};

// ---- UPDATE A TASK ----
// PUT /api/tasks/:id
// Updates an existing task with new data
const updateTask = async (req, res) => {
  try {
    const { title, description, category, priority, status } = req.body;

    // If the title changed, run AI analysis again
    let aiSuggestion = null;
    if (title) {
      aiSuggestion = analyzeTask(title);
    }

    // Build the update object with the new data
    const updateData = {};
    if (title) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (category) updateData.category = category;
    if (priority) updateData.priority = priority;
    if (status) updateData.status = status;

    // Find the task by ID and update it
    // { new: true } returns the updated task instead of the old one
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    // Check if task exists
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task updated successfully!",
      task: updatedTask,
      aiSuggestion: aiSuggestion,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error: error.message });
  }
};

// ---- DELETE A TASK ----
// DELETE /api/tasks/:id
// Removes a task from the database
const deleteTask = async (req, res) => {
  try {
    // Find and delete the task
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    // Check if task existed
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task deleted successfully!",
      task: deletedTask,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error: error.message });
  }
};

// ---- MARK TASK AS COMPLETE ----
// PATCH /api/tasks/:id/complete
// Changes the status of a task to "Completed"
const completeTask = async (req, res) => {
  try {
    // Find the task and update only the status field
    const completedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status: "Completed" },
      { new: true }
    );

    // Check if task exists
    if (!completedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task marked as completed!",
      task: completedTask,
    });
  } catch (error) {
    res.status(500).json({ message: "Error completing task", error: error.message });
  }
};

// Export all controller functions
module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  completeTask,
};
