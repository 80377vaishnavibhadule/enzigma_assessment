const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all tasks
router.get('/', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Add a new task
router.post('/', (req, res) => {
    const { assigned_to, status, due_date, priority, comments } = req.body;
    db.query('INSERT INTO tasks SET ?', { assigned_to, status, due_date, priority, comments }, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json({ id: results.insertId, ...req.body });
    });
});

// Update a task
router.put('/:id', (req, res) => {
    const { id } = req.params;
    db.query('UPDATE tasks SET ? WHERE id = ?', [req.body, id], (err) => {
        if (err) return res.status(500).json(err);
        res.sendStatus(204);
    });
});

// Delete a task
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tasks WHERE id = ?', id, (err) => {
        if (err) return res.status(500).json(err);
        res.sendStatus(204);
    });
});

module.exports = router;
