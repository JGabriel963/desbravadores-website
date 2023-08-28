import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCnrhVUQMdSedQ00XTq3pZ_1ymOwbHQt1I",
  authDomain: "nova-jerusalem-fdb76.firebaseapp.com",
  projectId: "nova-jerusalem-fdb76",
  storageBucket: "nova-jerusalem-fdb76.appspot.com",
  messagingSenderId: "322829560485",
  appId: "1:322829560485:web:0979260ee044326f917b4c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app);

export { db, auth };
