// // Firebase CDN initialization (DO NOT use npm style here)

// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyDzw_YJT9GJF5YUZxkCdpcWRTkxYMVDQC0",
//   authDomain: "attendance-management-sy-6b67c.firebaseapp.com",
//   projectId: "attendance-management-sy-6b67c",
//   storageBucket: "attendance-management-sy-6b67c.appspot.com",
//   messagingSenderId: "300371809330",
//   appId: "1:300371809330:web:6c4be3cd92c934f944182b"
// };

// // Export the app instance
// export const app = initializeApp(firebaseConfig);




// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

export const firebaseConfig = {
  apiKey: "AIzaSyDzw_YJT9GJF5YUZxkCdpcWRTkxYMVDQC0",
  authDomain: "attendance-management-sy-6b67c.firebaseapp.com",
  projectId: "attendance-management-sy-6b67c",
  storageBucket: "attendance-management-sy-6b67c.appspot.com",
  messagingSenderId: "300371809330",
  appId: "1:300371809330:web:6c4be3cd92c934f944182b",
  measurementId: "G-3NB4MJPQE4"
};

export const app = initializeApp(firebaseConfig);
