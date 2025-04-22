async function loadItems(item, id) {
  const calories = await getCalories(item.ItemIngredients);
  const ingredients = item.ItemIngredients.join(', ');
  const container = document.getElementById(id);
  container.innerHTML = `
    <h1 class = "itemName">${item.ItemName}</h1>
    <img class = "itemImage" src="${item.ItemImage}" alt="${item.ItemName}">
    <div class="itemDescription">${item.ItemDescription || 'No description available.'}</div>
    <div class="price">Price: $${item.ItemPrice.toFixed(2)}</div>
    <div class="calories">Calories: ${calories} calories</div>
    <div class="ingredients">Ingredients: ${ingredients}</div>
    `;
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

  fetch('./MenuDatabase/bagels.json')
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





