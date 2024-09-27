import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await axios.get('http://localhost:5000/api/tasks');
            setTasks(response.data);
        };
        fetchTasks();
    }, []);

    const deleteTask = async (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        }
    };

    return (
        <div>
            <h1>Todo List</h1>
            <Link to="/new"><button>Add New Task</button></Link>
            <table>
                <thead>
                    <tr>
                        <th>Assigned To</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th>Comments</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.assigned_to}</td>
                            <td>{task.status}</td>
                            <td>{task.due_date}</td>
                            <td>{task.priority}</td>
                            <td>{task.comments}</td>
                            <td>
                                <Link to={`/edit/${task.id}`}><button>Edit</button></Link>
                                <button onClick={() => deleteTask(task.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
