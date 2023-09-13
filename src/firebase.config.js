// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// get firestore
import {getFirestore} from 'firebase/firestore'
import { getDatabase } from "firebase/database";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4TAdc7we5XjISaE8ES4xGKaLBU2zUjqE",
  authDomain: "market-place-maninaphone.firebaseapp.com",
  projectId: "market-place-maninaphone",
  storageBucket: "market-place-maninaphone.appspot.com",
  messagingSenderId: "757974703261",
  appId: "1:757974703261:web:7b1e7f60e21a05352cc874"
};

// Initialize Firebase
const app=initializeApp(firebaseConfig);
export const Auth=getAuth()
export const db=getFirestore()

// Initialize Realtime Database and get a reference to the service