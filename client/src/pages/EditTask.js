// =============================================
// EditTask.js - Edit Existing Task Page
// =============================================
// Fetches the task by ID from the URL, then
// renders TaskForm pre-filled with its data.

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { getTaskById, updateTask } from '../services/api';
import './EditTask.css';

function EditTask() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the task to edit
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTaskById(id);
        setTask(response.data.task);
      } catch (err) {
        console.error('Error fetching task:', err);
        setError('Could not find this task.');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (formData) => {
    await updateTask(id, formData);
  };

  if (loading) {
    return (
      <div className="page-container fade-in">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container fade-in">
        <div className="error-banner">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container fade-in" id="edit-task-page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">Edit Task</h2>
          <p className="page-subtitle">Update the task details below.</p>
        </div>
      </div>

      {/* Task Form - pre-filled */}
      <TaskForm
        initialData={task}
        onSubmit={handleSubmit}
        isEditing={true}
      />
    </div>
  );
}

export default EditTask;
