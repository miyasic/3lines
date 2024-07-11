import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';
import 'firebase/compat/auth';
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDl0jNRpeZySiT7HPFAtndU-F8CIkPqNwY",
    authDomain: "lines-31c04.firebaseapp.com",
    projectId: "lines-31c04",
    storageBucket: "lines-31c04.appspot.com",
    messagingSenderId: "856500639204",
    appId: "1:856500639204:web:2f9eb48e1e03360c98e3f1",
    measurementId: "G-R3KEXWL32W"
};

const devFirebaesConfig = {
    apiKey: "AIzaSyBgq94c2DSbVLaDUj2yETqiPvBFOoxPRGE",
    authDomain: "lines-31c04-dev.firebaseapp.com",
    projectId: "lines-31c04-dev",
    storageBucket: "lines-31c04-dev.appspot.com",
    messagingSenderId: "186772937007",
    appId: "1:186772937007:web:4b58e2c988cb5e3523e9da"
};


if (!firebase.apps.length) {
    // 環境ごとに切り替える
    console.log(process.env.NODE_ENV);
    console.log(process.env.NEXT_PUBLIC_ENV);
    const isProd = process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_ENV === 'production';
    const config = isProd ? firebaseConfig : devFirebaesConfig;
    firebase.initializeApp(config);
    // emulatorを使うときはコメントアウトを外す
    // firebase.functions().useEmulator("localhost", 5001);
    // firebase.firestore().useEmulator("localhost", 8080);
    // firebase.auth().useEmulator("http://localhost:9099");
}

const firestore = firebase.firestore();
const functions = firebase.functions();
const auth = firebase.auth();

signInAnonymously(auth)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log('User ID:', user.uid);
    })
    .catch((error) => {
        console.error(error);
    });

export { firestore, functions, auth };
export default firebase;
