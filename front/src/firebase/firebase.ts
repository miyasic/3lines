import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';
import 'firebase/compat/auth';
import { AuthError, GithubAuthProvider, linkWithPopup, signInWithPopup, User, UserCredential } from "firebase/auth";

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
    appId: "1:186772937007:web:d8e42ee700b19d8723e9da"
};


if (!firebase.apps.length) {
    // 環境ごとに切り替える
    const isProd = process.env.NEXT_PUBLIC_ENV === 'production';
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



const signInWithGithub = async (): Promise<User | null> => {
    const provider = new GithubAuthProvider();
    try {
        provider.addScope('read:user');
        const result: UserCredential = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        console.error("Error during GitHub sign-in:", error);
        handleAuthError(error as AuthError);
        return null;
    }
};

const linkAnonymousUserWithGithub = async (): Promise<User | null> => {
    const provider = new GithubAuthProvider();
    try {
        provider.addScope('read:user');
        const user = auth.currentUser;
        if (user) {
            const result: UserCredential = await linkWithPopup(user, provider);
            return result.user;
        } else {
            console.error("No anonymous user is currently signed in");
            return null;
        }
    } catch (error) {
        handleAuthError(error as AuthError);
        return null;
    }
};

export const signOut = async (): Promise<void> => {
    try {
        await auth.signOut();
    } catch (error) {
        console.error("Error signing out:", error);
    }
}
export const signIn = async (user: User | null): Promise<User | null> => {
    if (user && user.isAnonymous) {
        try {
            await linkAnonymousUserWithGithub();
        } catch (error) {
            handleAuthError(error as AuthError);
        }
    } else if (user == null) {
        await signInWithGithub();
    }
    return auth.currentUser as User;
}

export const makeSummaryPrivate = async (summary: Summary): Promise<void> => {
    // 論理削除する
    const privateSummary = { ...summary, isPrivate: true };
    await firestore.collection('summary').doc(summary.id).update(privateSummary);
}

const handleAuthError = async (error: AuthError): Promise<void> => {
    if (error.code === 'auth/credential-already-in-use') {
        // 既に別のアカウントにリンクされている場合
        await auth.signOut();
        await signInWithGithub();
        return;
    }
    console.error("Authentication Error:", error);
    if (error.code) {
        console.error("Error code:", error.code);
    }
    if (error.message) {
        console.error("Error message:", error.message);
    }
    if (error.customData?.email) {
        console.error("Email associated with error:", error.customData.email);
    }

};

export { firestore, functions, auth, };
export default firebase;
