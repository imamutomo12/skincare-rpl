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
  apiKey: "AIzaSyDUuHs9JvfjwhfVjfoBWU9lzvFpRX6qs8w",
  authDomain: "skincare-rpl-uas.firebaseapp.com",
  projectId: "skincare-rpl-uas",
  storageBucket: "skincare-rpl-uas.firebasestorage.app",
  messagingSenderId: "814154901170",
  appId: "1:814154901170:web:a5d0c94da2e978ef44cbab",
  measurementId: "G-6102SF9KBG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
export const auth = getAuth();
export const db = getFirestore();
export default app;
