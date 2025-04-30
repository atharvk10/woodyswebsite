function smoothScrollToSection(event, sectionID) {
  event.preventDefault();
  const element = document.getElementById(sectionID);
  if(element) {
    element.scrollIntoView({behavior: "smooth"})
  }
}

let userCart = JSON.parse(localStorage.getItem("userCart")) || [];

let increase = (itemToAdd) => {
    let itemFind = "";
    for (let element of userCart) {
        if (element.ItemName === itemToAdd.ItemName) {
            itemFind = element;
            break;
        }
    }
    if (itemFind === ""){
      userCart.push({
        ItemName: itemToAdd.ItemName,
        price: Number(itemToAdd.ItemPrice),
        quantity: 1,
      });
    } else {
      itemFind.quantity += 1;
    }
    localStorage.setItem("userCart", JSON.stringify(userCart));
    updateQuantity(itemToAdd.ItemName);
};

let decrease = (ItemName) => {
    let itemToAdd = ItemName;
    let itemFind = "";
    for (let element of userCart) {
        if (element.ItemName === itemToAdd.ItemName) {
            itemFind = element;
            break;
        }
    }
    if (itemFind === ""){
        return;
    } else if(itemFind.quantity === 0){
        return;
    } else {
      itemFind.quantity -= 1;
    }
    userCart = userCart.filter((x) => x.quantity !== 0);
    localStorage.setItem("userCart", JSON.stringify(userCart));
    updateQuantity(itemToAdd.ItemName);
};

let updateQuantity = (ItemName) => {
    let itemFind = userCart.find((x) => x.ItemName === ItemName);
    if (!itemFind){
        const element1 = document.getElementById(ItemName);
        if (element1){
          element1.innerHTML = 0;
        }
        updateCart();
        return;
    }
    const element2 = document.getElementById(ItemName);
    if (element2) {
      element2.innerHTML = itemFind.quantity;
    }
    updateCart();
};

let updateCart = () => {
    let cartnavbarUP = document.getElementById("cartnavbar");
    let totalCartAmount = 0;
    for (var i = 0; i < userCart.length; ++i) {
        totalCartAmount = totalCartAmount + userCart[i].quantity;
    }
    cartnavbarUP.innerHTML = totalCartAmount;
};

//THIS IS FOR BREAKFAST SANDWICHES

document.addEventListener("DOMContentLoaded", function() {
  fetch('./MenuDatabase/breakfastSandwiches.json')
    .then(response => response.json())
    .then(data => {
        let menuItems = data;
        displayBreakfastSanwiches(menuItems);
    })
    .catch(error => console.error('Error loading menu:', error));
});

function displayBreakfastSanwiches(items) {
    let menuDiv = document.getElementById('breakfast-sandwiches');
    menuDiv.innerHTML = '';

    items.forEach(item => {
        let div = document.createElement('div');
        let existingItem = userCart
        .filter(cartItem => cartItem.ItemName === item.ItemName)
        .reduce((sum, cartItem) => sum + cartItem.quantity, 0);
        div.className = 'menu-item';
        div.innerHTML = `
                    <style>
                        .item-name a {
                        text-decoration: none;
                        color: black;
                        }
                        .item-name a:hover {
                        color: red;
                        }
                    </style>
                    <div class="item-name">
                        <a href="itemDetails.html?item=${encodeURIComponent(item.ItemName)}" target="_blank">
                        ${item.ItemName}
                        </a>
                    </div>
                    <div class="item-price">$${item.ItemPrice.toFixed(2)}</div>
                    <div class="buttons">
                        <ul>
                            <li onclick="decrease({ItemName: '${item.ItemName}'})" class="button-item"><i class="bi bi-dash"></i></li>
                            <li id="${item.ItemName}" class="quantity">${existingItem}</li>
                            <li onclick='increase(${JSON.stringify(item)})' class="button-item"><i class="bi bi-plus"></i></li>
                        </ul>
                    </div>
                    <img class="item-image" src="${item.ItemImage}" width="250" height="250">
                    `;

        menuDiv.appendChild(div);
    });
}

