//sets up and allows JSON importing in to the kitchen system
const express = require('express');
const app = express();
app.use(express.json());

//stores the kitchen orders
let kitchenOrders = [];

//lets you receive and update kitchen orders
app.post('/kitchen/orders', (placedOrder, responseBack) => {
  const order = placedOrder.body;
  const existing = kitchenOrders.find(order => order.id === order.id);
  if (existing) 
  {
    Object.assign(existing, order);
  } 
  else 
  {
    kitchenOrders.push(order);
  }
  console.log('Received kitchen order:', order); //for testing purposes
  res.status(200).json({ status: 'Order received' });
});

app.get('/kitchen/orders', (placedOrder, responseBack) => {
  responseBack.json(kitchenOrders);
});

//just an example port, idk where it is going to be listening
app.listen(4000, () => console.log('Kitchen system running on port 4000'));
