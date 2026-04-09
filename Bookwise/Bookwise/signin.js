document.addEventListener('DOMContentLoaded', function() {
    const signInForm = document.getElementById('signInForm');

    signInForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting the traditional way

        const mailId = document.getElementById('mailId').value;
        const password = document.getElementById('password').value;

        // Simulate sign-in process (you should validate credentials with your backend)
        if (mailId && password) {
            localStorage.setItem('isSignedIn', 'true');
            localStorage.setItem('mailId', mailId); // Store username for later use
            // Redirect to the home page after sign-in
            window.location.href = 'home.html';
        } else {
            alert('Please enter both username and password.');
        }
    });
});

