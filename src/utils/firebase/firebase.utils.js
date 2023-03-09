import { initializeApp } from 'firebase/app';
import { getAuth, 
        signInWithRedirect, 
        signInWithPopup, 
        GoogleAuthProvider
    } from 'firebase/auth';
import {
        getFirestore,
        doc,
        getDoc,
        setDoc
    } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCt6H1aQm8bwHt8A-wlVbYDydAXo5-4iRM",
  authDomain: "crwn-db-ba545.firebaseapp.com",
  projectId: "crwn-db-ba545",
  storageBucket: "crwn-db-ba545.appspot.com",
  messagingSenderId: "134645572633",
  appId: "1:134645572633:web:9aeb7a7309916cebf63688",
  measurementId: "G-1FNKHNXNK4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()){
    const { displayName, email} = userAuth;
    const createdAt = new Date();

    try {
        await setDoc(userDocRef, {
          displayName,
          email, 
          createdAt
        });
    } catch(error) {
      console.log(`error creating the user ${error.message}`);
    }
  }

  return userDocRef;
};