// signup.js
import { auth, db } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

import {
  setDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

window.signUp = async function () {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, { displayName: name });

    // Create Firestore user document
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      name: name,
      email: email,
      badges: {
        firstLog: false,
        threeDays: false,
        sevenDays: false,
        transportMaster: false,
        habitMaster: false,
        planetSaver: false
      }
    });

    // Redirect directly without showing success alert
    window.location.href = "tracker.html";

  } catch (error) {
    console.error(error);
    
    // Provide user-friendly error messages based on error code
    let errorMessage = "An error occurred during signup. Please try again.";
    
    switch(error.code) {
      case 'auth/email-already-in-use':
        errorMessage = "This email address is already in use. Please use a different email or try logging in.";
        break;
      case 'auth/invalid-email':
        errorMessage = "The email address is not valid. Please enter a valid email.";
        break;
      case 'auth/operation-not-allowed':
        errorMessage = "Email/password accounts are not enabled. Please contact support.";
        break;
      case 'auth/weak-password':
        errorMessage = "The password is too weak. Please use a stronger password.";
        break;
      case 'auth/network-request-failed':
        errorMessage = "Network error. Please check your internet connection.";
        break;
    }
    
    alert(errorMessage);
  }
};
