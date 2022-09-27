import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

let firebaseConfig = {
    apiKey: "AIzaSyDY15IzoAC_Dv_IAmmpqnXgZ1p_VgqvqJA",
    databaseURL: "https://earnser-6ee4a.firebaseio.com",
    authDomain: "earnser-6ee4a.firebaseapp.com",
    projectId: "earnser-6ee4a",
    storageBucket: "earnser-6ee4a.appspot.com",
    messagingSenderId: "427429025943",
    appId: "1:427429025943:web:854859276807ecb99631d2"
};

// Initialize Firebase
let app = initializeApp(firebaseConfig);
let db = getFirestore(app);
let storage = getStorage(app);

export { db, storage };