import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyDROmVRrvYWqtJ4PLV6rZdURpAz2oyqJ84",
    authDomain: "tracker-99159.firebaseapp.com",
    databaseURL: "https://tracker-99159.firebaseio.com",
    projectId: "tracker-99159",
    storageBucket: "tracker-99159.appspot.com",
    messagingSenderId: "536840347000",
    appId: "1:536840347000:web:6c0282bce1a2acaf4c3c8d",
    measurementId: "G-VXCRVT3S44"
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
const functions = firebase.functions();

export { db, auth, getUser, functions };