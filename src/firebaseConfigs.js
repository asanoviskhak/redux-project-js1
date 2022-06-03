// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDfEd-nm8Rcm3jxqsTMj98GB6dtYyY9FCc",
    authDomain: "redux-project-6a8df.firebaseapp.com",
    projectId: "redux-project-6a8df",
    storageBucket: "redux-project-6a8df.appspot.com",
    messagingSenderId: "260217998836",
    appId: "1:260217998836:web:393c01f7767b16545d7da1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);