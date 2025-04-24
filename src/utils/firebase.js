// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoLFBrrFwCwvCkP1xtm55bcF1yf0erMXg",
  authDomain: "eatsexpress-9a6d5.firebaseapp.com",
  projectId: "eatsexpress-9a6d5",
  storageBucket: "eatsexpress-9a6d5.firebasestorage.app",
  messagingSenderId: "866022768065",
  appId: "1:866022768065:web:d01153a117e8ffc6ba4340"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let auth = getAuth(app)
export default auth
