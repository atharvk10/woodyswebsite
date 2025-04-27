async function submitOrder() {
    const cart = JSON.parse(localStorage.getItem("userCart")) || [];
    const netID = localStorage.getItem("netID");
  
    console.log("NETID:", netID);


    if (!netID || cart.length === 0) {
      alert("Missing NetID or cart is empty.");
      return;
    }
  
    const itemDetails = cart.map(item => ({
      itemName: item.ItemName,
      price: item.price,
      quantity: item.quantity
    }));
      
  
    const order = {
      confirmationNumber: Date.now(), 
      netID: netID,
      items: itemDetails, 
      readyBy: new Date(Date.now() + 15 * 60000).toISOString(),
      status: "pending"
    };
  
    const res = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    });
  
    if (res.ok) {
      alert("Order placed successfully!");
      localStorage.removeItem("userCart"); // clear cart
      window.location.href = "thankyou.html"; // or redirect elsewhere
    } else {
      alert("Failed to place order.");
    }
  }
  
  function showOrderSummary() {
    const cart = JSON.parse(localStorage.getItem("userCart")) || [];
    const summaryDiv = document.getElementById("orderSummary");
  
    cart.forEach(item => {
      const p = document.createElement("p");
      p.textContent = `${item.ItemName} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
      summaryDiv.appendChild(p);
    });
  }
  
  window.onload = showOrderSummary;
  
  