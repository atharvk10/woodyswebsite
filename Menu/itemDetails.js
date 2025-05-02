function areAllOptionsSelected(id, itemOptions) {
  const selectedOptions = getSelectedOptions(id);
  for (const key in itemOptions) {
    if (!selectedOptions[key]) {
      alert(`Please select a ${key} option.`);
      return false;
    }
  }
  return true;
}


let userCart = JSON.parse(localStorage.getItem("userCart")) || [];

async function loadItems(item, id) {
  const calories = await getCalories(item.ItemIngredients);
  const ingredients = item.ItemIngredients.join(', ');
  const container = document.getElementById(id);
  let existingItem = 0;
  for (let i = 0; i < userCart.length; i++) {
      if (userCart[i].ItemName === item.ItemName &&
        JSON.stringify(userCart[i].options) === JSON.stringify(getSelectedOptions(id))
      ) {
          existingItem = userCart[i].quantity;
          break;
      }
  }


  container.innerHTML = `
    <h1 class="itemName">${item.ItemName}</h1>
    <img class="itemImage" src="${item.ItemImage}" alt="${item.ItemName}">
    <div class="itemDescription">${item.ItemDescription || 'No description available.'}</div>
    <div class="ingredients">Ingredients: ${ingredients}</div>
    <div class="price-and-buttons">
      <div id="princeItem" class="price">Price: $${item.ItemPrice.toFixed(2)}</div>
      <div class="buttons">
        <ul>
          <li class="decrease-btn button-item"><i class="bi bi-dash"></i></li>
          <li id="quantity-${id}" class="quantity">${existingItem}</li>
          <li class="increase-btn button-item"><i class="bi bi-plus"></i></li>
        </ul>
      </div>
    </div>
    <div class="calories">Calories: ${calories} calories</div>
  `;



  let optionsHTML = '';
  if (item.ItemOptions) {
    const optionKeys = Object.keys(item.ItemOptions);
    for (let i = 0; i < optionKeys.length; i++) {
      const key = optionKeys[i];
      const value = item.ItemOptions[key];
      optionsHTML += `<div class="itemOptions">${key}
        <select class="itemOptionsSelections" data-key="${key}">
          <option value="" disabled selected>Select an option</option>`;
      for (let j = 0; j < value.choices.length; j++) {
        const choice = value.choices[j];
        optionsHTML += `<option value="${choice.name}">${choice.name} ($${choice.price.toFixed(2)})</option>`;
      }
      optionsHTML += `</select></div>`;
    }
  }
  container.innerHTML += optionsHTML;



  updatePrice(item, item.ItemPrice, id, item.ItemOptions);
  const decreaseBtn = container.querySelector('.decrease-btn');
const increaseBtn = container.querySelector('.increase-btn');
increaseBtn.onclick = () => increase({ ItemName: item.ItemName }, id, item.ItemOptions);
decreaseBtn.onclick = () => decrease({ ItemName: item.ItemName }, id, item.ItemOptions);

  const selects = container.querySelectorAll('.itemOptionsSelections');
  selects.forEach(select => {
    select.onchange = () => {
      const decreaseBtn = container.querySelector('.decrease-btn');
      const increaseBtn = container.querySelector('.increase-btn');
      increaseBtn.onclick = () => increase({ ItemName: item.ItemName }, id, item.ItemOptions);
      decreaseBtn.onclick = () => decrease({ ItemName: item.ItemName }, id, item.ItemOptions);
      updatePrice(item, item.ItemPrice, id, item.ItemOptions);
    };
  });
}

function updatePrice(item, _, id, ItemOptions) {
  let finalPrice = item.ItemPrice;
  const menuItem = document.getElementById(id);
  const allSelections = menuItem.getElementsByClassName('itemOptionsSelections');
  for (let i = 0; i < allSelections.length; i++) {
    const select = allSelections[i];
    const selectedValue = select.value;
    const key = select.getAttribute("data-key");
    const optionGroup = ItemOptions[key];
    for (let j = 0; j < optionGroup.choices.length; j++) {
      const choice = optionGroup.choices[j];
      if (choice.name === selectedValue) {
        finalPrice += choice.price;
        break;
      }
    }
  }
  const priceUP = document.getElementById("princeItem");
  priceUP.innerHTML = `Price: $${finalPrice.toFixed(2)}`;
}
async function getCalories(ingredients){
  const apiKey = 'yZw91PtqEeP8cfePqMIiqV0rQYSjrHSOJ5getpIV';
  let sumCals = 0;

  for (let i = 0; i < ingredients.length; i++){
    const ingredient = ingredients[i];
    const url = 'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=' + apiKey + '&query=' + encodeURIComponent(ingredient);
    try{
      const databaseResponse = await fetch(url);
      const ingredientData = await databaseResponse.json();
      if (ingredientData.foods){
        const selectedItem = ingredientData.foods[0];
        if (selectedItem.foodNutrients){
          for (let j = 0; j < selectedItem.foodNutrients.length; j++){
            if (selectedItem.foodNutrients[j].nutrientName == "Energy"){
              sumCals += selectedItem.foodNutrients[j].value;
              break;
            }
          }
        }
      }
    }
    catch (error){
      console.error('Error fetching calories for' + ingredient, error);
    }
  }

  sumCals = Math.round(sumCals/4.184);
  return sumCals;
}

