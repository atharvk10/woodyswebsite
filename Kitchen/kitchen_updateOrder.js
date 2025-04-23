
async function updateOrder(orderId, status){

    //step 1: validate input data
    if (!orderId || !status){
        alert("Error: missing required input");
        return;
    }

    // step 2: verify if the order exists
    const exists = await fetch(`/orders/${orderId}`);
    if(!exists.ok){
        alert("Error: Order does not exist");
        return;
    }

    const order = await exists.json();
    const currStatus = order.status

    // step 3: validate status 
    if(status === "begun order" && currStatus !== "pending"){
            alert("Error: cannot begin order that is not 'pending'");
            return;
    }

    if (status === "order complete" && currStatus !== "In progress"){
        alert("Error: cannot complete an order that has not been started");
        return;
    }

    // step 4: update order status in database
        //updateOrderStatus(order_id, "In progress");
    let newStatus = currStatus;
    let message = "";

    if(status === "begun order"){
        newStatus = "In progress";
        message = "Your order is being prepared. Estimate pickup in 5 minutes";
    } else if (status === "order complete"){
        newStatus = "ready for pickup";
        message = "Your order is ready for pickup!";
    }

    const updateStatus = await fetch(`/orders/${orderId}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            status: newStatus,
        })
    });

    if(!updateStatus.ok){
        alert("Error updating order");
        return;
    }

    // step 5: notify user
    const userId = order.user_id;

        // use API to send notification to user
    await sendNotification(userId, message);
    displayOnUserScreen(userId, message);


    // step 6: update user interface
    alert(`Order ${orderId} has been marked as ${newStatus}`);


    // step 7: remove order from kitchen
    if (newStatus === "Ready for pickup"){
        const orderList = document.getElementById("orderList");
        const listItems = orderList.getElementsByTagName("li");

        for (let item of listItems){
            if (item.textContent.includes(`Order ID: ${orderId}`)){
                item.remove();
                break;
            }
        }
    }

    viewOrders(orderId);
    
}
