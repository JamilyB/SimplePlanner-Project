document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        clearErrors();

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password1 = document.getElementById('password1').value.trim();
        const password2 = document.getElementById('password2').value.trim();
        let valid = true;

        if (username === '') {
            showError('usernameError', 'Username is required');
            valid = false;
        }

        if (email === '') {
            showError('emailError', 'Email is required');
            valid = false;
        } else if (!validateEmail(email)) {
            showError('emailError', 'Invalid email format');
            valid = false;
        }

        if (password1 === '') {
            showError('password1Error', 'Password is required');
            valid = false;
        }

        if (password2 === '') {
            showError('password2Error', 'Confirm password is required');
            valid = false;
        } else if (password1 !== password2) {
            showError('password2Error', 'Passwords do not match');
            valid = false;
        }

        if (valid) {
            form.submit();
        }
    });

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error');
        errorElements.forEach(function(element) {
            element.style.display = 'none';
            element.textContent = '';
        });
    }

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }
});
