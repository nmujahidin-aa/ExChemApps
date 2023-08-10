// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBECqw0_fzE-p8owcXvRdz2jVQL7Vk0byc",
    authDomain: "chemtro-edf06.firebaseapp.com",
    projectId: "chemtro-edf06",
    storageBucket: "chemtro-edf06.appspot.com",
    messagingSenderId: "204824942281",
    appId: "1:204824942281:web:a07df57e7186de5cb85f18",
    measurementId: "G-2WMCR465ZP"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);