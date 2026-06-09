// =============================================
// TaskItem.js - Single Task Row Component
// =============================================
// Displays one task in a card/row format with
// status, priority, actions (edit, delete, complete).

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdEdit,
  MdDelete,
  MdCheckCircle,
  MdAccessTime,
} from 'react-icons/md';
import './TaskItem.css';

function TaskItem({ task, onDelete, onComplete }) {
  const navigate = useNavigate();

  // Format date to a readable string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={`task-item ${task.status === 'Completed' ? 'completed' : ''}`} id={`task-${task._id}`}>
      {/* Priority Indicator */}
      <div className={`task-item-priority priority-${task.priority.toLowerCase()}`} />

      {/* Task Info */}
      <div className="task-item-content">
        <h3 className="task-item-title">{task.title}</h3>
        {task.description && (
          <p className="task-item-description">{task.description}</p>
        )}
        <div className="task-item-meta">
          <span className={`task-badge badge-category`}>{task.category}</span>
          <span className={`task-badge badge-priority badge-${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
          <span className={`task-badge badge-status badge-status-${task.status.toLowerCase().replace(' ', '-')}`}>
            {task.status}
          </span>
          <span className="task-item-date">
            <MdAccessTime /> {formatDate(task.createdAt)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="task-item-actions">
        {task.status !== 'Completed' && (
          <button
            className="action-btn action-complete"
            onClick={() => onComplete(task._id)}
            title="Mark as completed"
            id={`complete-${task._id}`}
          >
            <MdCheckCircle />
          </button>
        )}
        <button
          className="action-btn action-edit"
          onClick={() => navigate(`/edit-task/${task._id}`)}
          title="Edit task"
          id={`edit-${task._id}`}
        >
          <MdEdit />
        </button>
        <button
          className="action-btn action-delete"
          onClick={() => onDelete(task._id)}
          title="Delete task"
          id={`delete-${task._id}`}
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
