document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.getElementById('signup-form');
    const signinForm = document.getElementById('signin-form');
  
    signupForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const age = document.getElementById('age').value;
      const country = document.getElementById('country').value;
      // Here you can handle the sign-up process, e.g., send data to server
      console.log("Signed up:", { name, email, password, age, country });
    });
  
    signinForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const email = document.getElementById('signin-email').value;
      const password = document.getElementById('signin-password').value;
      // Here you can handle the sign-in process, e.g., send data to server
      console.log("Signed in:", { email, password });
    });
  });
  