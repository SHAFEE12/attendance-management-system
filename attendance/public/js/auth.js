// 📁 public/js/auth.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

import { firebaseConfig } from "../js/firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔐 Login Function
window.login = function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    return alert("Please enter email and password.");
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert("❌ Login failed: " + error.message);
    });
};

// 🔁 Reset Password Function
window.resetPassword = function () {
  const email = document.getElementById("email").value.trim();
  if (!email) {
    return alert("Enter email to reset password.");
  }

  sendPasswordResetEmail(auth, email)
    .then(() => alert("📧 Password reset email sent!"))
    .catch((error) => alert("Error: " + error.message));
};
