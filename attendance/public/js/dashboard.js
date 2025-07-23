// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
// import {
//   getFirestore, collection, addDoc, getDocs, doc, setDoc, getDoc
// } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
// import {
//   getAuth, onAuthStateChanged, signOut
// } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// import { firebaseConfig } from "../js/firebase-config.js";

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth(app);

// const form = document.getElementById("addStudentForm");
// const tableBody = document.querySelector("#studentTable tbody");
// const attendanceDate = document.getElementById("attendanceDate");

// let currentUser;
// let studentList = [];

// attendanceDate.max = new Date().toISOString().split("T")[0]; // Prevent future dates

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     currentUser = user;
//     loadStudents();
//   } else {
//     window.location.href = "index.html";
//   }
// });

// // 🟢 Add Student
// form.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const name = document.getElementById("name").value;
//   const registration = document.getElementById("registration").value;
//   const semester = document.getElementById("semester").value;
//   const subject = document.getElementById("subject").value;

//   await addDoc(collection(db, "students"), {
//     name,
//     registration,
//     semester,
//     subject,
//     addedBy: currentUser.uid,
//     createdAt: new Date()
//   });

//   form.reset();
//   loadStudents();
// });

// // 🟢 Load Students
// attendanceDate.addEventListener("change", loadStudents);

// async function loadStudents() {
//   const selectedDate = attendanceDate.value;
//   if (!selectedDate) return;

//   const querySnapshot = await getDocs(collection(db, "students"));
//   tableBody.innerHTML = "";
//   studentList = [];

//   for (const docSnap of querySnapshot.docs) {
//     const data = docSnap.data();
//     if (data.addedBy === currentUser.uid) {
//       studentList.push({ ...data, id: docSnap.id });
//     }
//   }

//   for (const student of studentList) {
//     const attendanceDoc = doc(db, `attendance/${student.semester}_${student.subject}/${selectedDate}/${student.id}`);
//     const snapshot = await getDoc(attendanceDoc);
//     const present = snapshot.exists() && snapshot.data().present;

//     const tr = document.createElement("tr");
//     tr.innerHTML = `
//       <td>${student.name}</td>
//       <td>${student.registration}</td>
//       <td>${student.semester}</td>
//       <td>${student.subject}</td>
//       <td><input type="checkbox" ${present ? "checked" : ""} onchange="markAttendance(event, '${student.semester}', '${student.subject}', '${student.id}')"></td>
//     `;
//     tableBody.appendChild(tr);
//   }
// }

// // 🟢 Mark Attendance
// window.markAttendance = async (e, semester, subject, studentId) => {
//   const selectedDate = attendanceDate.value;
//   if (!selectedDate) {
//     alert("Please select a date first.");
//     e.target.checked = false;
//     return;
//   }

//   const attendanceRef = doc(db, `attendance/${semester}_${subject}/${selectedDate}/${studentId}`);
//   await setDoc(attendanceRef, {
//     present: e.target.checked
//   });
// };

// // 🔴 Logout Function
// window.logout = function () {
//   signOut(auth).then(() => {
//     window.location.href = "index.html";
//   });
// };





// import { signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// window.logout = function () {
//   signOut(auth)
//     .then(() => {
//       alert("Logged out!");
//       window.location.href = "index.html";
//     })
//     .catch((error) => {
//       alert("Logout failed: " + error.message);
//     });
// };







import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDzw_YJT9GJF5YUZxkCdpcWRTkxYMVDQC0",
  authDomain: "attendance-management-sy-6b67c.firebaseapp.com",
  projectId: "attendance-management-sy-6b67c",
  storageBucket: "attendance-management-sy-6b67c.appspot.com",
  messagingSenderId: "300371809330",
  appId: "1:300371809330:web:6c4be3cd92c934f944182b",
  measurementId: "G-3NB4MJPQE4"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// ✅ DOM Elements
const form = document.getElementById("addStudentForm");
const tableBody = document.querySelector("#studentTable tbody");
const attendanceDate = document.getElementById("attendanceDate");

// ✅ Disable future dates
attendanceDate.max = new Date().toISOString().split("T")[0];

let currentUser;
let studentList = [];

// ✅ Check login user
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    loadStudents();
  } else {
    window.location.href = "index.html";
  }
});

// ✅ Add Student
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const registration = document.getElementById("registration").value.trim();
  const semester = document.getElementById("semester").value.trim();
  const subject = document.getElementById("subject").value.trim();

  if (!name || !registration || !semester || !subject) {
    alert("Fill all fields");
    return;
  }

  await addDoc(collection(db, "students"), {
    name,
    registration,
    semester,
    subject,
    addedBy: currentUser.uid,
    createdAt: new Date()
  });

  form.reset();
  loadStudents();
});

// ✅ Load Students and Attendance
attendanceDate.addEventListener("change", loadStudents);

async function loadStudents() {
  const querySnapshot = await getDocs(collection(db, "students"));
  tableBody.innerHTML = "";
  studentList = [];

  const selectedDate = attendanceDate.value;
  if (!selectedDate) return;

  for (const docSnap of querySnapshot.docs) {
    const data = docSnap.data();
    if (data.addedBy === currentUser.uid) {
      studentList.push({ ...data, id: docSnap.id });
    }
  }

  for (const student of studentList) {
    const attendanceRef = doc(db, `attendance/${student.semester}_${student.subject}/${selectedDate}/${student.id}`);
    const snapshot = await getDoc(attendanceRef);
    const present = snapshot.exists() && snapshot.data().present;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${student.name}</td>
      <td>${student.registration}</td>
      <td>${student.semester}</td>
      <td>${student.subject}</td>
      <td><input type="checkbox" ${present ? "checked" : ""} onchange="markAttendance(event, '${student.semester}', '${student.subject}', '${student.id}')"></td>
    `;
    tableBody.appendChild(tr);
  }
}

// ✅ Mark Attendance (Checkbox Handler)
window.markAttendance = async function (e, semester, subject, studentId) {
  const selectedDate = attendanceDate.value;
  if (!selectedDate) {
    alert("Please select a date.");
    e.target.checked = false;
    return;
  }

  const attendanceRef = doc(db, `attendance/${semester}_${subject}/${selectedDate}/${studentId}`);
  await setDoc(attendanceRef, {
    present: e.target.checked
  });
};

// ✅ Logout
window.logout = function () {
  signOut(auth).then(() => {
    localStorage.clear();
    window.location.href = "index.html";
  });
};















