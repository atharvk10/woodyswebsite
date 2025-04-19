function loadItems(item) {
  const container = document.getElementById('itemDetails');
  container.innerHTML = `
    <h1 class = "itemName">${item.ItemName}</h1>
    <div class="itemDescription">${item.ItemDescription || 'No description available.'}</div>
    <div class="price">Price: $${item.ItemPrice.toFixed(2)}</div>
    <img class = "itemImage" src="${item.ItemImage}" alt="${item.ItemName}">
    `;
}

//THIS IS FOR THE BREAKFAST SANDWICHES
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const itemName = params.get('item');

  fetch('./MenuDatabase/breakfastSandwiches.json')
    .then(response => response.json())
    .then(data => {
      const item = data.find(i => i.ItemName.trim().toLowerCase() === itemName?.trim().toLowerCase());
      if (item) {
        loadItems(item);
      } else {
        document.getElementById('itemDetails').innerHTML = '<p>Item not found.</p>';
      }
    })
    .catch(error => {
      console.error('Error loading item details:', error);
      document.getElementById('itemDetails').innerHTML = '<p>Error loading item details.</p>';
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
      if (item) {
        loadItems(item);
      } else {
        document.getElementById('itemDetails').innerHTML = '<p>Item not found.</p>';
      }
    })
    .catch(error => {
      console.error('Error loading item details:', error);
      document.getElementById('itemDetails').innerHTML = '<p>Error loading item details.</p>';
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
      if (item) {
        loadItems(item);
      } else {
        document.getElementById('itemDetails').innerHTML = '<p>Item not found.</p>';
      }
    })
    .catch(error => {
      console.error('Error loading item details:', error);
      document.getElementById('itemDetails').innerHTML = '<p>Error loading item details.</p>';
    });
});

//THIS IS FOR THE BREAKFAST BAGELS
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const itemName = params.get('item');

  fetch('./MenuDatabase/bagels.json')
    .then(response => response.json())
    .then(data => {
      const item = data.find(i => i.ItemName === itemName);
      if (item) {
        loadItems(item);
      } else {
        document.getElementById('itemDetails').innerHTML = '<p>Item not found.</p>';
      }
    })
    .catch(error => {
      console.error('Error loading item details:', error);
      document.getElementById('itemDetails').innerHTML = '<p>Error loading item details.</p>';
    });
});

//THIS IS FOR THE GRAB-AND-GO
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const itemName = params.get('item');

  fetch('./MenuDatabase/grabAndGo.json')
    .then(response => response.json())
    .then(data => {
      const item = data.find(i => i.ItemName === itemName);
      if (item) {
        loadItems(item);
      } else {
        document.getElementById('itemDetails').innerHTML = '<p>Item not found.</p>';
      }
    })
    .catch(error => {
      console.error('Error loading item details:', error);
      document.getElementById('itemDetails').innerHTML = '<p>Error loading item details.</p>';
    });
});

//THIS IS FOR THE LUNCH BAGELS
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const itemName = params.get('item');

  fetch('./MenuDatabase/bagels.json')
    .then(response => response.json())
    .then(data => {
      const item = data.find(i => i.ItemName === itemName);
      if (item) {
        loadItems(item);
      } else {
        document.getElementById('itemDetails').innerHTML = '<p>Item not found.</p>';
      }
    })
    .catch(error => {
      console.error('Error loading item details:', error);
      document.getElementById('itemDetails').innerHTML = '<p>Error loading item details.</p>';
    });
});

//THIS IS FOR THE WRAPS
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const itemName = params.get('item');

  fetch('./MenuDatabase/wraps.json')
    .then(response => response.json())
    .then(data => {
      const item = data.find(i => i.ItemName === itemName);
      if (item) {
        loadItems(item);
      } else {
        document.getElementById('itemDetails').innerHTML = '<p>Item not found.</p>';
      }
    })
    .catch(error => {
      console.error('Error loading item details:', error);
      document.getElementById('itemDetails').innerHTML = '<p>Error loading item details.</p>';
    });
});

//THIS IS FOR THE GRILLE
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const itemName = params.get('item');

  fetch('./MenuDatabase/grille.json')
    .then(response => response.json())
    .then(data => {
      const item = data.find(i => i.ItemName === itemName);
      if (item) {
        loadItems(item);
      } else {
        document.getElementById('itemDetails').innerHTML = '<p>Item not found.</p>';
      }
    })
    .catch(error => {
      console.error('Error loading item details:', error);
      document.getElementById('itemDetails').innerHTML = '<p>Error loading item details.</p>';
    });
});

//THIS IS FOR THE PANANI'S
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const itemName = params.get('item');

  fetch('./MenuDatabase/panani.json')
    .then(response => response.json())
    .then(data => {
      const item = data.find(i => i.ItemName === itemName);
      if (item) {
        loadItems(item);
      } else {
        document.getElementById('itemDetails').innerHTML = '<p>Item not found.</p>';
      }
    })
    .catch(error => {
      console.error('Error loading item details:', error);
      document.getElementById('itemDetails').innerHTML = '<p>Error loading item details.</p>';
    });
});

//THIS IS FOR THE TRADITIONAL SANDWICHES
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const itemName = params.get('item');

  fetch('./MenuDatabase/traditional.json')
    .then(response => response.json())
    .then(data => {
      const item = data.find(i => i.ItemName === itemName);
      if (item) {
        loadItems(item);
      } else {
        document.getElementById('itemDetails').innerHTML = '<p>Item not found.</p>';
      }
    })
    .catch(error => {
      console.error('Error loading item details:', error);
      document.getElementById('itemDetails').innerHTML = '<p>Error loading item details.</p>';
    });
});





