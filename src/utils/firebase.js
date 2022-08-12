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

// [...Array(10)].map((not, ind) => {
//   console.log(ind);
//   return setDoc(doc(db, "AllClasses", `Period${ind + 1}`), { classes: [] });
// });

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
        classes: [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
      });
    } catch (error) {
      console.error("There was an error creating user", error.message);
    }
  }

  return userDocRef;
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

const convertFirebaseDataToArr = (data) => {
  return data._document.data.value.mapValue.fields.classes.arrayValue.values
    ? data._document.data.value.mapValue.fields.classes.arrayValue.values.map(
        (classObj) => {
          if (!Object.keys(classObj).includes("nullValue")) {
            const newClassObj = {};
            newClassObj.teacher = classObj.mapValue.fields.teacher.stringValue;
            newClassObj.class = classObj.mapValue.fields.class.stringValue;
            newClassObj.index = classObj.mapValue.fields.index.stringValue;

            newClassObj.users =
              classObj.mapValue.fields.users &&
              classObj.mapValue.fields.users.arrayValue.values
                ? classObj.mapValue.fields.users.arrayValue.values.map(
                    (user) => {
                      return user.stringValue;
                    }
                  )
                : [];

            return newClassObj;
          }
          return null;
        }
      )
    : [];
};

export const getUserClasses = async (userDocRef) => {
  const usersClasses = convertFirebaseDataToArr(await getDoc(userDocRef));
  console.log(await getDoc(userDocRef));
  console.log(usersClasses);
  return usersClasses;
};

export const getPeriodClasses = async (period) => {
  const periodClasses = await getDoc(doc(db, "AllClasses", `Period${period}`));
  return periodClasses._document ? convertFirebaseDataToArr(periodClasses) : [];
};

export const isClassReal = async (classData) => {
  const periodClasses = await getPeriodClasses(classData[0]);
  const returnVal = periodClasses.reduce((acc, theClass) => {
    if (theClass.class === classData[1] && theClass.teacher === classData[2]) {
      return theClass.index;
    }
    return acc;
  }, false);
  return returnVal;
};
export const changeClass = async (
  currentUser,
  previousPeriod,
  newPeriod,
  periodNum
) => {
  const updatedUserClasses = await getUserClasses(currentUser.userDocRef);
  updatedUserClasses[periodNum - 1] = newPeriod;

  // await setDoc(
  //   currentUser.userDocRef,
  //   { classes: updatedUserClasses },
  //   { merge: true }
  // );

  const periodClasses = await getPeriodClasses(periodNum);
  const classInd = periodClasses.reduce((acc, periodClass, ind) => {
    if (periodClass.index === newPeriod.index) {
      return ind;
    }
    return acc;
  }, []);
  periodClasses[classInd].users.push(
    `${currentUser.userDocRef.id}@SEPERATE@${currentUser.displayName}`
  );
  if (previousPeriod && !(previousPeriod.class === "none")) {
    const userIndexToPop = periodClasses[previousPeriod.index].users.indexOf(
      `${currentUser.userDocRef.id}@SEPERATE@${currentUser.displayName}`
    );
    periodClasses[previousPeriod.index].users.pop(userIndexToPop);
  }
  await setDoc(doc(db, "AllClasses", `Period${periodNum}`), {
    classes: periodClasses,
  });
};

export const submitClassToFB = async (periodNum, teacherToAdd, classToAdd) => {
  const periodClasses = await getPeriodClasses(periodNum);
  periodClasses.push({
    class: classToAdd,
    teacher: teacherToAdd,
    index: `${periodClasses.length}`,
    users: [],
  });
  await setDoc(doc(db, "AllClasses", `Period${periodNum}`), {
    classes: periodClasses,
  });
  return `${periodClasses.length - 1}`;
};
