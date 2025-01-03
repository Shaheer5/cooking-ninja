import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "your api key",
  authDomain: "cooking-xxxxx.firebaseapp.com",
  projectId: "cooking-xxxxxx",
  storageBucket: "cooking-xxxxxx.appspot.com",
  messagingSenderId: "messaging id",
  appId: "1:APP ID:web:APP ID",
};

// init app
firebase.initializeApp(firebaseConfig);

// init firestore
const projectFirestore = firebase.firestore();

export { projectFirestore };
