// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVxAIl41Ep8QSCCgmL3fgyHh048NkNfkU",
  authDomain: "front-end-2-7f139.firebaseapp.com",
  databaseURL: "https://front-end-2-7f139-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "front-end-2-7f139",
  storageBucket: "front-end-2-7f139.appspot.com",
  messagingSenderId: "220433614630",
  appId: "1:220433614630:web:c3c605400f54849adfe3e7",
  measurementId: "G-PDJT1YB164"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);