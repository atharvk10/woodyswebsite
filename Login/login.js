document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const netidInput = document.getElementById('netid').value.trim();
        const passwordInput = document.getElementById('password').value.trim();

        const user = users.find(
            (u) => u.netid === netidInput && u.password === passwordInput
        );

        if (user) {
            localStorage.setItem("netid", user.netid);
            localStorage.setItem("num_meal_swipes", user.num_meal_swipes);
            localStorage.setItem("retail_swipes", user.retail_swipes);
            
            window.location.href = '../Home/homePage.html';
        }else{
            alert('Invalid NetID or Password. Please try again');
            window.location.href = '../Login/loginPage.html';
        }
    });
});