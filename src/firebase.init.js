// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCch58jzTyUtcXmjE13ID3EBLGx45MigGI",
  authDomain: "eamil-password-auth-9cc17.firebaseapp.com",
  projectId: "eamil-password-auth-9cc17",
  storageBucket: "eamil-password-auth-9cc17.firebasestorage.app",
  messagingSenderId: "465821993219",
  appId: "1:465821993219:web:7604d3e64439299143c136"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);