import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDwC5stGjq6ClwuzSMgIfQ6qBtMHpL4TII",
  authDomain: "brand-elevate-cms-ce1c4.firebaseapp.com",
  projectId: "brand-elevate-cms-ce1c4",
  storageBucket: "brand-elevate-cms-ce1c4.appspot.com",
  messagingSenderId: "644678015999",
  appId: "1:644678015999:web:933e39266b22375f00e5ca"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app)
const storage = getStorage(app)

export { app, auth, db, storage };
