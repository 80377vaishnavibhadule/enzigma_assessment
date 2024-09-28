const db = require('../config/db');

exports.getTasks = (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.createTask = (req, res) => {
  const { assigned_to, status, due_date, priority, description } = req.body;
  db.query('INSERT INTO tasks (assigned_to, status, due_date, priority, description) VALUES (?, ?, ?, ?, ?)', 
    [assigned_to, status, due_date, priority, description], 
    (err, results) => {
      if (err) {
        console.error('Error creating task:', err); // Log error
        return res.status(500).json({ error: 'Error creating task' });
      }
      res.json({ id: results.insertId, assigned_to, status, due_date, priority, description });
  });
};


exports.getTaskById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM tasks WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Task not found');
    res.json(results[0]);
  });
};

exports.updateTask = (req, res) => {
  const id = req.params.id;
  const { assigned_to, status, due_date, priority, description } = req.body;
  db.query('UPDATE tasks SET assigned_to = ?, status = ?, due_date = ?, priority = ?, description = ? WHERE id = ?', 
    [assigned_to, status, due_date, priority, description, id], 
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json({ id, assigned_to, status, due_date, priority, description });
  });
};

exports.deleteTask = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(204);
  });
};
