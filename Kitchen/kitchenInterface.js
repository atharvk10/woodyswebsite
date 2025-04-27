async function viewOrder() {
    const ordersContainer = document.getElementById("ordersContainer");
    ordersContainer.innerHTML = "";

    try {
        const res = await fetch("http://localhost:4000/kitchen/orders");
        const orders = await res.json();

        console.log("Orders fetched:", orders);

        if (orders.length === 0) {
            ordersContainer.innerHTML = '<p style="text-align:center;">No active orders.</p>';
            return;
        }

        orders.forEach(order => {
            const orderBox = document.createElement("div");
            orderBox.className = "orderCard";
            orderBox.innerHTML = `
                <h3>Order ID: ${order.orderID}</h3>
                <p><strong>NetID:</strong> ${Array.isArray(order.netID) ? order.netID.join(", ") : order.netID}</p>
                <p><strong>Status:</strong> ${order.status}</p>
            `;

            ordersContainer.appendChild(orderBox);
        });
    } catch (err) {
        console.error("Failed to fetch orders:", err);
        ordersContainer.innerHTML = '<p style="color:red;">Failed to load orders.</p>';
    }
}

function toggleDetails(orderID) {
    const detailDiv = document.getElementById(`details-${orderID}`);
    if (detailDiv) {
        detailDiv.style.display = (detailDiv.style.display === "none" || detailDiv.style.display === "") ? "block" : "none";
    }
}

async function updateOrder(orderID, action) {
    let newStatus = "";

    if (action === "begun order") {
        newStatus = "In progress";
    } else if (action === "order complete") {
        newStatus = "ready";
    } else {
        alert("Invalid action");
        return;
    }

    try {
        const res = await fetch(`http://localhost:4000/kitchen/orders/${orderID}/status`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus })
        });

        if (res.ok) {
            alert(`Order ${orderID} updated to "${newStatus}".`);
            viewOrder(); 
        } else {
            const error = await res.json();
            alert(`Error: ${error.error}`);
        }
    } catch (err) {
        console.error("Failed to update order:", err);
        alert("Failed to update order.");
    }
}

window.onload = viewOrder;