//THIS IS FOR THE BREAKFAST ITEMS

document.addEventListener("DOMContentLoaded", function() {
  fetch('./MenuDatabase/breakfast.json')
    .then(response => response.json())
    .then(data => {
        let menuItems = data;
        displayBreakfast(menuItems);
    })
    .catch(error => console.error('Error loading menu:', error));
});

function displayBreakfast(items) {
    let menuDiv = document.getElementById('breakfast');
    menuDiv.innerHTML = '';

    items.forEach(item => {
        let div = document.createElement('div');
        let existingItem = userCart
        .filter(cartItem => cartItem.ItemName === item.ItemName)
        .reduce((sum, cartItem) => sum + cartItem.quantity, 0);
        div.className = 'menu-item';
        div.innerHTML = `
                    <style>
                        .item-name a {
                        text-decoration: none;
                        color: black;
                        }
                        .item-name a:hover {
                        color: red;
                        }
                    </style>
                    <div class="item-name">
                        <a href="itemDetails.html?item=${encodeURIComponent(item.ItemName)}" target="_blank">
                        ${item.ItemName}
                        </a>
                    </div>
                    <div class="item-price">$${item.ItemPrice.toFixed(2)}</div>
                    <div class="buttons">
                        <ul>
                            <li onclick="decrease({ ItemName: '${item.ItemName}' })" class="button-item"><i class="bi bi-dash"></i></li>
                            <li id="${item.ItemName}" class="quantity">${existingItem}</li>
                            <li onclick='increase(${JSON.stringify(item)})' class="button-item"><i class="bi bi-plus"></i></li>
                        </ul>
                    </div>
                    <img class="item-image" src="${item.ItemImage}" width="250" height="250">
                    `;
        menuDiv.appendChild(div);
    });
}

//THIS IS FOR THE BREAKFAST SIDES

document.addEventListener("DOMContentLoaded", function() {
  fetch('./MenuDatabase/breakfastSides.json')
    .then(response => response.json())
    .then(data => {
        let menuItems = data;
        displayBreakfastSides(menuItems);
    })
    .catch(error => console.error('Error loading menu:', error));
});

function displayBreakfastSides(items) {
    let menuDiv = document.getElementById('breakfast-sides');
    menuDiv.innerHTML = '';

    items.forEach(item => {
        let div = document.createElement('div');
        let existingItem = userCart
        .filter(cartItem => cartItem.ItemName === item.ItemName)
        .reduce((sum, cartItem) => sum + cartItem.quantity, 0);
        div.className = 'menu-item';
        div.innerHTML = `
                    <style>
                        .item-name a {
                        text-decoration: none;
                        color: black;
                        }
                        .item-name a:hover {
                        color: red;
                        }
                    </style>
                    <div class="item-name">
                        <a href="itemDetails.html?item=${encodeURIComponent(item.ItemName)}" target="_blank">
                        ${item.ItemName}
                        </a>
                    </div>
                    <div class="item-price">$${item.ItemPrice.toFixed(2)}</div>
                    <div class="buttons">
                        <ul>
                            <li onclick="decrease({ ItemName: '${item.ItemName}' })" class="button-item"><i class="bi bi-dash"></i></li>
                            <li id="${item.ItemName}" class="quantity">${existingItem}</li>
                            <li onclick='increase(${JSON.stringify(item)})' class="button-item"><i class="bi bi-plus"></i></li>
                        </ul>
                    </div>
                    <img class="item-image" src="${item.ItemImage}" width="250" height="250">
                    `;

        menuDiv.appendChild(div);
    });
}

//THIS IS FOR THE BAGELS

document.addEventListener("DOMContentLoaded", function() {
  fetch('./MenuDatabase/bagels.json')
    .then(response => response.json())
    .then(data => {
        let menuItems = data;
        displayBagels(menuItems);
    })
    .catch(error => console.error('Error loading menu:', error));
});

