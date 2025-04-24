// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7saym6hi1nZuJRPDFt1ecuXavJPcVDaU",
  authDomain: "foodorderingapp-f57a0.firebaseapp.com",
  projectId: "foodorderingapp-f57a0",
  storageBucket: "foodorderingapp-f57a0.firebasestorage.app",
  messagingSenderId: "354925210664",
  appId: "1:354925210664:web:d929f0f26671a90b3a591d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let auth = getAuth(app)
export default auth
