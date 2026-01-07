// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;