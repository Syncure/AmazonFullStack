import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCxLa3hmcDbLpUyEv_0qCn832zKTpn0PnQ",
  authDomain: "fullstack-4b57b.firebaseapp.com",
  projectId: "fullstack-4b57b",
  storageBucket: "fullstack-4b57b.appspot.com",
  messagingSenderId: "730618718129",
  appId: "1:730618718129:web:a9d99f9759d46f7ba83f90",
  measurementId: "G-35ZJ95J7GC",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
