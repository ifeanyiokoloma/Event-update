// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCcj91cfuGhhd_jL7YiOwOllAeqbypihjI',
  authDomain: 'event-update-4608e.firebaseapp.com',
  projectId: 'event-update-4608e',
  storageBucket: 'event-update-4608e.appspot.com',
  messagingSenderId: '167624802017',
  appId: '1:167624802017:web:8a7d968d4c40d37b1e81a0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
