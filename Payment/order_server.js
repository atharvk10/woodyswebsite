const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');
const app = express();
app.use(express.json());

const db = new sqlite3.Database('orders.db');

app.post('/orders', (req, res) => {
  const { orderID, netID, menuItems, readyBy } = req.body;

  const stmt = db.prepare(
    `INSERT OR REPLACE INTO orders (orderID, netID, menuItems, readyBy) VALUES (?, ?, ?, ?)`
  );

  stmt.run(orderID, netID, JSON.stringify(menuItems), readyBy, async (err) => {
    if (err) return res.status(500).json({ error: err.message });

    console.log('Order stored in DB.');

    try {
      const kitchenRes = await axios.post(
        'http://localhost:4000/kitchen/orders',
        req.body
      );
      console.log('Sent to kitchen:', kitchenRes.data);
    } catch (err) {
      console.error('Failed to notify kitchen:', err.message);
    }

    res.status(201).json({ status: 'Stored and forwarded' });
  });
});

app.listen(3000, () => {
  console.log('🛒 Order system running on http://localhost:3000');
});


