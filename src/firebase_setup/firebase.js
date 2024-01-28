// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDF3WEzeg5h5UETu_Qqyg_vXmVTAmixmT4",
  authDomain: "codehoot-62c3d.firebaseapp.com",
  projectId: "codehoot-62c3d",
  storageBucket: "codehoot-62c3d.appspot.com",
  messagingSenderId: "295039885652",
  appId: "1:295039885652:web:8ad0e6d53f79692c0068c1",
  measurementId: "G-24PF30L182"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);