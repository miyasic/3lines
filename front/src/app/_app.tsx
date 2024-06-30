import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import firebase from './firebase/firebase'; // パスはプロジェクトの構造に合わせて修正
import React from 'react';
import './globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                firebase.auth().signInAnonymously().catch((error) => {
                    console.error('Anonymous sign-in failed', error);
                });
            }
        });

        // クリーンアップのためにアンマウント時にリスナーを解除
        return () => unsubscribe();
    }, []);

    return <Component {...pageProps} />;
};

export default MyApp;
