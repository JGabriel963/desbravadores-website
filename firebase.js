import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA86daypD92fJkBnzJ84_wxl6DlN2W0X_s",
  authDomain: "clube-nj.firebaseapp.com",
  projectId: "clube-nj",
  storageBucket: "clube-nj.appspot.com",
  messagingSenderId: "232122981403",
  appId: "1:232122981403:web:ac9980eb177d166c166cbe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
