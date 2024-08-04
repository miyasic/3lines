import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import firebase from '../firebase/firebase'; // パスはプロジェクトの構造に合わせて修正
import React from 'react';
import './globals.css';
import Head from 'next/head';

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

    return (
        <>
            <Head>
                <meta name="google-adsense-account" content="ca-pub-6246635878467153"></meta>
            </Head>
            <Component {...pageProps} />
        </>
    );
};

export default MyApp;
