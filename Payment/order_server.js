const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

let orders = [];

app.post('/orders', async (req, res) => {
  const order = req.body;
  orders.push(order);
  console.log('Order received:', order);

  //Try sending the order to the kitchen
  try {
    const kitchenRes = await axios.post('http://localhost:4000/kitchen/orders', order);
    console.log('Sent to kitchen:', kitchenRes.data);
  } 
  catch (err) 
  {
    console.error('Failed to send to kitchen:', err.message);
  }

  res.status(201).json({ status: 'Order stored and sent to kitchen' });
});

app.get('/orders', (req, res) => {
  res.json(orders);
});

//change based on localhost
app.listen(3000, () => console.log('🛒 Order system running on http://localhost:3000'));
