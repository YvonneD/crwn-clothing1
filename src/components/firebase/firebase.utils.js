import firebase from "firebase/compat/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChZbIDaCSgLLxpeRcZN1fjrUhct4FhFsI",
  authDomain: "crwn1-db-af248.firebaseapp.com",
  projectId: "crwn1-db-af248",
  storageBucket: "crwn1-db-af248.appspot.com",
  messagingSenderId: "142675s533484",
  appId: "1:142675533484:web:3c8da335c44d30a3120909",
  measurementId: "G-NRD6ZPW3FK",
};

firebase.initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default firebase;
