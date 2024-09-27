import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const EditTask = () => {
    const { id } = useParams();
    const [task, setTask] = useState({});
    const history = useHistory();

    useEffect(() => {
        const fetchTask = async () => {
            const response = await axios.get(`http://localhost:5000/api/tasks/${id}`);
            setTask(response.data);
        };
        fetchTask();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/api/tasks/${id}`, task);
        history.push('/');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Task</h2>
            <input type="text" name="assigned_to" value={task.assigned_to} onChange={handleChange} required />
            <select name="status" value={task.status} onChange={handleChange}>
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
            </select>
            <input type="date" name="due_date" value={task.due_date} onChange={handleChange} required />
            <select name="priority" value={task.priority} onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <textarea name="comments" value={task.comments} onChange={handleChange}></textarea>
            <button type="submit">Update Task</button>
        </form>
    );
};

export default EditTask;
