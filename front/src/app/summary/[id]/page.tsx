"use client";

import { useEffect, useState } from 'react';
import { firestore } from '../../firebase/firebase';
import React from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';

const SummaryDetail = () => {
    const [summary, setSummary] = useState<Summary | null>(null);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchSummary = async () => {
                try {
                    const doc = await firestore.collection('summary').doc(id as string).get();
                    if (doc.exists) {
                        setSummary({
                            id: doc.id,
                            ...doc.data()
                        } as Summary);
                    } else {
                        console.error("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching document:", error);
                }
            };

            fetchSummary();
        }
    }, [id]);

    useEffect(() => {
        if (summary) {
            const timer = setTimeout(() => {
                window.open(summary.articleUrl, '_blank');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [summary]);

    if (!summary) {
        return <div className="p-5">Loading...</div>;
    }

    return (
        <div className={styles.summaryContainer}>
            <header className="header">
                <Link href="/" className={styles.logo}>
                    今北産業
                </Link>
            </header>
            <h1 className={styles.summaryTitle}>{summary.title}</h1>
            <img src={summary.imageUrl} alt={summary.title} className={styles.summaryImage} />
            <ul className="list-disc pl-5">
                {summary.summary.map((point, index) => (
                    <li key={index} className="mb-2">{point}</li>
                ))}
            </ul>
            <p className={styles.countdown}>3秒後に記事を開きます...</p>
            <button
                onClick={() => window.open(summary.articleUrl, '_blank')}
                className={styles.openButton}
            >
                記事を開く
            </button>
        </div>
    );
};

export default SummaryDetail;
