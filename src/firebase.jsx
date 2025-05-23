// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_a,
  authDomain: import.meta.env.VITE_b,
  projectId: import.meta.env.VITE_c,
  storageBucket: import.meta.env.VITE_d,
  messagingSenderId: import.meta.env.VITE_e,
  appId: import.meta.env.VITE_f,
  measurementId: import.meta.env.VITE_g,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
export const auth = getAuth();
export const db = getFirestore();
export default app;
