const mysql = require('mysql2');

// MySQL connection
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD, // Replace with your MySQL root password
    database: process.env.DATABASE // Replace with your database name
});

// Connect to database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the MySQL database.');
    }
});

module.exports = db;
