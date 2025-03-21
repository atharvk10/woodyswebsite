// server.js
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',    // Database host (localhost if it's on your local machine)
  user: 'root',         // MySQL username (use your own username if different)
  password: 'yourpassword', // MySQL password (use your own password)
  database: 'menu_db'   // The name of your MySQL database
});

// Connect to the MySQL database
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API route to get menu items
app.get('/api/menu', (req, res) => {
  // Query to select all menu items from the 'menu_items' table
  db.query('SELECT * FROM menu_table', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results); // Send the result as JSON to the frontend
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
