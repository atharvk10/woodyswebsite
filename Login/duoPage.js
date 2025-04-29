document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('approveBtn').addEventListener('click', () => {
        const pendingUser = JSON.parse(localStorage.getItem('pendingDUOUser'));
        if (pendingUser) {
            localStorage.setItem('loggedInUser', JSON.stringify(pendingUser));
            localStorage.removeItem('pendingDUOUser');
            window.location.href = '../Home/homePage.html'; //after duo approval, redirect to homepage 
        } else {
            window.location.href = '../Login/loginPage.html'; 
        }
    });

    document.getElementById('denyBtn').addEventListener('click', () => {
        alert('DUO Authentication Denied. Returning to login.');
        window.location.href = '../Login/loginPage.html';
    });
});