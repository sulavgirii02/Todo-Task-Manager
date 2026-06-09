// =============================================
// api.js - Axios HTTP Service Layer
// =============================================
// This file creates an Axios instance and provides
// helper functions for all our API calls.
// Using a service layer keeps our components clean
// by separating data-fetching logic from UI logic.

import axios from 'axios';

// Create an Axios instance with a base URL
// All requests will be prefixed with this URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// ---- Task API Functions ----

// Fetch all tasks from the server
export const getAllTasks = () => API.get('/tasks');

// Fetch a single task by its ID
export const getTaskById = (id) => API.get(`/tasks/${id}`);

// Create a new task
export const createTask = (taskData) => API.post('/tasks', taskData);

// Update an existing task
export const updateTask = (id, taskData) => API.put(`/tasks/${id}`, taskData);

// Delete a task
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

// Mark a task as completed
export const completeTask = (id) => API.patch(`/tasks/${id}/complete`);

export default API;
