const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const db = new sqlite3.Database(path.join(__dirname, '../Payment/orders.db'));

// Receive forwarded order (just logs, not stores again)
app.post('/kitchen/orders', (req, res) => {
  console.log("New kitchen order received:", req.body);
  res.status(200).json({ message: "Order received by kitchen." });
});

// View current orders from the shared database
app.get('/kitchen/orders', (req, res) => {
  db.all("SELECT * FROM orders WHERE status != 'ready'", [], (err, rows) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ error: err.message });
    }

    const formattedOrders = rows.map(row => ({
      orderID: row.orderID,
      netID: Array.isArray(row.netID) ? row.netID.join(", ") : row.netID,
      menuItems: JSON.parse(row.menuItems),
      readyBy: row.readyBy,
      status: row.status
    }));

    res.json(formattedOrders);
  });
});

app.post('/kitchen/orders/:id/status', (req, res) => {
  const orderID = req.params.id;
  const { status } = req.body;

  if (status === 'ready' || status === 'In progress') {
    db.run("UPDATE orders SET status = ? WHERE orderID = ?", [status, orderID], function (err) {
      if (err) {
        console.error("Database update error:", err.message);
        return res.status(500).json({ error: err.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Order not found." });
      }

      console.log(`Order ${orderID} updated to status "${status}".`);
      res.json({ message: `Order ${orderID} updated to "${status}".` });
    }); 

  } else {
    res.status(400).json({ error: "Only status 'ready' or 'In progress' is supported." });
  }
});

app.listen(4000, () => {
  console.log('Kitchen system running on http://localhost:4000');
});

app.get('/kitchen/orders/completed', (req, res) => {
  db.all("SELECT * FROM orders WHERE status = 'ready'", [], (err, rows) => {
    if(err){
      console.error("Database error:", err.message);
      return res.status(500).json({ error: err.message });
    }

    const formattedOrders = rows.map(row => ({
      orderID: row.orderID,
      netID: row.netID,
      menuItems: JSON.parse(row.menuItems),
      readyBy: row.readyBy,
      status: row.status
    }));

    res.json(formattedOrders);
  });
});



// serve kitchenInterface.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'kitchenInterface.html'));
});

// serve completed.html
app.get('/completedOrders.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'completedOrders.html'));
});

// serve css
app.get('/kitchenInterface.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'kitchenInterface.js'));
});
app.get('/completedInterface.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'completedInterface.js'));
});
app.get('/kitchenInterface.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'kitchenInterface.css'));
});