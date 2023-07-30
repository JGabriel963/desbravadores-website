import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDwryDafN-xgLGr_R6Voc4z567Lg7IvtfU",
  authDomain: "nova-jerusalem-b3c0b.firebaseapp.com",
  projectId: "nova-jerusalem-b3c0b",
  storageBucket: "nova-jerusalem-b3c0b.appspot.com",
  messagingSenderId: "147370105836",
  appId: "1:147370105836:web:e74c385150e3925e5efec9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }