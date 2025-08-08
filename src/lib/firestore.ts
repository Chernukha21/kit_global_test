// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ this is the right one

const firebaseConfig = {
    apiKey: "AIzaSyCH7WAbJ_9STaGx-x6kN-gcV1auY_62NfM",
    authDomain: "test-task-kit-global.firebaseapp.com",
    projectId: "test-task-kit-global",
    storageBucket: "test-task-kit-global.appspot.com", // ✅ fixed earlier
    messagingSenderId: "649086415146",
    appId: "1:649086415146:web:75812b0c4a578f04106e53",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app); // ✅ Firestore instance

export { db };