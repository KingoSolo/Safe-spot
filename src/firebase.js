// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBs9mulA91tEoZDXO3_SsHG8-W8golRtlI",
  authDomain: "safespot-86044.firebaseapp.com",
  projectId: "safespot-86044",
  storageBucket: "safespot-86044.firebasestorage.app",
  messagingSenderId: "511807929277",
  appId: "1:511807929277:web:ecabbfdaf50f757808f0d4",
  measurementId: "G-C6CH8FE5DL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);