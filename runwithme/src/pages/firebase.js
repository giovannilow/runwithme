import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyBBzojbQYPUjePUP6laVyY-X44PvXxxegE",
  authDomain: "runwithme-dev.firebaseapp.com",
  projectId: "runwithme-dev",
  storageBucket: "runwithme-dev.appspot.com",
  messagingSenderId: "360919116385",
  appId: "1:360919116385:web:8af1331a69cfa4cdf29820",
});

export default app;
