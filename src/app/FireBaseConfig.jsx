// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getStorage, ref } from "firebase/storage";
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxxp0cLGHEUWRNCy8kwtCvdLPWtPx72qA",
  authDomain: "front-end-2-11ae4.firebaseapp.com",
  projectId: "front-end-2-11ae4",
  storageBucket: "front-end-2-11ae4.appspot.com",
  messagingSenderId: "997355651902",
  appId: "1:997355651902:web:0560c3c2d0ad1cca53a26f",
  measurementId: "G-V4VHVHDMNV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();
const storageRef = ref(storage);


export { auth, db, storage };