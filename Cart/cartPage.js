let basket = JSON.parse(localStorage.getItem("storage")) || [
    { ItemName:"Everything Bagel", price: 3.99, quantity: 2},
    { ItemName:"Iced Coffee", price: 2.49, quantity: 1}
];
function updatedCartCount(){
    const cartAmountDisplay = document.querySelector(".cartAmount");
    const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);
    cartAmountDisplay.innerText = totalItems;
}
function renderCartItems(){
    const table = document.querySelector(".cartTable table");
    table.innerHTML = `
    <tr>
        <th>Product</th>
        <th>Quantity</th>
        <th>Subtotal</th>
    </tr>
    `;
    basket.forEach((item) => {
        const subtotal = (item.price * item.quantity).toFixed(2);

        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${item.ItemName}</td>
        <td><input type="number" min = "1" value="${item.quantity}" data-id="${item.ItemName}"></td>
        <td>$${subtotal}</td>
        `;
        const input = row.querySelector("input");
        input.addEventListener("change", (e)=> {
            const newQuantity = parseInt(e.target.value);
            if (newQuantity < 1) return;

            const itemsInBasket = basket.find((x) => x.ItemName === item.ItemName);
            itemsInBasket.quantity = newQuantity;


            localStorage.setItem("basket", JSON.stringify(basket));


            updatedCartCount();   
            localStorage.setItem("storage", JSON.stringify(basket)); 
            renderCartItems();
            updateCartTotal();
        });
        table.appendChild(row);
    });
    updatedCartCount();
}
function updateCartTotal(){
    let subtotal = basket.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let tax = subtotal * 0.06625;
    let total = subtotal + tax;

    const summaryRs = document.querySelectorAll(".cartTotal td");
    summaryRs[1].innerText = `$${subtotal.toFixed(2)}`;
    summaryRs[3].innerText = `$${tax.toFixed(2)}`;
    summaryRs[5].innerText = `$${total.toFixed(2)}`;

}
renderCartItems();
updateCartTotal();

document.getElementById("continueToPayment").addEventListener("click", () => {
    
    if (basket.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    const orderTiming = localStorage.getItem("orderTiming");
    if (!orderTiming) {
        alert("Please select 'Order Now' or 'Order Later' before continuing.");
        return;
    }

    if (orderTiming === 'later' && !localStorage.getItem("orderTime")){
        alert("Please select a pickup time.");
        return;
    }

    const userCart = basket.map(item => ({
        ItemName: item.ItemName,
        quantity: item.quantity,
        price: item.price
    }));

    const timing = localStorage.getItem("orderTiming");
    const selectedTime = localStorage.getItem("orderTime") || "now";

    localStorage.setItem("userCart", JSON.stringify(userCart));
    localStorage.setItem("userCartTiming", timing);
    localStorage.setItem("userCartSelectedTime", selectedTime);

    
    window.location.href = "../Payment/paymentPage.html";
    });

function setOrderTiming(timing) {
    localStorage.setItem("orderTiming", timing);
    
    document.getElementById("orderNowButton").classList.remove("active");
    document.getElementById("orderLaterButton").classList.remove("active");

  
    const selectedButton = timing === "now"
        ? document.getElementById("orderNowButton")
        : document.getElementById("orderLaterButton");

    selectedButton.classList.add("active");

    const timePickerWrapper = document.getElementById("timePickerWrapper")

    if(timing === "later") {
        populateTimePicker();
        timePickerWrapper.style.display = "block";
    
} else {
    timePickerWrapper.style.display = "none";
    localStorage.removeItem("orderTime");

}
}

function populateTimePicker() {
    const dropdown = document.getElementById("orderTime");
    dropdown.innerHTML = "";

    const now = new Date();
    now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15);
    now.setSeconds(0);
    now.setMilliseconds(0);

    const end = new Date();
    end.setHours(17, 45, 0, 0);

    while (now <= end) {
        const timeStr = now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    

        const option = document.createElement("option");
        option.value = timeStr;
        option.textContent = timeStr;
        dropdown.appendChild(option);

        now.setMinutes(now.getMinutes() + 15);
    }
    if (dropdown.options.length === 0){
        const option = document.createElement("option");
        option.value = "";
        option.textContent = "No available pickup times";
        dropdown.appendChild(option);
    }
}

document.getElementById("orderTime").addEventListener("change", (e) => {
    localStorage.setItem("orderTime", e.target.value);
});

