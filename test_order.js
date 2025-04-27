// test_order.js
const axios = require('axios');

axios.post('http://localhost:3000/orders', {
  orderID: 101,
  netID: "sfa60",
  menuItems: ["Waffle Fries", "Iced Coffee"],
  readyBy: "2025-04-24T18:30:00"
})
.then(res => console.log("✅ Success:", res.data))
.catch(err => console.error("❌ Error:", err.message));
