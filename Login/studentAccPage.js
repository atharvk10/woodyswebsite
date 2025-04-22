document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("netid").textContent = localStorage.getItem("netid");
    document.getElementById("mealSwipes").textContent = localStorage.getItem("num_meal_swipes");
    document.getElementById("retailSwipes").textContent = localStorage.getItem("retail_swipes");
});