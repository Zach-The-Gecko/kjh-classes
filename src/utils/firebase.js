import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";

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
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

provider.setCustomParameters({ prompt: "select_account" });
const auth = getAuth();
export const signInWithGoogle = () => signInWithRedirect(auth, provider);

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName } = userAuth;
    try {
      await setDoc(userDocRef, {
        displayName,
        classes: [null, null, null, null, null, null, null, null, null, null],
      });
    } catch (error) {
      console.log("There was an error creating user", error.message);
    }
  }

  return userDocRef;
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

const convertFirebaseDataToArr = (data) => {
  return data._document.data.value.mapValue.fields.classes.arrayValue.values.map(
    (classObj) => {
      if (!Object.keys(classObj).includes("nullValue")) {
        const newClassObj = {};
        newClassObj["teacher"] =
          classObj.mapValue.fields["teacher"].stringValue;
        newClassObj["class"] = classObj.mapValue.fields["class"].stringValue;
        return newClassObj;
      }
      return null;
    }
  );
};

export const getUserClasses = async (userDocRef) => {
  return convertFirebaseDataToArr(await getDoc(userDocRef));
};

export const getPeriodClasses = async (period) => {
  const periodClasses = await getDoc(doc(db, "AllClasses", `Period${period}`));
  return periodClasses._document ? convertFirebaseDataToArr(periodClasses) : [];
};
