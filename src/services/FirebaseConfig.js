import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBur7K4kMqyv04BpYvZPb6-PVZAeXfpbf0",
  authDomain: "bribery-test.firebaseapp.com",
  databaseURL: "https://bribery-test.firebaseio.com",
  projectId: "bribery-test",
  storageBucket: "bribery-test.appspot.com",
  messagingSenderId: "312584286294",
  appId: "1:312584286294:web:5485f6f836508a39690bf7",
  measurementId: "G-BGJFR4VFE3"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);