// =============================================
// StatsSection.js - Visual Statistics Component
// =============================================
// Displays a breakdown of tasks by category and
// status using simple bar charts.

import React from 'react';
import './StatsSection.css';

function StatsSection({ tasks }) {
  // Calculate category distribution
  const categories = ['Work', 'Personal', 'Education', 'Health', 'General'];
  const categoryData = categories.map((cat) => ({
    name: cat,
    count: tasks.filter((t) => t.category === cat).length,
  }));

  // Calculate status distribution
  const statusData = [
    {
      name: 'Pending',
      count: tasks.filter((t) => t.status === 'Pending').length,
      color: 'var(--status-pending)',
    },
    {
      name: 'In Progress',
      count: tasks.filter((t) => t.status === 'In Progress').length,
      color: 'var(--status-progress)',
    },
    {
      name: 'Completed',
      count: tasks.filter((t) => t.status === 'Completed').length,
      color: 'var(--status-completed)',
    },
  ];

  // Calculate priority distribution
  const priorityData = [
    {
      name: 'High',
      count: tasks.filter((t) => t.priority === 'High').length,
      color: 'var(--priority-high)',
    },
    {
      name: 'Medium',
      count: tasks.filter((t) => t.priority === 'Medium').length,
      color: 'var(--priority-medium)',
    },
    {
      name: 'Low',
      count: tasks.filter((t) => t.priority === 'Low').length,
      color: 'var(--priority-low)',
    },
  ];

  // Maximum count for scaling bars
  const maxCategory = Math.max(...categoryData.map((d) => d.count), 1);
  const maxStatus = Math.max(...statusData.map((d) => d.count), 1);
  const maxPriority = Math.max(...priorityData.map((d) => d.count), 1);

  // Category colors
  const categoryColors = [
    '#6c63ff',
    '#e94560',
    '#ffa502',
    '#2ed573',
    '#3498db',
  ];

  // Completion rate
  const completionRate =
    tasks.length > 0
      ? Math.round(
          (tasks.filter((t) => t.status === 'Completed').length / tasks.length) *
            100
        )
      : 0;

  return (
    <div className="stats-section" id="stats-section">
      {/* Completion Rate Card */}
      <div className="stats-card stats-completion" id="completion-card">
        <h3 className="stats-card-title">Completion Rate</h3>
        <div className="completion-ring-container">
          <svg className="completion-ring" viewBox="0 0 100 100">
            <circle
              className="completion-ring-bg"
              cx="50"
              cy="50"
              r="42"
              fill="none"
              strokeWidth="8"
            />
            <circle
              className="completion-ring-fill"
              cx="50"
              cy="50"
              r="42"
              fill="none"
              strokeWidth="8"
              strokeDasharray={`${completionRate * 2.64} 264`}
              strokeLinecap="round"
            />
          </svg>
          <div className="completion-ring-text">
            <span className="completion-percentage">{completionRate}%</span>
          </div>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="stats-card" id="category-stats">
        <h3 className="stats-card-title">By Category</h3>
        <div className="stats-bars">
          {categoryData.map((item, index) => (
            <div className="stats-bar-row" key={item.name}>
              <span className="stats-bar-label">{item.name}</span>
              <div className="stats-bar-track">
                <div
                  className="stats-bar-fill"
                  style={{
                    width: `${(item.count / maxCategory) * 100}%`,
                    backgroundColor: categoryColors[index],
                    animationDelay: `${index * 0.1}s`,
                  }}
                />
              </div>
              <span className="stats-bar-count">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Status Distribution */}
      <div className="stats-card" id="status-stats">
        <h3 className="stats-card-title">By Status</h3>
        <div className="stats-bars">
          {statusData.map((item, index) => (
            <div className="stats-bar-row" key={item.name}>
              <span className="stats-bar-label">{item.name}</span>
              <div className="stats-bar-track">
                <div
                  className="stats-bar-fill"
                  style={{
                    width: `${(item.count / maxStatus) * 100}%`,
                    backgroundColor: item.color,
                    animationDelay: `${index * 0.1}s`,
                  }}
                />
              </div>
              <span className="stats-bar-count">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Priority Distribution */}
      <div className="stats-card" id="priority-stats">
        <h3 className="stats-card-title">By Priority</h3>
        <div className="stats-bars">
          {priorityData.map((item, index) => (
            <div className="stats-bar-row" key={item.name}>
              <span className="stats-bar-label">{item.name}</span>
              <div className="stats-bar-track">
                <div
                  className="stats-bar-fill"
                  style={{
                    width: `${(item.count / maxPriority) * 100}%`,
                    backgroundColor: item.color,
                    animationDelay: `${index * 0.1}s`,
                  }}
                />
              </div>
              <span className="stats-bar-count">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatsSection;
