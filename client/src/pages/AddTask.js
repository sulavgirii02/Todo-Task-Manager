// =============================================
// AddTask.js - Add New Task Page
// =============================================
// Renders the TaskForm component for creating
// a new task. On submit, calls the API.

import React from 'react';
import TaskForm from '../components/TaskForm';
import { createTask } from '../services/api';
import './AddTask.css';

function AddTask() {
  // Handle form submission
  const handleSubmit = async (formData) => {
    await createTask(formData);
  };

  return (
    <div className="page-container fade-in" id="add-task-page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">Add New Task</h2>
          <p className="page-subtitle">
            Create a task and let AI classify it for you.
          </p>
        </div>
      </div>

      {/* Task Form */}
      <TaskForm onSubmit={handleSubmit} isEditing={false} />
    </div>
  );
}

export default AddTask;
