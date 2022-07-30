import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtH2orFZKv7W0TRtMQjHSB38cqTWpF6A0",
  authDomain: "kjh-classes.firebaseapp.com",
  projectId: "kjh-classes",
  storageBucket: "kjh-classes.appspot.com",
  messagingSenderId: "982267187414",
  appId: "1:982267187414:web:27ca7690c6892d08d1f977",
  measurementId: "G-2YFXCRKXSR",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGoogle = () => signInWithPopup(auth, provider);
