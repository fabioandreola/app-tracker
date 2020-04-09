import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

// Your web app's Firebase configuration
var config = {
    apiKey: "",
    authDomain: "tracker-99159.firebaseapp.com",
    databaseURL: "https://tracker-99159.firebaseio.com",
    projectId: "tracker-99159",
    storageBucket: "tracker-99159.appspot.com",
    messagingSenderId: "",
    appId: "1:536840347000:web:6c0282bce1a2acaf4c3c8d",
    measurementId: ""
};
// Initialize Firebase
firebase.initializeApp(config);
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

async function getUser(){
    return new Promise(function (resolve) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                resolve(user.uid);
            } else {
                firebase.auth().signInWithRedirect(provider);
            }
        });
    });
}

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth, getUser };