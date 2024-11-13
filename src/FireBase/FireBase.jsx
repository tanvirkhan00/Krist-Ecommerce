// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdDub0VGc28j6TCmdfAIfDfKnsBctYe3Y",
  authDomain: "krist-ecommerce.firebaseapp.com",
  projectId: "krist-ecommerce",
  storageBucket: "krist-ecommerce.firebasestorage.app",
  messagingSenderId: "844385259770",
  appId: "1:844385259770:web:5c5030819a118ad9b5b943"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig