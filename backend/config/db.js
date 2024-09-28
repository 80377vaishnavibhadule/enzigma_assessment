const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',             // Change to your MySQL user
  password: 'manager', // Change to your MySQL password
  database: 'taskdb'       // Ensure this database exists
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

module.exports = db;