function displayBagels(items) {
    let menuDiv = document.getElementById('bagels');
    menuDiv.innerHTML = '';

    items.forEach(item => {
        let div = document.createElement('div');
        let existingItem = userCart
        .filter(cartItem => cartItem.ItemName === item.ItemName)
        .reduce((sum, cartItem) => sum + cartItem.quantity, 0);
        div.className = 'menu-item';
        div.innerHTML = `
                    <style>
                        .item-name a {
                        text-decoration: none;
                        color: black;
                        }
                        .item-name a:hover {
                        color: red;
                        }
                    </style>
                    <div class="item-name">
                        <a href="itemDetails.html?item=${encodeURIComponent(item.ItemName)}" target="_blank">
                        ${item.ItemName}
                        </a>
                    </div>
                    <div class="item-price">$${item.ItemPrice.toFixed(2)}</div>
                    <div class="buttons">
                        <ul>
                            <li onclick="decrease({ ItemName: '${item.ItemName}' })" class="button-item"><i class="bi bi-dash"></i></li>
                            <li id="${item.ItemName}" class="quantity">${existingItem}</li>
                            <li onclick='increase(${JSON.stringify(item)})' class="button-item"><i class="bi bi-plus"></i></li>
                        </ul>
                    </div>
                    <img class="item-image" src="${item.ItemImage}" width="250" height="250">
                    `;

        menuDiv.appendChild(div);
    });
}

//THIS IS FOR THE GRAB AND GO

document.addEventListener("DOMContentLoaded", function() {
  fetch('./MenuDatabase/grabAndGo.json')
    .then(response => response.json())
    .then(data => {
        let menuItems = data;
        displayGrabAndGo(menuItems);
    })
    .catch(error => console.error('Error loading menu:', error));
});

function displayGrabAndGo(items) {
    let menuDiv = document.getElementById('grab-and-go');
    menuDiv.innerHTML = '';

    items.forEach(item => {
        let div = document.createElement('div');
        let existingItem = userCart
        .filter(cartItem => cartItem.ItemName === item.ItemName)
        .reduce((sum, cartItem) => sum + cartItem.quantity, 0);
        div.className = 'menu-item';
        div.innerHTML = `
                    <style>
                        .item-name a {
                        text-decoration: none;
                        color: black;
                        }
                        .item-name a:hover {
                        color: red;
                        }
                    </style>
                    <div class="item-name">
                        <a href="itemDetails.html?item=${encodeURIComponent(item.ItemName)}" target="_blank">
                        ${item.ItemName}
                        </a>
                    </div>
                    <div class="item-price">$${item.ItemPrice.toFixed(2)}</div>
                    <div class="buttons">
                        <ul>
                            <li onclick="decrease({ ItemName: '${item.ItemName}' })" class="button-item"><i class="bi bi-dash"></i></li>
                            <li id="${item.ItemName}" class="quantity">${existingItem}</li>
                            <li onclick='increase(${JSON.stringify(item)})' class="button-item"><i class="bi bi-plus"></i></li>
                        </ul>
                    </div>
                    <img class="item-image" src="${item.ItemImage}" width="250" height="250">
                    `;

        menuDiv.appendChild(div);
    });
}

//THIS IS FOR THE LUNCH BAGELS

document.addEventListener("DOMContentLoaded", function() {
  fetch('./MenuDatabase/lunchbagels.json')
    .then(response => response.json())
    .then(data => {
        let menuItems = data;
        displayLunchBagels(menuItems);
    })
    .catch(error => console.error('Error loading menu:', error));
});

