// =============================================
// Tasks.js - All Tasks Page
// =============================================
// Displays the full list of tasks with search,
// filter, and CRUD functionality.

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAddCircle } from 'react-icons/md';
import TaskList from '../components/TaskList';
import { getAllTasks, deleteTask, completeTask } from '../services/api';
import './Tasks.css';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getAllTasks();
      setTasks(response.data.tasks);
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        setTasks((prev) => prev.filter((t) => t._id !== id));
      } catch (err) {
        console.error('Error deleting task:', err);
      }
    }
  };

  const handleComplete = async (id) => {
    try {
      const response = await completeTask(id);
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? response.data.task : t))
      );
    } catch (err) {
      console.error('Error completing task:', err);
    }
  };

  return (
    <div className="page-container fade-in" id="tasks-page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">All Tasks</h2>
          <p className="page-subtitle">Manage and organize all your tasks.</p>
        </div>
        <Link to="/add-task" className="btn btn-primary" id="btn-add-from-tasks">
          <MdAddCircle /> New Task
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-banner">
          <p>{error}</p>
          <button onClick={fetchTasks} className="btn btn-secondary">
            Retry
          </button>
        </div>
      )}

      {/* Task List */}
      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onComplete={handleComplete}
        loading={loading}
      />
    </div>
  );
}

export default Tasks;
