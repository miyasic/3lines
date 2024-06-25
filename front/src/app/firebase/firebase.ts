import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDl0jNRpeZySiT7HPFAtndU-F8CIkPqNwY",
    authDomain: "lines-31c04.firebaseapp.com",
    projectId: "lines-31c04",
    storageBucket: "lines-31c04.appspot.com",
    messagingSenderId: "856500639204",
    appId: "1:856500639204:web:2f9eb48e1e03360c98e3f1",
    measurementId: "G-R3KEXWL32W"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    // emulatorを使うときはコメントアウトを外す
    // firebase.functions().useEmulator("localhost", 5001);
}

const firestore = firebase.firestore();
const functions = firebase.functions();

export { firestore, functions };
export default firebase;
