// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRC5t3eICgzrf4-GcViS88odg_DxJg5ec",
  authDomain: "bookmyadda-42d36.firebaseapp.com",
  projectId: "bookmyadda-42d36",
  storageBucket: "bookmyadda-42d36.firebasestorage.app",
  messagingSenderId: "842737615345",
  appId: "1:842737615345:web:f58e5e9ad1d82fba124450",
  measurementId: "G-2ZYPM6M328"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;