// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKJvzc9-R2XNbwBQ07a18vBZ-0WcEinfA",
  authDomain: "file-share-a1e17.firebaseapp.com",
  projectId: "file-share-a1e17",
  storageBucket: "file-share-a1e17.appspot.com",
  messagingSenderId: "92548422671",
  appId: "1:92548422671:web:8b8a275a7e26415b1c577a",
  measurementId: "G-1X2FXG6K4E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const db = getFirestore(app);
export const storage = getStorage(app)
