// =============================================
// TaskForm.js - Reusable Task Form Component
// =============================================
// Used by both the AddTask and EditTask pages.
// Accepts initial values and an onSubmit callback.

import React, { useState, useEffect } from 'react';
import { MdAutoAwesome, MdSave, MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import './TaskForm.css';

function TaskForm({ initialData, onSubmit, isEditing }) {
  const navigate = useNavigate();

  // Form state - pre-fill with initialData if editing
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: '',
    status: 'Pending',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // If we receive initial data (editing mode), fill the form
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || '',
        priority: initialData.priority || '',
        status: initialData.status || 'Pending',
      });
    }
  }, [initialData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      navigate('/tasks');
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} id="task-form">
      {/* AI Hint Banner */}
      {!isEditing && (
        <div className="task-form-ai-hint" id="ai-hint-banner">
          <MdAutoAwesome className="ai-hint-icon" />
          <p>
            <strong>AI Auto-Classify:</strong> Leave category and priority empty — our AI
            will analyze your title and assign them automatically!
          </p>
        </div>
      )}

      {/* Title Field */}
      <div className="form-group">
        <label htmlFor="task-title" className="form-label">
          Task Title <span className="required">*</span>
        </label>
        <input
          type="text"
          id="task-title"
          name="title"
          className="form-input"
          placeholder="e.g., Complete urgent assignment for tomorrow"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Description Field */}
      <div className="form-group">
        <label htmlFor="task-description" className="form-label">
          Description
        </label>
        <textarea
          id="task-description"
          name="description"
          className="form-input form-textarea"
          placeholder="Add more details about this task..."
          value={formData.description}
          onChange={handleChange}
          rows={4}
        />
      </div>

      {/* Category & Priority Row */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="task-category" className="form-label">
            Category
          </label>
          <select
            id="task-category"
            name="category"
            className="form-input form-select"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Auto-detect (AI)</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="General">General</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="task-priority" className="form-label">
            Priority
          </label>
          <select
            id="task-priority"
            name="priority"
            className="form-input form-select"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="">Auto-detect (AI)</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Status Field (only show when editing) */}
      {isEditing && (
        <div className="form-group">
          <label htmlFor="task-status" className="form-label">
            Status
          </label>
          <select
            id="task-status"
            name="status"
            className="form-input form-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      )}

      {/* Buttons */}
      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
          id="btn-cancel"
        >
          <MdArrowBack /> Back
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
          id="btn-submit"
        >
          <MdSave />
          {isSubmitting
            ? 'Saving...'
            : isEditing
            ? 'Update Task'
            : 'Create Task'}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
