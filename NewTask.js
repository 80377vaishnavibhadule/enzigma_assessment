import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const NewTask = () => {
    const [assignedTo, setAssignedTo] = useState('');
    const [status, setStatus] = useState('incomplete');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('medium');
    const [comments, setComments] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/tasks', { assigned_to: assignedTo, status, due_date: dueDate, priority, comments });
        history.push('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Task</h2>
            <input type="text" placeholder="Assigned To" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
            </select>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <textarea placeholder="Comments" value={comments} onChange={(e) => setComments(e.target.value)}></textarea>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default NewTask;
