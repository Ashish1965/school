const mysql = require('mysql2');

// MySQL connection
const db = mysql.createConnection({
    host: 'dpg-ct3kkgbtq21c738ssjpg-a',
    user: 'root',
    password: 'PGnl79giYQcovWAW7uP8vkuKe3LWC8kR', // Replace with your MySQL root password
    database: 'schooldb_bd9e' // Replace with your database name
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
