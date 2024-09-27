const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'manager',
    database: 'todolist'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to the database');
});

module.exports = db;
