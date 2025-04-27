const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('orders.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      orderID INTEGER PRIMARY KEY,
      netID TEXT NOT NULL,
      menuItems TEXT NOT NULL,
      readyBy TEXT NOT NULL,
      status TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error("Error creating orders table:", err.message);
    } else {
      console.log("orders table created with status column.");
    }
  });
});

db.close();

