import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdPEJttr8Jp3KUJVKD9gSDhdzc6POiyJ4",
  authDomain: "chat-8e17f.firebaseapp.com",
  projectId: "chat-8e17f",
  storageBucket: "chat-8e17f.appspot.com",
  messagingSenderId: "604530869108",
  appId: "1:604530869108:web:23147f98a5fc3202f76221",
  measurementId: "G-5K41RGTR96"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();