function smoothScrollToSection(event, sectionID) {
  event.preventDefault();
  const element = document.getElementById(sectionID);
  if(element) {
    element.scrollIntoView({behavior: "smooth"})
  }
}


//THIS IS FOR BREAKFAST SANDWICHES

document.addEventListener("DOMContentLoaded", function() {
  fetch('./MenuDatabase/breakfastSandwiches.json')
    .then(response => response.json())
    .then(data => {
        menuItems = data;
        displayBreakfastSanwiches(menuItems);
    })
    .catch(error => console.error('Error loading menu:', error));
});

function displayBreakfastSanwiches(items) {
    let menuDiv = document.getElementById('breakfast-sandwiches');
    menuDiv.innerHTML = '';

    items.forEach(item => {
        let div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `<div class = "item-name"> <a style = "text-decoration: none" href="itemDetails.html?item=${encodeURIComponent(item.ItemName)}"target = "_blank"> ${item.ItemName} <a> <br> </div>
                        <div class = "item-price">$${item.ItemPrice.toFixed(2)} </div> <br>
                        <img class = "item-image" src = "${item.ItemImage}" width = "250" height = "250"> 
                        `;
        menuDiv.appendChild(div);
    });
}

//THIS IS FOR THE BREAKFAST ITEMS

document.addEventListener("DOMContentLoaded", function() {
  fetch('./MenuDatabase/breakfast.json')
    .then(response => response.json())
    .then(data => {
        menuItems = data;
        displayBreakfast(menuItems);
    })
    .catch(error => console.error('Error loading menu:', error));
});

function displayBreakfast(items) {
    let menuDiv = document.getElementById('breakfast');
    menuDiv.innerHTML = '';

    items.forEach(item => {
        let div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `<div class = "item-name"> <a style = "text-decoration: none" href="itemDetails.html?item=${encodeURIComponent(item.ItemName)}"target = "_blank"> ${item.ItemName} <a> <br> </div>
                        <div class = "item-price">$${item.ItemPrice.toFixed(2)} </div> <br>
                        <img class = "item-image" src = "${item.ItemImage}" width = "250" height = "250"> 
                        `;
        menuDiv.appendChild(div);
    });
}

//THIS IS FOR THE BREAKFAST SIDES

document.addEventListener("DOMContentLoaded", function() {
  fetch('./MenuDatabase/breakfastSides.json')
    .then(response => response.json())
    .then(data => {
        menuItems = data;
        displayBreakfastSides(menuItems);
    })
    .catch(error => console.error('Error loading menu:', error));
});

function displayBreakfastSides(items) {
    let menuDiv = document.getElementById('breakfast-sides');
    menuDiv.innerHTML = '';

    items.forEach(item => {
        let div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `<div class = "item-name"> <a style = "text-decoration: none" href="itemDetails.html?item=${encodeURIComponent(item.ItemName)}"target = "_blank"> ${item.ItemName} <a> <br> </div>
                        <div class = "item-price">$${item.ItemPrice.toFixed(2)} </div> <br>
                        <img class = "item-image" src = "${item.ItemImage}" width = "250" height = "250"> 
                        `;

        menuDiv.appendChild(div);
    });
}

//THIS IS FOR THE BAGELS

document.addEventListener("DOMContentLoaded", function() {
  fetch('./MenuDatabase/bagels.json')
    .then(response => response.json())
    .then(data => {
        menuItems = data;
        displayBagels(menuItems);
    })
    .catch(error => console.error('Error loading menu:', error));
});

function displayBagels(items) {
    let menuDiv = document.getElementById('bagels');
    menuDiv.innerHTML = '';

    items.forEach(item => {
        let div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `<div class = "item-name"> <a style = "text-decoration: none" href="itemDetails.html?item=${encodeURIComponent(item.ItemName)}"target = "_blank"> ${item.ItemName} <a> <br> </div>
                        <div class = "item-price">$${item.ItemPrice.toFixed(2)} </div> <br>
                        <img class = "item-image" src = "${item.ItemImage}" width = "250" height = "250"> 
                        `;

        menuDiv.appendChild(div);
    });
}

//THIS IS FOR THE GRAB AND GO

document.addEventListener("DOMContentLoaded", function() {
  fetch('./MenuDatabase/grabAndGo.json')
    .then(response => response.json())
    .then(data => {
        menuItems = data;
        displayGrabAndGo(menuItems);
    })
    .catch(error => console.error('Error loading menu:', error));
});

function displayGrabAndGo(items) {
    let menuDiv = document.getElementById('grab-and-go');
    menuDiv.innerHTML = '';

    items.forEach(item => {
        let div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `<div class = "item-name"> <a style = "text-decoration: none" href="itemDetails.html?item=${encodeURIComponent(item.ItemName)}"target = "_blank"> ${item.ItemName} <a> <br> </div>
                        <div class = "item-price">$${item.ItemPrice.toFixed(2)} </div> <br>
                        <img class = "item-image" src = "${item.ItemImage}" width = "250" height = "250"> 
                        `;

        menuDiv.appendChild(div);
    });
}

