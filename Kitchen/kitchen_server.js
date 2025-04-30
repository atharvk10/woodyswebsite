const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(path.join(__dirname, '../Payment/orders.db'));

// Receive forwarded order (just logs, not stores again)
app.post('/kitchen/orders', (req, res) => {
  console.log("New kitchen order received:", req.body);
  res.status(200).json({ message: "Order received by kitchen." });
});

// View current orders from the shared database
app.get('/kitchen/orders', (req, res) => {
  db.all("SELECT * FROM orders", [], (err, rows) => {
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

  if (status === 'ready') {
    db.run("DELETE FROM orders WHERE orderID = ?", [orderID], function (err) {
      if (err) {
        console.error("Database delete error:", err.message);
        return res.status(500).json({ error: err.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Order not found." });
      }

      console.log(`Order ${orderID} marked ready and removed.`);
      res.json({ message: `Order ${orderID} removed from kitchen.` });
    });
  } else if (status === 'In progress'){
    db.run("UPDATE orders SET status = ? WHERE orderID = ?", [status, orderID], function (err){
      if(err){
        console.error("Database update error:", err.message);
        return res.status(500).json({ error: err.message });
      }


      if(this.changes === 0){
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
