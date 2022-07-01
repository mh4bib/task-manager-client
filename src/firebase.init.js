// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAD9RovnfjtGaJVaaKxFb7895JcO8vorQo",
  authDomain: "task-manager-31a8a.firebaseapp.com",
  projectId: "task-manager-31a8a",
  storageBucket: "task-manager-31a8a.appspot.com",
  messagingSenderId: "830682033912",
  appId: "1:830682033912:web:6f6a7d5b48f6ba2adb550d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;