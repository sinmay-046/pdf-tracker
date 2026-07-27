import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDh2OFuO-DqCeEHpTUnSzD1btIuRFJeB7Y",
  authDomain: "pdf-tracker-75b8f.firebaseapp.com",
  projectId: "pdf-tracker-75b8f",
  storageBucket: "pdf-tracker-75b8f.firebasestorage.app",
  messagingSenderId: "720048235173",
  appId: "1:720048235173:web:7dbeb300ab4506a174a34c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);