function getSelectedOptions(id) {
  const container = document.getElementById(id);
  const selects = container.querySelectorAll('.itemOptionsSelections');
  let selectedOptions = {};
  selects.forEach(select => {
    const key = select.getAttribute('data-key');
    selectedOptions[key] = select.value;
  });
  return selectedOptions;
}

let increase = (itemToAdd, id, itemOptions) => {
  const finalPrice = parseFloat(document.querySelector("#princeItem").textContent.replace("Price: $", ""));
  const selectedOptions = getSelectedOptions(id);
  if (!areAllOptionsSelected(id, itemOptions)) return;
  const cartItem = {
    ItemName: itemToAdd.ItemName,
    price: finalPrice,
    quantity: 1,
    options: selectedOptions,
  };
  let iteminCart = userCart.find(item =>
    item.ItemName === cartItem.ItemName &&
    item.price === cartItem.price &&
    JSON.stringify(item.options) === JSON.stringify(cartItem.options)
  );
  if (iteminCart) {
    iteminCart.quantity += 1;
  } else {
    userCart.push(cartItem);
  }
  localStorage.setItem("userCart", JSON.stringify(userCart));
  updateQuantity(itemToAdd.ItemName, id);
};


let decrease = (itemToAdd, id, itemOptions) => {
  const finalPrice = parseFloat(document.querySelector("#princeItem").textContent.replace("Price: $", ""));
  const selectedOptions = getSelectedOptions(id);
  for (const key in itemOptions) {
    if (!selectedOptions[key]) {
      alert(`Please select a ${key} option before removing.`);
      return;
    }
  }
  const itemIndex = userCart.findIndex(element =>
    element.ItemName === itemToAdd.ItemName &&
    element.price === finalPrice &&
    JSON.stringify(element.options) === JSON.stringify(selectedOptions)
  );
  if (itemIndex === -1) return;
  userCart[itemIndex].quantity -= 1;
  if (userCart[itemIndex].quantity === 0) {
    userCart.splice(itemIndex, 1);
  }
  localStorage.setItem("userCart", JSON.stringify(userCart));
  updateQuantity(itemToAdd.ItemName, id);
};


let updateQuantity = (ItemName, id) => {
  let totalQuantity = 0;
  for (let i = 0; i < userCart.length; i++) {
    if (userCart[i].ItemName === ItemName) {
      totalQuantity += userCart[i].quantity;
    }
  }
  const quantityElement = document.getElementById(`quantity-${id}`);
  if (quantityElement) {
    quantityElement.textContent = totalQuantity;
  }
  updateCart();
};

let updateCart = () => {
  let cartnavbarUP = document.getElementById("cartnavbar");
  let totalCartAmount = 0;
  for (let i = 0; i < userCart.length; ++i) {
    totalCartAmount += userCart[i].quantity;
  }
  cartnavbarUP.innerHTML = totalCartAmount;
};

//THIS IS FOR THE BREAKFAST SANDWICHES
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const itemName = params.get('item');

  fetch('./MenuDatabase/breakfastSandwiches.json')
    .then(response => response.json())
    .then(data => {
      const item = data.find(i => i.ItemName.trim().toLowerCase() === itemName?.trim().toLowerCase());
      if (item) loadItems(item, 'breakfastsandwiches');
    })
    .catch(error => {
      console.error('Error loading item details:', error);
      document.getElementById('breakfastsandwiches').innerHTML = '<p>Error loading item details.</p>';
    });
});

//THIS IS FOR THE BREAKFAST ITEMS
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const itemName = params.get('item');

  fetch('./MenuDatabase/breakfast.json')
    .then(response => response.json())
    .then(data => {
      const item = data.find(i => i.ItemName.trim().toLowerCase() === itemName?.trim().toLowerCase());
      if (item) loadItems(item, 'breakfast'); 
    })
    .catch(error => {
      console.error('Error loading item details:', error);
      document.getElementById('breakfast').innerHTML = '<p>Error loading item details.</p>';
    });
});

