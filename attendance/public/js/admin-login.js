// 📁 public/js/admin-login.js
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { app } from "../js/firebase-config.js"; // ✅ if you're in a subfolder


const auth = getAuth(app);
const db = getFirestore(app);

window.adminLogin = async function () {
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const docRef = doc(db, "admins", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      localStorage.setItem("adminEmail", email);
      window.location.href = "admin.html";
    } else {
      alert("❌ You are not authorized as an admin.");
    }
  } catch (error) {
    alert("Login failed: " + error.message);
  }
};
