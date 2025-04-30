async function viewCompletedOrders(){
    const container = document.getElementById("completedOrdersContainer");
    container.innerHTML = "";

    try{
        const res = await fetch("http://localhost:4000/kitchen/orders/completed");
        const orders = await res.json();

        if(!orders || orders.length === 0){
            container.innterHTML = '<p style="text-align:center;">No completed orders.</p>';
            return;
        }

        const orderList = document.createElement("ul");

        orders.forEach(order => {
            const box = document.createElement("div");
            box.className = "orderCard";
            box.innerHTML = `
                <h3>Order ID: ${order.orderID}</h3>
                <p><strong>NetID:</strong> ${order.netID}</p>
                <p><strong>Status:</strong> ${order.status}</p>
            `;
            container.appendChild(box);
        });
    } catch (err){
        console.error("Failed to load completed orders:", err);
        container.innerHTML = '<p style="color:red;">Could not load completed orders.</p>';
    }
}

window.onload = viewCompletedOrders;