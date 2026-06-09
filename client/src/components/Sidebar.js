// =============================================
// Sidebar.js - Navigation Sidebar Component
// =============================================
// This component renders the left sidebar with
// navigation links and the app logo/title.

import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  MdDashboard,
  MdChecklist,
  MdAddCircle,
  MdAutoAwesome,
} from 'react-icons/md';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar" id="sidebar-nav">
      {/* App Logo & Title */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <MdAutoAwesome className="sidebar-logo-icon" />
        </div>
        <div className="sidebar-title">
          <h1>AI Task Manager</h1>
          <p>Smart Productivity</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
          id="nav-dashboard"
          end
        >
          <MdDashboard className="sidebar-link-icon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
          id="nav-tasks"
        >
          <MdChecklist className="sidebar-link-icon" />
          <span>All Tasks</span>
        </NavLink>

        <NavLink
          to="/add-task"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
          id="nav-add-task"
        >
          <MdAddCircle className="sidebar-link-icon" />
          <span>Add Task</span>
        </NavLink>
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-footer-card">
          <MdAutoAwesome className="sidebar-footer-icon" />
          <p>AI-powered task classification</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
