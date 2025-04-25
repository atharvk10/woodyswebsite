const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
app.use(express.json());

const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, '../Payment/orders.db'));

//view current orders
app.get('/kitchen/orders', (req, res) => {
  db.all("SELECT * FROM orders", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const formatted = rows.map(row => ({
      orderID: row.orderID,
      netID: row.netID,
      menuItems: JSON.parse(row.menuItems),
      readyBy: row.readyBy
    }));

    res.json(formatted);
  });
});

//delete order if it is marked as ready
app.post('/kitchen/orders/:id/status', (req, res) => {
  const orderID = req.params.id;
  const { status } = req.body;

  if (status === 'ready') {
    db.run("DELETE FROM orders WHERE orderID = ?", [orderID], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: "Order not found" });

      console.log(`Order ${orderID} marked ready and removed.`);
      res.json({ message: `Order ${orderID} removed from kitchen.` });
    });
  } else {
    res.status(400).json({ error: "Only status 'ready' is supported." });
  }
});

app.listen(4000, () => console.log('🥘 Kitchen system running on http://localhost:4000'));

