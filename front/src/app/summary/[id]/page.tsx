import React from 'react';
import styles from './page.module.css';
import { SummaryDetailClient } from '@/components/summaryDetailClient';
import { firestore } from '@/firebase/firebase';
import { Metadata } from 'next';


export async function generateStaticParams() {
    const snapshot = await firestore.collection('summary').get();
    const paths = snapshot.docs.map(doc => ({
        id: doc.id,
    }));

    return paths;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const doc = await firestore.collection('summary').doc(params.id).get();
    const data = doc.data() as Summary;
    const description = data.summary[0] + '\n' + data.summary[1] + '\n' + data.summary[2];
    return {
        title: data.title,
        openGraph: {
            title: data.title,
            description: description,
            images: [
                {
                    url: data.imageUrl,
                },
            ],
            url: `https://3lines-lemon.vercel.app/summary/${params.id}`,
        },
        twitter: {
            title: data.title + '  #今北産業',
        },
    };
}

const SummaryDetail = async ({ params }: { params: { id: string } }) => {
    const doc = await firestore.collection('summary').doc(params.id).get();
    const summary = doc.data() as Summary;

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
        </div>
    );
};

export const revalidate = 60;

export default SummaryDetail;
