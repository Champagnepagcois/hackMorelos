// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBOHACmP5xg8EwYXsL3clHE4wya_eGsYTQ",
  authDomain: "hackmorelos-934d9.firebaseapp.com",
  projectId: "hackmorelos-934d9",
  storageBucket: "hackmorelos-934d9.appspot.com",
  messagingSenderId: "29422381071",
  appId: "1:29422381071:web:ddc8f46aba3579d9189b7a",
  measurementId: "G-KRGXX44M2N"
};

const fb = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = fb.firestore();
export default fb;

