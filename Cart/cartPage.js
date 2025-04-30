window.addEventListener("DOMContentLoaded", () => {
  localStorage.removeItem("orderTiming");
  localStorage.removeItem("orderTime");
});

let storage = JSON.parse(localStorage.getItem("userCart")) || [];

function updatedCartCount() {
  const cartAmountDisplay = document.querySelector(".cartAmount");
  const totalItems = storage.reduce((sum, item) => sum + item.quantity, 0);
  cartAmountDisplay.innerText = totalItems;
}

function renderCartItems() {
    const table = document.querySelector(".cartTable table");
    table.innerHTML = `
      <tr>
        <th>Product</th>
        <th>Quantity</th>
        <th>Subtotal</th>
        <th>Action</th>
      </tr>
    `;
  
    if (storage.length === 0) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td colspan="4" style="text-align: center; font-style: italic;">Your cart is empty.</td>
      `;
      table.appendChild(row);
      updateCartTotal();
      updatedCartCount();
      return;
    }
  
    storage.forEach(item => {
      const subtotal = (item.price * item.quantity).toFixed(2);
  
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.ItemName}</td>
        <td><input type="number" min="1" value="${item.quantity}" data-id="${item.ItemName}"></td>
        <td>$${subtotal}</td>
        <td><button class="remove-btn" data-id="${item.ItemName}">Remove</button></td>
      `;
  
      const input = row.querySelector("input");
      input.addEventListener("change", (e) => {
        const newQuantity = parseInt(e.target.value);
        if (newQuantity < 1){
            storage = storage.filter((x) => x.ItemName !== item.ItemName);
        }else{
            const itemInBasket = storage.find(x => x.ItemName === item.ItemName);
            itemInBasket.quantity = newQuantity;
        }
  
        localStorage.setItem("userCart", JSON.stringify(storage));
        updatedCartCount();
        renderCartItems();
        updateCartTotal();
      });
  
      const removeBtn = row.querySelector(".remove-btn");
      removeBtn.addEventListener("click", () => {
        storage = storage.filter(x => x.ItemName !== item.ItemName);
        localStorage.setItem("userCart", JSON.stringify(storage));
        updatedCartCount();
        renderCartItems();
        updateCartTotal();
      });
  
      table.appendChild(row);
    });
  
    updatedCartCount();
  }
  

function updateCartTotal() {
  const subtotal = storage.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.06625;
  const total = subtotal + tax;

  const summaryRows = document.querySelectorAll(".cartTotal td");
  summaryRows[1].innerText = `$${subtotal.toFixed(2)}`;
  summaryRows[3].innerText = `$${tax.toFixed(2)}`;
  summaryRows[5].innerText = `$${total.toFixed(2)}`;
}

// Handle the "Continue to Payment" button
document.getElementById("continueToPayment").addEventListener("click", () => {
  if (storage.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const orderTiming = localStorage.getItem("orderTiming");
  if (!orderTiming) {
    alert("Please select 'Order Now' or 'Order Later' before continuing.");
    return;
  }

  if (orderTiming === "later" && !localStorage.getItem("orderTime")) {
    alert("Please select a pickup time.");
    return;
  }

  const userCart = storage.map(item => ({
    ItemName: item.ItemName,
    quantity: item.quantity,
    price: item.price
  }));

  const selectedTime = localStorage.getItem("orderTime") || "now";

  localStorage.setItem("userCart", JSON.stringify(userCart));
  localStorage.setItem("userCartTiming", orderTiming);
  localStorage.setItem("userCartSelectedTime", selectedTime);

  window.location.href = "../Payment/paymentPage.html";
});

// Order timing buttons
function setOrderTiming(timing) {
  localStorage.setItem("orderTiming", timing);

  document.getElementById("orderNowButton").classList.remove("active");
  document.getElementById("orderLaterButton").classList.remove("active");

  const selectedButton = timing === "now"
    ? document.getElementById("orderNowButton")
    : document.getElementById("orderLaterButton");

  selectedButton.classList.add("active");

  const timePickerWrapper = document.getElementById("timePickerWrapper");
  if (timing === "later") {
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
  now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15, 0, 0);

  const end = new Date();
  end.setHours(17, 45, 0, 0); // last pickup: 5:45 PM

  while (now <= end) {
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const option = document.createElement("option");
    option.value = timeStr;
    option.textContent = timeStr;
    dropdown.appendChild(option);

    now.setMinutes(now.getMinutes() + 15);
  }

  if (dropdown.options.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No available pickup times";
    dropdown.appendChild(option);
  }
}

document.getElementById("orderTime").addEventListener("change", (e) => {
  localStorage.setItem("orderTime", e.target.value);
});

renderCartItems();
updateCartTotal();


