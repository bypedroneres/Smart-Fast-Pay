import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCxtR-qKGmc9ISMv1UxZvjR5KfAZNJ3sqw",
    authDomain: "smart-fast-pay.firebaseapp.com",
    projectId: "smart-fast-pay",
    storageBucket: "smart-fast-pay.appspot.com",
    messagingSenderId: "809833043348",
    appId: "1:809833043348:web:b202e57e5b642549cbab81",
    measurementId: "G-VSVY2YXKKJ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
