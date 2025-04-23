document.addEventListener('DOMContentLoaded', () => {
    const swipeButton = document.getElementById('payWithSwipeBtn');
    const swipeStatus = document.getElementById('swipeStatus');

    // Retrieve current user info from localStorage
    let netid = localStorage.getItem('netid');
    let numMealSwipes = parseInt(localStorage.getItem('num_meal_swipes'));

    // Display current swipes
    const updateSwipeDisplay = () => {
        document.getElementById('mealSwipesCount').textContent = numMealSwipes;
    };

    updateSwipeDisplay();

    swipeButton.addEventListener('click', () => {
        if (numMealSwipes > 0) {
            numMealSwipes -= 1;
            localStorage.setItem('num_meal_swipes', numMealSwipes);
            swipeStatus.textContent = `Payment successful! Swipes remaining: ${numMealSwipes}`;
            swipeStatus.style.color = "green";
            updateSwipeDisplay();
        } else {
            swipeStatus.textContent = "Not enough meal swipes!";
            swipeStatus.style.color = "red";
        }
    });
});
