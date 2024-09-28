import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [taskData, setTaskData] = useState({
    assigned_to: '',
    status: '',
    due_date: '',
    priority: 'low',
    description: ''
  });

  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = () => {
    setIsAdding(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/tasks', taskData);
      setTaskData({ assigned_to: '', status: '', due_date: '', priority: 'low', description: '' }); // Reset form
      setIsAdding(false); // Hide the form
      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const editTask = (id) => {
    navigate(`/edit/${id}`); // Redirect to edit task page
  };

  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`);
        fetchTasks(); // Refresh task list after deletion
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  return (
    <div className="task-list">
      <h1>Task List</h1>
      {isAdding ? (
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="assigned_to" placeholder="Assigned To" value={taskData.assigned_to} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <input type="text" name="status" placeholder="Status" value={taskData.status} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <input type="date" name="due_date" value={taskData.due_date} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <select name="priority" value={taskData.priority} onChange={handleInputChange} required>
              <option value="low">Low</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="form-group">
            <textarea name="description" placeholder="Description" value={taskData.description} onChange={handleInputChange} required />
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={() => setIsAdding(false)}>Cancel</button>
        </form>
      ) : (
        <>
          {tasks.map(task => (
            <div className="task-item" key={task.id}>
              <div className="task-info">
                <h3>{task.assigned_to}</h3>
                <p>{task.description}</p>
                <span>Status: {task.status}</span>
                <span>Priority: {task.priority}</span>
                <span>Due Date: {task.due_date}</span>
              </div>
              <div>
                <button className="button" onClick={() => editTask(task.id)}>Edit</button>
                <button className="button" onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </div>
          ))}
          <button className="button" onClick={addTask}>Add Task</button>
        </>
      )}
    </div>
  );
};

export default TaskList;
