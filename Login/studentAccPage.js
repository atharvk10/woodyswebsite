document.addEventListener('DOMContentLoaded', () => {
   
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (user) {
        document.getElementById('welcomeMessage').textContent = `Welcome, ${user.netid}!`;
        document.getElementById('mealSwipes').textContent = user.num_meal_swipes;
        document.getElementById('retailSwipes').textContent = user.retail_swipes;
        document.getElementById('rewardPoints').textContent = user.reward_points;
    } else {
        window.location.href = 'loginPage.html';
    }

    // Rewards system
    const redeemButton = document.getElementById('redeemButton');
    const rewardMessage = document.getElementById('rewardMessage');

    redeemButton.addEventListener('click', () => {
        let user = JSON.parse(localStorage.getItem('loggedInUser'));

        if (!user) {
            alert("You must be logged in to redeem rewards!");
            return;
        }

        if (user.reward_points >= 10) {
            
            user.reward_points -= 10;

            localStorage.setItem('loggedInUser', JSON.stringify(user));

            document.getElementById('rewardPoints').textContent = user.reward_points;
            rewardMessage.textContent = '🎉 Reward Redeemed Successfully!';
            rewardMessage.style.color = 'green';
        } else {
            rewardMessage.textContent = '❌ Not enough points to redeem!';
            rewardMessage.style.color = 'red';
        }
    });

    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('netid');
        localStorage.removeItem('loggedInUser');
        window.location.href = '../Login/loginPage.html'; 
    });
});