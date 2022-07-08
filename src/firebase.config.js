
// Import the functions you need from the SDKs you need

import { initializeApp , getApp , getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {

  apiKey: "AIzaSyBaeJAkisz3PFTPJzAr8HvPaAUF4E7yd6I",
  authDomain: "zomato-clone-e6c62.firebaseapp.com",
  projectId: "zomato-clone-e6c62",
  storageBucket: "zomato-clone-e6c62.appspot.com",
  messagingSenderId: "1087845865324",
  appId: "1:1087845865324:web:b8eb06449da0b375b8c549",
  measurementId: "G-P9HGS117PE"
};


// Initialize Firebase

const app = getApps.length>0 ? getApp() : initializeApp(firebaseConfig);
const fireStore = getFirestore(app);
const storage = getStorage(app);

export {app ,fireStore ,storage}