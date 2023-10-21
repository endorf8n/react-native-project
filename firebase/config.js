import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgwF08LbBG3B1mPLzmoof-IVR8FY-i-fY",
  authDomain: "goit-rn-project-e566a.firebaseapp.com",
  databaseURL:
    "https://goit-rn-project-e566a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "goit-rn-project-e566a",
  storageBucket: "goit-rn-project-e566a.appspot.com",
  messagingSenderId: "989127460027",
  appId: "1:989127460027:web:f82e4c9f620ed37f21959e",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
