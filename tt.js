function startGame() {
    // Prompt the user to choose between sign-up and sign-in
    var choice = prompt("Welcome to the hacking mini-game! Do you want to sign up or sign in?\nEnter 'sign up' or 'sign in'.");
  
    // Redirect the user based on their choice
    if (choice === "sign up") {
      window.location.href = "sign_up.html"; // Redirect to the sign-up page
    } else if (choice === "sign in") {
      window.location.href = "sign_in.html"; // Redirect to the sign-in page
    } else {
      alert("Invalid choice. Please enter 'sign up' or 'sign in'.");
    }
  }
