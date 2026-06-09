// =============================================
// DashboardCards.js - Stats Overview Cards
// =============================================
// This component displays four summary cards:
// Total Tasks, Completed, Pending, and High Priority.
// Each card shows a count and a small icon.

import React from 'react';
import {
  MdAssignment,
  MdCheckCircle,
  MdPending,
  MdPriorityHigh,
} from 'react-icons/md';
import './DashboardCards.css';

function DashboardCards({ tasks }) {
  // Calculate stats from the tasks array
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const pendingTasks = tasks.filter((t) => t.status === 'Pending').length;
  const highPriority = tasks.filter((t) => t.priority === 'High').length;

  // Card data - makes it easy to map over
  const cards = [
    {
      id: 'card-total',
      title: 'Total Tasks',
      count: totalTasks,
      icon: <MdAssignment />,
      gradient: 'gradient-1',
    },
    {
      id: 'card-completed',
      title: 'Completed',
      count: completedTasks,
      icon: <MdCheckCircle />,
      gradient: 'gradient-3',
    },
    {
      id: 'card-pending',
      title: 'Pending',
      count: pendingTasks,
      icon: <MdPending />,
      gradient: 'gradient-4',
    },
    {
      id: 'card-high-priority',
      title: 'High Priority',
      count: highPriority,
      icon: <MdPriorityHigh />,
      gradient: 'gradient-2',
    },
  ];

  return (
    <div className="dashboard-cards" id="dashboard-cards-section">
      {cards.map((card, index) => (
        <div
          className={`dashboard-card ${card.gradient}`}
          key={card.id}
          id={card.id}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="dashboard-card-icon">{card.icon}</div>
          <div className="dashboard-card-info">
            <h3 className="dashboard-card-count">{card.count}</h3>
            <p className="dashboard-card-title">{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;
