// =============================================
// Task.js - Mongoose Model for Tasks
// =============================================
// This file defines the structure (schema) of a
// Task document in our MongoDB database.
// Think of it like a blueprint for what a task looks like.

const mongoose = require("mongoose");

// Define the Task Schema
// A schema tells MongoDB what fields each task should have
const taskSchema = new mongoose.Schema({
  // Title of the task (required - every task must have a title)
  title: {
    type: String,
    required: [true, "Task title is required"],
    trim: true,
  },

  // Description provides more details about the task
  description: {
    type: String,
    default: "",
    trim: true,
  },

  // Category helps organize tasks (e.g., Work, Personal, etc.)
  // Our AI helper will try to auto-detect this
  category: {
    type: String,
    enum: ["Work", "Personal", "Education", "Health", "General"],
    default: "General",
  },

  // Priority indicates how urgent the task is
  // Our AI helper will try to auto-detect this
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },

  // Status tracks the current state of the task
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },

  // createdAt stores when the task was created
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Task model from the schema
// This gives us methods like Task.find(), Task.create(), etc.
const Task = mongoose.model("Task", taskSchema);

// Export the model so other files can use it
module.exports = Task;
