import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyARZ38OSAe6iDEjU_Aeu0zLNYYD8X6Z5M0",
  authDomain: "cooking-ninja-site-171d0.firebaseapp.com",
  projectId: "cooking-ninja-site-171d0",
  storageBucket: "cooking-ninja-site-171d0.appspot.com",
  messagingSenderId: "394521675856",
  appId: "1:394521675856:web:367e5f35f302fa94916955"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore()

export { projectFirestore };