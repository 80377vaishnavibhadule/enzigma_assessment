import React, { useState } from 'react';
import axios from 'axios';

const AddTask = ({ onAdd }) => {
  const [task, setTask] = useState({
    assigned_to: '',
    status: '',
    due_date: '',
    priority: 'low',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/tasks', task);
      onAdd(); // Refresh task list
      setTask({ /* reset fields */ });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="assigned_to" placeholder="Assigned To" value={task.assigned_to} onChange={handleChange} required />
      <input type="text" name="status" placeholder="Status" value={task.status} onChange={handleChange} required />
      <input type="date" name="due_date" value={task.due_date} onChange={handleChange} required />
      <select name="priority" value={task.priority} onChange={handleChange}>
        <option value="low">Low</option>
        <option value="high">High</option>
      </select>
      <textarea name="description" placeholder="Description" value={task.description} onChange={handleChange} required />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
