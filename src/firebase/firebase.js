// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getDatabase } from "firebase/database";
import { Database } from "firebase/database";
import { ref } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBAqibyKCKBEjjP95S9LUgM-H64PjMvaZk",
    authDomain: "wrud-16db0.firebaseapp.com",
    projectId: "wrud-16db0",
    storageBucket: "wrud-16db0.appspot.com",
    messagingSenderId: "956445199404",
    appId: "1:956445199404:web:265cee4a4046f31df3d589"
};

// init firebase
initializeApp(firebaseConfig)
// init & export firestore service
export const db = getFirestore()
// generate & export auth object
export const auth = getAuth()

