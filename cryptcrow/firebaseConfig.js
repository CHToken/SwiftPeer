import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA0u_g9nRmfYisG0LjWHo1GF6WHrtKBKsE",
  authDomain: "cryptcrow-13181.firebaseapp.com",
  databaseURL: "https://cryptcrow-13181-default-rtdb.firebaseio.com",
  projectId: "cryptcrow-13181",
  storageBucket: "cryptcrow-13181.appspot.com",
  messagingSenderId: "112082372586",
  appId: "1:112082372586:web:787189f3c22a41a9279493",
  measurementId: "G-N245Y2C36F",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const usersRef = collection(FIREBASE_DB, "users");
