const db = require('../config/db');

const Task = {
    getAllTasks: (callback) => {
        db.query('SELECT * FROM tasks', callback);
    },
    createTask: (taskData, callback) => {
        db.query('INSERT INTO tasks SET ?', taskData, callback);
    },
    updateTask: (id, taskData, callback) => {
        db.query('UPDATE tasks SET ? WHERE id = ?', [taskData, id], callback);
    },
    deleteTask: (id, callback) => {
        db.query('DELETE FROM tasks WHERE id = ?', [id], callback);
    },
};

module.exports = Task;
