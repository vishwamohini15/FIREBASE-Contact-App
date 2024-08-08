// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArKuLeEg8_VJKKLJ6oGipj-VBXz9X56w4",
  authDomain: "vite-contact-71f84.firebaseapp.com",
  projectId: "vite-contact-71f84",
  storageBucket: "vite-contact-71f84.appspot.com",
  messagingSenderId: "771941600814",
  appId: "1:771941600814:web:3d3d85c3ef6d8175a6d9bf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db =getFirestore(app)