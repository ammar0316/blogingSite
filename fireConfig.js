  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
  import {  getAuth,createUserWithEmailAndPassword ,
    signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged  ,
    signInWithEmailAndPassword 
   } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
  
   // firestore 
   import {collection, addDoc,doc,deleteDoc, getFirestore,getDocs,getDoc,updateDoc ,arrayUnion} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js"
  
   const firebaseConfig = {
    apiKey: "AIzaSyAgYyEX83jov5LwrAk4gGYg2RvSjy90PUs",
    authDomain: "bloging-site-4aa9a.firebaseapp.com",
    projectId: "bloging-site-4aa9a",
    storageBucket: "bloging-site-4aa9a.firebasestorage.app",
    messagingSenderId: "444540489504",
    appId: "1:444540489504:web:e931e91f5059eed24f5145",
    measurementId: "G-YH025B80T6"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
 
  
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
  export{
    getAuth,
    createUserWithEmailAndPassword,
    app,
    auth,
    signInWithPopup,  
    signOut,
    onAuthStateChanged,
    provider,
    signInWithEmailAndPassword ,
    db,
    collection, 
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    arrayUnion,
    deleteDoc,
   


  }
