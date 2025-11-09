// src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // <-- add this

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRvjb8ghbfQSi_5LMyeS6kbCOrkIGLBsM",
  authDomain: "project-tracker-9fc84.firebaseapp.com",
  projectId: "project-tracker-9fc84",
  storageBucket: "project-tracker-9fc84.appspot.com",
  messagingSenderId: "825150284645",
  appId: "1:825150284645:web:9cc349c53ec1a4d8d7f78c",
  measurementId: "G-TZZKB68REY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app); // <-- export auth

// Optional: analytics if you need
// import { getAnalytics } from "firebase/analytics";
// export const analytics = getAnalytics(app);
