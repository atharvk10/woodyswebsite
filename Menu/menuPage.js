const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Initialize express app
const app = express();
const port = 3000;

// Enable CORS for frontend requests
app.use(cors());

// Set up MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',    // Your database host (e.g., localhost or IP)
  user: 'woodys',     // Your database username
  password: '', // Your database password
  database: 'menu' // Your database name
});

// Endpoint to fetch menu items
app.get('/menu', (req, res) => {
  const query = 'SELECT ItemName, ItemPrice FROM menu_table'; // Replace with your actual table/column names
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch menu items' });
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
