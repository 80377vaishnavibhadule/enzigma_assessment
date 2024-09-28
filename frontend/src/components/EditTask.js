import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({});

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching the task:", error);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/tasks/${id}`, task);
    navigate('/');
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
      <button type="submit">Update Task</button>
    </form>
  );
};

export default EditTask;
