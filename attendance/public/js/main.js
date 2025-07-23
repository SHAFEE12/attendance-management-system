// 📁 js/main.js
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { app } from "../js/firebase-config.js"; // ✅ if you're in a subfolder


const auth = getAuth(app);

// ✅ Login Function
window.login = function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      // ✅ Redirect to dashboard if successful
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert("❌ Login failed: " + error.message);
    });
};

// ✅ Reset Password
window.resetPassword = function () {
  const email = document.getElementById("email").value.trim();
  if (!email) {
    alert("Please enter your email to reset password.");
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("✅ Password reset email sent.");
    })
    .catch((error) => {
      alert("❌ Error: " + error.message);
    });
};
