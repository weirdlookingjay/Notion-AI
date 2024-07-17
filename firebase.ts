// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJ7wNQ-yR-nHu5KFZstYAMaj6cGhwghmM",
  authDomain: "notion-ai-efdc0.firebaseapp.com",
  projectId: "notion-ai-efdc0",
  storageBucket: "notion-ai-efdc0.appspot.com",
  messagingSenderId: "1022760365169",
  appId: "1:1022760365169:web:c385aee7e803f945fb3fd0"
};

// Initialize Firebase
const app = getApps().length() === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

expory {db};