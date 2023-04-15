import firebase, { FirebaseError } from "firebase/app";
import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBzojbQYPUjePUP6laVyY - X44PvXxxegE",
  authDomain: "runwithme-dev.firebaseapp.com",
  databaseURL:
    "https://runwithme-dev-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "runwithme-dev",
  storageBucket: "runwithme-dev.appspot.com",
  messagingSenderId: "360919116385",
  appId: "1:360919116385:web:8af1331a69cfa4cdf29820",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase();
export const firestore = getFirestore(app);

export default app;