function displayLunchBagels(items) {
    let menuDiv = document.getElementById('lunch-bagels');
    menuDiv.innerHTML = '';

    items.forEach(item => {
        let div = document.createElement('div');
        let existingItem = userCart
        .filter(cartItem => cartItem.ItemName === item.ItemName)
        .reduce((sum, cartItem) => sum + cartItem.quantity, 0);
        div.className = 'menu-item';
        div.innerHTML = `
                    <style>
                        .item-name a {
                        text-decoration: none;
                        color: black;
                        }
                        .item-name a:hover {
                        color: red;
                        }
                    </style>
                    <div class="item-name">
                        <a href="itemDetails.html?item=${encodeURIComponent(item.ItemName)}" target="_blank">
                        ${item.ItemName}
                        </a>
                    </div>
                    <div class="item-price">$${item.ItemPrice.toFixed(2)}</div>
                    <div class="buttons">
                        <ul>
                            <li onclick="decrease({ ItemName: '${item.ItemName}' })" class="button-item"><i class="bi bi-dash"></i></li>
                            <li id="${item.ItemName}" class="quantity">${existingItem}</li>
                            <li onclick='increase(${JSON.stringify(item)})' class="button-item"><i class="bi bi-plus"></i></li>
                        </ul>
                    </div>
                    <img class="item-image" src="${item.ItemImage}" width="250" height="250">
                    `;

        menuDiv.appendChild(div);
    });
}

//THIS IS FOR THE WRAPS

document.addEventListener("DOMContentLoaded", function() {
  fetch('./MenuDatabase/wraps.json')
    .then(response => response.json())
    .then(data => {
        let menuItems = data;
        displayWraps(menuItems);
    })
    .catch(error => console.error('Error loading menu:', error));
});

function displayWraps(items) {
    let menuDiv = document.getElementById('wraps');
    menuDiv.innerHTML = '';

    items.forEach(item => {
        let div = document.createElement('div');
        let existingItem = userCart
        .filter(cartItem => cartItem.ItemName === item.ItemName)
        .reduce((sum, cartItem) => sum + cartItem.quantity, 0);
        div.className = 'menu-item';
        div.innerHTML = `
                    <style>
                        .item-name a {
                        text-decoration: none;
                        color: black;
                        }
                        .item-name a:hover {
                        color: red;
                        }
                    </style>
                    <div class="item-name">
                        <a href="itemDetails.html?item=${encodeURIComponent(item.ItemName)}" target="_blank">
                        ${item.ItemName}
                        </a>
                    </div>
                    <div class="item-price">$${item.ItemPrice.toFixed(2)}</div>
                    <div class="buttons">
                        <ul>
                            <li onclick="decrease({ ItemName: '${item.ItemName}' })" class="button-item"><i class="bi bi-dash"></i></li>
                            <li id="${item.ItemName}" class="quantity">${existingItem}</li>
                            <li onclick='increase(${JSON.stringify(item)})' class="button-item"><i class="bi bi-plus"></i></li>
                        </ul>
                    </div>
                    <img class="item-image" src="${item.ItemImage}" width="450" height="400">
                    `;

        menuDiv.appendChild(div);
    });
}

//THIS IS FOR THE GRILLE

