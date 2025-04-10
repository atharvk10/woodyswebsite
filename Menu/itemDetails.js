document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const itemName = params.get('item');

    fetch('./MenuDatabase/breakfastSandwiches.json')
      .then(response => response.json())
      .then(data => {
        const item = data.find(i => i.ItemName === itemName);
        if (item) {
            loadBreakfastSandwichDetails(item);
        } else {
          document.getElementById('item-details').innerHTML = '<p>Item not found.</p>';
        }
      })
      .catch(error => {
        console.error('Error loading item details:', error);
        document.getElementById('item-details').innerHTML = '<p>Error loading item details.</p>';
      });
  });

  function loadBreakfastSandwichDetails(item) {
    const container = document.getElementById('item-details');
    container.innerHTML = `
      <h1 class = "itemName">${item.ItemName}</h1>
       <div class="itemDescription">${item.ItemDescription || 'No description available.'}</div>
        <div class="price">Price: $${item.ItemPrice.toFixed(2)}</div>
       <img class = "itemImage" src="${item.ItemImage}" alt="${item.ItemName}">
    `;
  }

  /*

      
     
      <a href="index.html" class="back">← Back to menu</a>
  */