// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAsLbUz5PKeg6Ba-zjRmPth7hcUdF5uC4",
  authDomain: "project1-99640.firebaseapp.com",
  projectId: "project1-99640",
  storageBucket: "project1-99640.appspot.com",
  messagingSenderId: "509155816175",
  appId: "1:509155816175:web:978dac2afcce04b425a11a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
