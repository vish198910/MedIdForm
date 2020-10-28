import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyA1NXN_cx5NVQXW1oIk5vfKrCzrQGRX-oY",
    authDomain: "med-id-form.firebaseapp.com",
    databaseURL: "https://med-id-form.firebaseio.com",
    projectId: "med-id-form",
    storageBucket: "med-id-form.appspot.com",
    messagingSenderId: "693611559833",
    appId: "1:693611559833:web:72380d061d026008f53108",
    measurementId: "G-XVXR2NSD0Z"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  export default firebase;