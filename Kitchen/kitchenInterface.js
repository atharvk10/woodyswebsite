
async function viewOrder(orderId) {
    const orderList = document.getElementById("orderList");
    const orderDetails = document.getElementById("orderDetails");

    const rest = await fetch(`/orders/${orderId}`);
    const order = await rest.json();

    orderList.forEach((order) => {
        const listOfOrders = document.createElement("li");
        listOfOrders.textContent = 'Order ID: ' + order.id + ', Status: ' + order.status;
        listOfOrders.onclick = async () => {
            const rest = await fetch(`/orders/${order.id}`);
            const orderDetails = await rest.json();
            orderDetails.innerHTML = `Order ID: ${orderDetails.id}, Status: ${orderDetails.status}, Items: ${orderDetails.items.join(", ")}`;
        }
        orderList.appendChild(listOfOrders);
    });

};