// app.js
import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

window.login = async function () {
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");
  try {
    await signInWithEmailAndPassword(auth, email, password);
    // Redirect directly without showing success alert
    window.location.href = "tracker.html";
  } catch (error) {
    console.error(error);
    
    // Provide user-friendly error messages based on error code
    let errorMessage = "An error occurred during login. Please try again.";
    
    switch(error.code) {
      case 'auth/invalid-email':
        errorMessage = "The email address is not valid. Please check and try again.";
        break;
      case 'auth/user-disabled':
        errorMessage = "This account has been disabled. Please contact support.";
        break;
      case 'auth/user-not-found':
        errorMessage = "No account found with this email. Please check or create a new account.";
        break;
      case 'auth/wrong-password':
        errorMessage = "Incorrect password. Please try again.";
        break;
      case 'auth/invalid-login-credentials':
        errorMessage = "Invalid login credentials. Please check your email and password.";
        break;
      case 'auth/too-many-requests':
        errorMessage = "Too many unsuccessful login attempts. Please try again later.";
        break;
      case 'auth/network-request-failed':
        errorMessage = "Network error. Please check your internet connection.";
        break;
    }
    
    alert(errorMessage);
  }
};
