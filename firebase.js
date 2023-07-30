import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDFQ0OjplF81k3Rld6oc_s0zOjPvZG9tFo",
  authDomain: "nova-jerusalem-f751c.firebaseapp.com",
  projectId: "nova-jerusalem-f751c",
  storageBucket: "nova-jerusalem-f751c.appspot.com",
  messagingSenderId: "230146936600",
  appId: "1:230146936600:web:164737902bd62cbd6c186d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }