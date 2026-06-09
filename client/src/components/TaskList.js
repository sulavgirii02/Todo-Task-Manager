// =============================================
// TaskList.js - Task List with Search & Filter
// =============================================
// Displays a list of TaskItem components with
// search bar and filter controls.

import React, { useState } from 'react';
import { MdSearch, MdFilterList } from 'react-icons/md';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ tasks, onDelete, onComplete, loading }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');

  // Filter tasks based on search and filters
  const filteredTasks = tasks.filter((task) => {
    // Search filter
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus =
      filterStatus === 'All' || task.status === filterStatus;

    // Priority filter
    const matchesPriority =
      filterPriority === 'All' || task.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (loading) {
    return <div className="loading-spinner" />;
  }

  return (
    <div className="task-list-container" id="task-list-container">
      {/* Search & Filters Bar */}
      <div className="task-list-controls">
        <div className="search-box" id="search-box">
          <MdSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            id="search-input"
          />
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <MdFilterList className="filter-icon" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
              id="filter-status"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="filter-group">
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="filter-select"
              id="filter-priority"
            >
              <option value="All">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <p className="task-list-count">
        Showing {filteredTasks.length} of {tasks.length} tasks
      </p>

      {/* Task Items */}
      <div className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <div key={task._id} style={{ animationDelay: `${index * 0.05}s` }}>
              <TaskItem
                task={task}
                onDelete={onDelete}
                onComplete={onComplete}
              />
            </div>
          ))
        ) : (
          <div className="task-list-empty" id="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No tasks found</h3>
            <p>
              {tasks.length === 0
                ? 'Start by adding your first task!'
                : 'Try adjusting your search or filters.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskList;
