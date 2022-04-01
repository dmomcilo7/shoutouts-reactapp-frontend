import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVfu_EQVlKiJJT8ySX6Q_SNyJXC21DyfA",
  authDomain: "shoutouts-e63e1.firebaseapp.com",
  projectId: "shoutouts-e63e1",
  storageBucket: "shoutouts-e63e1.appspot.com",
  messagingSenderId: "1047048115564",
  appId: "1:1047048115564:web:b6f760210bf49a21cfcf49",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();
export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}
export const storage = getStorage(app);
