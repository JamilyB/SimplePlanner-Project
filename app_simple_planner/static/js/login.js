document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const formError = document.getElementById('formError');

    loginForm.addEventListener('submit', function (event) {
        let valid = true;

        // Reset errors
        usernameError.textContent = '';
        passwordError.textContent = '';
        formError.textContent = '';

        // Validate username
        if (usernameInput.value.trim() === '') {
            valid = false;
            usernameError.textContent = 'Username is required';
        }

        // Validate password
        if (passwordInput.value.trim() === '') {
            valid = false;
            passwordError.textContent = 'Password is required';
        }

        if (!valid) {
            formError.textContent = 'Please fix the errors above and try again';
            event.preventDefault();
        }
    });
});
