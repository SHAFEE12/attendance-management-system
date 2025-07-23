import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDzw_YJT9GJF5YUZxkCdpcWRTkxYMVDQC0",
  authDomain: "attendance-management-sy-6b67c.firebaseapp.com",
  projectId: "attendance-management-sy-6b67c",
  storageBucket: "attendance-management-sy-6b67c.appspot.com",
  messagingSenderId: "300371809330",
  appId: "1:300371809330:web:6c4be3cd92c934f944182b",
  measurementId: "G-3NB4MJPQE4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Create Teacher Account
window.createTeacher = async function () {
  const name = document.getElementById("teacherName").value.trim();
  const email = document.getElementById("teacherEmail").value.trim();
  const password = document.getElementById("teacherPassword").value.trim();

  if (!name || !email || !password) {
    alert("Please fill all fields.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "teachers", user.uid), {
      name,
      email,
      createdAt: serverTimestamp()
    });

    alert("✅ Teacher created successfully!");
    document.getElementById("teacherName").value = "";
    document.getElementById("teacherEmail").value = "";
    document.getElementById("teacherPassword").value = "";
  } catch (error) {
    alert("Error: " + error.message);
  }
};

// ✅ Show All Registered Teachers
window.listTeachers = async function () {
  const querySnapshot = await getDocs(collection(db, "teachers"));
  const teacherList = document.getElementById("teacherList");
  teacherList.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const li = document.createElement("li");
    li.textContent = `${data.name} (${data.email})`;
    teacherList.appendChild(li);
  });
};


