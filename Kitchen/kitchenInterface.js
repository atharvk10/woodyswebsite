async function viewOrder() {
    const ordersContainer = document.getElementById("ordersContainer");
    ordersContainer.innerHTML = "";

    const res = await fetch("http://localhost:4000/kitchen/orders");
    const orders = await res.json();

    orders.forEach((order) => {
        const orderBox = document.createElement("div");
        orderBox.className = "orderCard";

        let currentStatus = "In Kitchen"; // default
        if (order.status === "In progress") currentStatus = "In progress";
        if (order.status === "ready") currentStatus = "Ready for pickup";

        orderBox.innerHTML = `
            <h3>Order ID: ${order.orderID}</h3>
            <p><strong>NetID:</strong> ${order.netID}</p>
            <p><strong>Status:</strong> ${currentStatus}</p>
            <p><strong>Items:</strong> ${order.menuItems.join(", ")}</p>
            <p><strong>Ready By:</strong> ${order.readyBy}</p>
            <button onclick="updateOrder(${order.orderID}, 'begun order')">Begin Order</button>
            <button onclick="updateOrder(${order.orderID}, 'order complete')">Mark Ready</button>
        `;

        ordersContainer.appendChild(orderBox);
    });
}

async function updateOrder(orderId, status) {
    if (!orderId || !status) {
        alert("Error: missing required input");
        return;
    }

    const res = await fetch("http://localhost:4000/kitchen/orders");
    if (!res.ok) {
        alert("Error: could not reach kitchen orders");
        return;
    }

    const orders = await res.json();
    const order = orders.find(o => o.orderID === orderId);
    if (!order) {
        alert("Error: Order not found");
        return;
    }

    let newStatus = "";
    let message = "";

    if (status === "begun order") {
        newStatus = "In progress";
        message = "Your order is being prepared.";
    } else if (status === "order complete") {
        newStatus = "ready";
        message = "Your order is ready for pickup!";
    } else {
        alert("Invalid status");
        return;
    }

    const updateRes = await fetch(`http://localhost:4000/kitchen/orders/${orderId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
    });

    if (!updateRes.ok) {
        alert("Error updating order");
        return;
    }

    alert(`Order ${orderId} has been marked as "${newStatus}".`);

    //If ready, it was removed from the DB, so don't reload everything
    if (newStatus === "ready") {
        const ordersContainer = document.getElementById("ordersContainer");
        const boxes = ordersContainer.getElementsByClassName("orderCard");
        for (let box of boxes) {
            if (box.innerHTML.includes(`Order ID: ${orderId}`)) {
                box.remove();
                break;
            }
        }
    } else {
        viewOrder(); //Refresh status visually
    }
}

window.onload = viewOrder;
