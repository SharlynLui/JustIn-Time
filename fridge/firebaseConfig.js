// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRXMnTVG_GNC5pj7WXfB5SROZ_vrBPtyE",
  authDomain: "justintime-e8df5.firebaseapp.com",
  projectId: "justintime-e8df5",
  storageBucket: "justintime-e8df5.appspot.com",
  messagingSenderId: "857375938316",
  appId: "1:857375938316:web:8176a335297c2361de1b29",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