//THIS IS FOR THE BREAKFAST SIDES
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const itemName = params.get('item');

  fetch('./MenuDatabase/breakfastSides.json')
    .then(response => response.json())
    .then(data => {
      const item = data.find(i => i.ItemName.trim().toLowerCase() === itemName?.trim().toLowerCase());
      if (item) loadItems(item, 'breakfastsides');
    })
    .catch(error => {
      console.error('Error loading item details:', error);
      document.getElementById('breakfastsides').innerHTML = '<p>Error loading item details.</p>';
    });
});

//THIS IS FOR THE BREAKFAST BAGELS
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const itemName = params.get('item');

  fetch('./MenuDatabase/bagels.json')
    .then(response => response.json())
    .then(data => {
      const item = data.find(i => i.ItemName.trim().toLowerCase() === itemName?.trim().toLowerCase());
      if (item) {
        loadItems(item, 'breakfastbagels');
      } 
    })
    .catch(error => {
      console.error('Error loading item details:', error);
      document.getElementById('breakfastbagels').innerHTML = '<p>Error loading item details.</p>';
    });
});

//THIS IS FOR THE GRAB-AND-GO
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const itemName = params.get('item');

  fetch('./MenuDatabase/grabAndGo.json')
    .then(response => response.json())
    .then(data => {
      const item = data.find(i => i.ItemName.trim().toLowerCase() === itemName?.trim().toLowerCase());
      if (item) {
        loadItems(item, 'grabandgo');
      } 
    })
    .catch(error => {
      console.error('Error loading item details:', error);
      document.getElementById('grabandgo').innerHTML = '<p>Error loading item details.</p>';
    });
});

//THIS IS FOR THE LUNCH BAGELS
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const itemName = params.get('item');

  fetch('./MenuDatabase/lunchbagels.json')
    .then(response => response.json())
    .then(data => {
      const item = data.find(i => i.ItemName.trim().toLowerCase() === itemName?.trim().toLowerCase());
      if (item) {
        loadItems(item, 'lunchbagels');
      } 
    })
    .catch(error => {
      console.error('Error loading item details:', error);
      document.getElementById('lunchbagels').innerHTML = '<p>Error loading item details.</p>';
    });
});

//THIS IS FOR THE WRAPS
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const itemName = params.get('item');

  fetch('./MenuDatabase/wraps.json')
    .then(response => response.json())
    .then(data => {
      const item = data.find(i => i.ItemName.trim().toLowerCase() === itemName?.trim().toLowerCase());
      if (item) {
        loadItems(item, 'wraps');
      } 
    })
    .catch(error => {
      console.error('Error loading item details:', error);
      document.getElementById('wraps').innerHTML = '<p>Error loading item details.</p>';
    });
});

//THIS IS FOR THE GRILLE
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const itemName = params.get('item');

  fetch('./MenuDatabase/grille.json')
    .then(response => response.json())
    .then(data => {
      const item = data.find(i => i.ItemName.trim().toLowerCase() === itemName?.trim().toLowerCase());
      if (item) {
        loadItems(item, 'grille');
      } 
    })
    .catch(error => {
      console.error('Error loading item details:', error);
      document.getElementById('grille').innerHTML = '<p>Error loading item details.</p>';
    });
});

//THIS IS FOR THE PANANI'S
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const itemName = params.get('item');

  fetch('./MenuDatabase/panani.json')
    .then(response => response.json())
    .then(data => {
      const item = data.find(i => i.ItemName.trim().toLowerCase() === itemName?.trim().toLowerCase());
      if (item) {
        loadItems(item, 'pananis');
      } 
    })
    .catch(error => {
      console.error('Error loading item details:', error);
      document.getElementById('pananis').innerHTML = '<p>Error loading item details.</p>';
    });
});

//THIS IS FOR THE TRADITIONAL SANDWICHES
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const itemName = params.get('item');

  fetch('./MenuDatabase/traditional.json')
    .then(response => response.json())
    .then(data => {
      const item = data.find(i => i.ItemName.trim().toLowerCase() === itemName?.trim().toLowerCase());
      if (item) {
        loadItems(item, 'traditional');
      } 
    })
    .catch(error => {
      console.error('Error loading item details:', error);
      document.getElementById('traditional').innerHTML = '<p>Error loading item details.</p>';
    });
});

updateCart();

