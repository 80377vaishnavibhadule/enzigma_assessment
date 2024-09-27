const Task = require('../models/taskModel');

exports.getAllTasks = (req, res) => {
    Task.getAllTasks((err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.createTask = (req, res) => {
    const taskData = req.body;
    Task.createTask(taskData, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
};

exports.updateTask = (req, res) => {
    const taskId = req.params.id;
    const taskData = req.body;
    Task.updateTask(taskId, taskData, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
};

exports.deleteTask = (req, res) => {
    const taskId = req.params.id;
    Task.deleteTask(taskId, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
};
