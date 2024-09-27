// src/components/TaskTable.js
import React from 'react';

const TaskTable = ({ tasks, onEdit, onDelete }) => {
  return (
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
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.assigned_to}</td>
            <td>{task.status}</td>
            <td>{task.due_date}</td>
            <td>{task.priority}</td>
            <td>{task.comments}</td>
            <td>
              <button onClick={() => onEdit(task)}>Edit</button>
              <button onClick={() => onDelete(task.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
