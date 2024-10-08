import React from 'react';
import styles from './page.module.css';
import { SummaryDetailClient } from '@/components/summaryDetailClient';
import { firestore } from '@/firebase/firebase';
import { Metadata } from 'next';
import Footer from '@/components/layout/Footer';
import AdSense from '@/components/adsense';
import { firestoreCollectionSummary } from '@/constants/constantsFirebase';


export async function generateStaticParams() {
    const snapshot = await firestore.collection(firestoreCollectionSummary).get();
    const paths = snapshot.docs.map(doc => ({
        id: doc.id,
    }));

    return paths;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const doc = await firestore.collection(firestoreCollectionSummary).doc(params.id).get();
    const data = doc.data() as Summary;
    const description = data.summary[0];
    return {
        title: data.title,
        openGraph: {
            title: data.title,
            images: [
                {
                    url: data.imageUrl,
                },
            ],
            url: `https://3lines.me/summary/${params.id}`,
        },
    };
}

const SummaryDetail = async ({ params }: { params: { id: string } }) => {
    const doc = await firestore.collection(firestoreCollectionSummary).doc(params.id).get();
    const summary = { ...doc.data(), id: params.id } as Summary;

    if (!summary) {
        return (
            <div className={styles.loading}>
                Loading...
            </div>
        );
    }

    return (
        <div>
            <SummaryDetailClient summary={summary} />
            <AdSense />
            <Footer />
        </div>
    );
};

export const revalidate = 3600;

export default SummaryDetail;
