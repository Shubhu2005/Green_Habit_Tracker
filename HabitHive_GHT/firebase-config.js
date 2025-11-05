// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBy4SPY3pzsmkA2CiIpdIobLJ8s5r_p6Sg",
  authDomain: "greenhabittracker-d8e88.firebaseapp.com",
  projectId: "greenhabittracker-d8e88",
  storageBucket: "greenhabittracker-d8e88.firebaseapp.com",
  messagingSenderId: "839404902152",
  appId: "1:839404902152:web:382bff20d9782ad0ecbebd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
