// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithCredential,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB27Fa7JNqtjKj1ZS_B_1-LyOGqzlQjGrM",
  authDomain: "media-matchup-native.firebaseapp.com",
  projectId: "media-matchup-native",
  storageBucket: "media-matchup-native.appspot.com",
  messagingSenderId: "476495844700",
  appId: "1:476495844700:web:1fa23a938863d7ac011d99",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
