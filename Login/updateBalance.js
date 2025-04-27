document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formbody');
    const swipeStatus = document.createElement('p');
    form.appendChild(swipeStatus);

    // Retrieve current user info from localStorage
    let netid = localStorage.getItem('netid');
    let numMealSwipes = parseInt(localStorage.getItem('num_meal_swipes')) || 0;

    // Display current swipes
    const showSwipes = () => {
        document.getElementById('mealSwipesCount');
        if (display) {
            display.textContent = numMealSwipes;
        }
    };

    showSwipes();

    form.addEventListener('submit', (e) => {
        const paymentType = document.querySelector('input[name = "paymentType"]:checked')?.value;
        if (paymentType === "mealswipe") {
            if (numMealSwipes > 0) {
                numMealSwipes -= 1;
                localStorage.setItem('num_meal_swipes', numMealSwipes);
                swipeStatus.textContent = `Payment successful! Swipes remaining: ${numMealSwipes}`;
                swipeStatus.style.color = "green";
                showSwipes();
            } else {
                swipeStatus.textContent = "Not enough meal swipes!";
                swipeStatus.style.color = "red";
            }
        }
    })
});
