// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realmestate-30eed.firebaseapp.com",
  projectId: "realmestate-30eed",
  storageBucket: "realmestate-30eed.firebasestorage.app",
  messagingSenderId: "834306832455",
  appId: "1:834306832455:web:5627c8331140ba51ccd962",
  measurementId: "G-XRE40DNMRH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);