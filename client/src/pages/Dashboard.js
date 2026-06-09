// =============================================
// Dashboard.js - Dashboard Page
// =============================================
// The main landing page showing overview cards,
// recent tasks, and statistics.

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAddCircle, MdArrowForward } from 'react-icons/md';
import DashboardCards from '../components/DashboardCards';
import StatsSection from '../components/StatsSection';
import TaskItem from '../components/TaskItem';
import { getAllTasks, deleteTask, completeTask } from '../services/api';
import './Dashboard.css';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getAllTasks();
      // The backend returns { count: number, tasks: [...] }
      setTasks(response.data.tasks);
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
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

  // Complete a task
  const handleComplete = async (id) => {
    try {
      const response = await completeTask(id);
      // The backend returns { message: "...", task: {...} }
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? response.data.task : t))
      );
    } catch (err) {
      console.error('Error completing task:', err);
    }
  };

  // Get 5 most recent tasks
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  if (loading) {
    return (
      <div className="page-container fade-in">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="page-container fade-in" id="dashboard-page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">Dashboard</h2>
          <p className="page-subtitle">Welcome back! Here's your task overview.</p>
        </div>
        <Link to="/add-task" className="btn btn-primary" id="btn-add-from-dashboard">
          <MdAddCircle /> New Task
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-banner" id="error-banner">
          <p>{error}</p>
          <button onClick={fetchTasks} className="btn btn-secondary">
            Retry
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <DashboardCards tasks={tasks} />

      {/* Two Column Layout: Recent Tasks + Stats */}
      <div className="dashboard-grid">
        {/* Recent Tasks */}
        <div className="dashboard-section" id="recent-tasks-section">
          <div className="section-header">
            <h3 className="section-title">Recent Tasks</h3>
            <Link to="/tasks" className="section-link">
              View All <MdArrowForward />
            </Link>
          </div>
          <div className="recent-tasks-list">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onDelete={handleDelete}
                  onComplete={handleComplete}
                />
              ))
            ) : (
              <div className="empty-state-small">
                <p>No tasks yet. Create your first one!</p>
                <Link to="/add-task" className="btn btn-primary">
                  <MdAddCircle /> Add Task
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className="dashboard-section" id="stats-overview">
          <div className="section-header">
            <h3 className="section-title">Statistics</h3>
          </div>
          <StatsSection tasks={tasks} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