document.addEventListener("DOMContentLoaded", function() {
    fetch('./MenuDatabase/grille.json')
      .then(response => response.json())
      .then(data => {
          let menuItems = data;
          displayGrille(menuItems);
      })
      .catch(error => console.error('Error loading menu:', error));
  });
  
  function displayGrille(items) {
      let menuDiv = document.getElementById('grille');
      menuDiv.innerHTML = '';
  
      items.forEach(item => {
          let div = document.createElement('div');
          let existingItem = userCart
          .filter(cartItem => cartItem.ItemName === item.ItemName)
          .reduce((sum, cartItem) => sum + cartItem.quantity, 0);
          div.className = 'menu-item';
          div.innerHTML = `
                    <style>
                        .item-name a {
                        text-decoration: none;
                        color: black;
                        }
                        .item-name a:hover {
                        color: red;
                        }
                    </style>
                    <div class="item-name">
                        <a href="itemDetails.html?item=${encodeURIComponent(item.ItemName)}" target="_blank">
                        ${item.ItemName}
                        </a>
                    </div>
                    <div class="item-price">$${item.ItemPrice.toFixed(2)}</div>
                    <div class="buttons">
                        <ul>
                            <li onclick="decrease({ ItemName: '${item.ItemName}' })" class="button-item"><i class="bi bi-dash"></i></li>
                            <li id="${item.ItemName}" class="quantity">${existingItem}</li>
                            <li onclick='increase(${JSON.stringify(item)})' class="button-item"><i class="bi bi-plus"></i></li>
                        </ul>
                    </div>
                    <img class="item-image" src="${item.ItemImage}" width="250" height="250">
                    `;
  
          menuDiv.appendChild(div);
      });
  }

  //THIS IS FOR THE PANANIS
  document.addEventListener("DOMContentLoaded", function() {
    fetch('./MenuDatabase/panani.json')
      .then(response => response.json())
      .then(data => {
          let menuItems = data;
          displayPanani(menuItems);
      })
      .catch(error => console.error('Error loading menu:', error));
  });
  
  function displayPanani(items) {
      let menuDiv = document.getElementById('panani');
      menuDiv.innerHTML = '';
  
      items.forEach(item => {
          let div = document.createElement('div');
          let existingItem = userCart
          .filter(cartItem => cartItem.ItemName === item.ItemName)
          .reduce((sum, cartItem) => sum + cartItem.quantity, 0);
          div.className = 'menu-item';
          div.innerHTML = `
                    <style>
                        .item-name a {
                        text-decoration: none;
                        color: black;
                        }
                        .item-name a:hover {
                        color: red;
                        }
                    </style>
                    <div class="item-name">
                        <a href="itemDetails.html?item=${encodeURIComponent(item.ItemName)}" target="_blank">
                        ${item.ItemName}
                        </a>
                    </div>
                    <div class="item-price">$${item.ItemPrice.toFixed(2)}</div>
                    <div class="buttons">
                        <ul>
                            <li onclick="decrease({ ItemName: '${item.ItemName}' })" class="button-item"><i class="bi bi-dash"></i></li>
                            <li id="${item.ItemName}" class="quantity">${existingItem}</li>
                            <li onclick='increase(${JSON.stringify(item)})' class="button-item"><i class="bi bi-plus"></i></li>
                        </ul>
                    </div>
                    <img class="item-image" src="${item.ItemImage}" width="250" height="250">
                    `;
  
          menuDiv.appendChild(div);
      });
  }

  //THIS IS FOR THE TRADITIONAL SANDWICHES
  document.addEventListener("DOMContentLoaded", function() {
    fetch('./MenuDatabase/traditional.json')
      .then(response => response.json())
      .then(data => {
          let menuItems = data;
          displayTraditional(menuItems);
      })
      .catch(error => console.error('Error loading menu:', error));
  });
  
  function displayTraditional(items) {
      let menuDiv = document.getElementById('traditional');
      menuDiv.innerHTML = '';
  
      items.forEach(item => {
          let div = document.createElement('div');
          let existingItem = userCart
          .filter(cartItem => cartItem.ItemName === item.ItemName)
          .reduce((sum, cartItem) => sum + cartItem.quantity, 0);
          div.className = 'menu-item';
          div.innerHTML = `
                    <style>
                        .item-name a {
                        text-decoration: none;
                        color: black;
                        }
                        .item-name a:hover {
                        color: red;
                        }
                        
                    </style>
                    <div class="item-name">
                        <a href="itemDetails.html?item=${encodeURIComponent(item.ItemName)}" target="_blank">
                        ${item.ItemName}
                        </a>
                    </div>
                    <div class="item-price">$${item.ItemPrice.toFixed(2)}</div>
                    <div class="buttons">
                        <ul>
                            <li onclick="decrease({ ItemName: '${item.ItemName}' })" class="button-item"><i class="bi bi-dash"></i></li>
                            <li id="${item.ItemName}" class="quantity">${existingItem}</li>
                            <li onclick='increase(${JSON.stringify(item)})' class="button-item"><i class="bi bi-plus"></i></li>
                        </ul>
                    </div>                    
                    <img class="item-image" src="${item.ItemImage}" width="250" height="250">
                    `;
  
          menuDiv.appendChild(div);
      });
  }

  updateCart();