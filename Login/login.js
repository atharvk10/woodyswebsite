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
            localStorage.setItem('pendingDUOUser', JSON.stringify(user));

            window.location.href = 'duoPage.html';
        }else{
            alert('Invalid NetID or Password. Please try again');
            window.location.href = '../Login/loginPage.html';
        }
    });
});