//THIS IS FOR THE LUNCH BAGELS

document.addEventListener("DOMContentLoaded", function() {
  fetch('./MenuDatabase/bagels.json')
    .then(response => response.json())
    .then(data => {
        menuItems = data;
        displayLunchBagels(menuItems);
    })
    .catch(error => console.error('Error loading menu:', error));
});

function displayLunchBagels(items) {
    let menuDiv = document.getElementById('lunch-bagels');
    menuDiv.innerHTML = '';

    items.forEach(item => {
        let div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `<div class = "item-name"> <a style = "text-decoration: none" href="itemDetails.html?item=${encodeURIComponent(item.ItemName)}"target = "_blank"> ${item.ItemName} <a> <br> </div>
                        <div class = "item-price">$${item.ItemPrice.toFixed(2)} </div> <br>
                        <img class = "item-image" src = "${item.ItemImage}" width = "250" height = "250"> 
                        `;

        menuDiv.appendChild(div);
    });
}

//THIS IS FOR THE WRAPS

document.addEventListener("DOMContentLoaded", function() {
  fetch('./MenuDatabase/wraps.json')
    .then(response => response.json())
    .then(data => {
        menuItems = data;
        displayWraps(menuItems);
    })
    .catch(error => console.error('Error loading menu:', error));
});

function displayWraps(items) {
    let menuDiv = document.getElementById('wraps');
    menuDiv.innerHTML = '';

    items.forEach(item => {
        let div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `<div class = "item-name"> <a target = "_blank"> ${item.ItemName} <a> <br> </div>
                        <div class="item-price">$${item.ItemPrice.toFixed(2)}</div> <br>
                        <img class = "item-image" src = "${item.ItemImage}" width = "450" height = "400"> 
                        `;

        menuDiv.appendChild(div);
    });
}

//THIS IS FOR THE GRILLE

document.addEventListener("DOMContentLoaded", function() {
    fetch('./MenuDatabase/grille.json')
      .then(response => response.json())
      .then(data => {
          menuItems = data;
          displayGrille(menuItems);
      })
      .catch(error => console.error('Error loading menu:', error));
  });
  
  function displayGrille(items) {
      let menuDiv = document.getElementById('grille');
      menuDiv.innerHTML = '';
  
      items.forEach(item => {
          let div = document.createElement('div');
          div.className = 'menu-item';
          div.innerHTML = `<div class = "item-name"> <a style = "text-decoration: none" href="itemDetails.html?item=${encodeURIComponent(item.ItemName)}"target = "_blank"> ${item.ItemName} <a> <br> </div>
                        <div class = "item-price">$${item.ItemPrice.toFixed(2)} </div> <br>
                        <img class = "item-image" src = "${item.ItemImage}" width = "250" height = "250"> 
                        `;
  
          menuDiv.appendChild(div);
      });
  }

  //THIS IS FOR THE PANANIS
  document.addEventListener("DOMContentLoaded", function() {
    fetch('./MenuDatabase/panani.json')
      .then(response => response.json())
      .then(data => {
          menuItems = data;
          displayPanani(menuItems);
      })
      .catch(error => console.error('Error loading menu:', error));
  });
  
  function displayPanani(items) {
      let menuDiv = document.getElementById('panani');
      menuDiv.innerHTML = '';
  
      items.forEach(item => {
          let div = document.createElement('div');
          div.className = 'menu-item';
          div.innerHTML = `<div class = "item-name"> <a style = "text-decoration: none" href="itemDetails.html?item=${encodeURIComponent(item.ItemName)}"target = "_blank"> ${item.ItemName} <a> <br> </div>
                        <div class = "item-price">$${item.ItemPrice.toFixed(2)} </div> <br>
                        <img class = "item-image" src = "${item.ItemImage}" width = "250" height = "250"> 
                        `;
  
          menuDiv.appendChild(div);
      });
  }

  //THIS IS FOR THE TRADITIONAL SANDWICHES
  document.addEventListener("DOMContentLoaded", function() {
    fetch('./MenuDatabase/traditional.json')
      .then(response => response.json())
      .then(data => {
          menuItems = data;
          displayTraditional(menuItems);
      })
      .catch(error => console.error('Error loading menu:', error));
  });
  
  function displayTraditional(items) {
      let menuDiv = document.getElementById('traditional');
      menuDiv.innerHTML = '';
  
      items.forEach(item => {
          let div = document.createElement('div');
          div.className = 'menu-item';
          div.innerHTML = `<div class = "item-name"> <a style = "text-decoration: none" href="itemDetails.html?item=${encodeURIComponent(item.ItemName)}"target = "_blank"> ${item.ItemName} <a> <br> </div>
                        <div class = "item-price">$${item.ItemPrice.toFixed(2)} </div> <br>
                        <img class = "item-image" src = "${item.ItemImage}" width = "250" height = "250"> 
                        `;
  
          menuDiv.appendChild(div);
      });
  }

  
  

  //I am creating a website that holds menu items. I have individual cards for each menu item on the website. If i click on the card, I want a new HTML page that shows more information about that item. how would i do that? I don't want to make HTML pages for each menu item