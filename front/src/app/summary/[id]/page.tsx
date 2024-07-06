"use client";

import React, { useEffect, useRef, useState } from 'react';
import { firestore } from '../../../firebase/firebase';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import { PAGE_INNER_MAX_WIDTH, PAGE_MAX_WIDTH } from '@/constants/constants';
import AppButton from '@/components/AppButton';
import { OPEN_ORIGINAL_ARTICLE } from '@/constants/constantsTexts';

const SummaryDetail = () => {
    const [summary, setSummary] = useState<Summary | null>(null);
    const [countdown, setCountdown] = useState(3);
    const { id } = useParams();
    const router = useRouter();
    const opened = useRef(false);

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
        const queryParams = new URLSearchParams(window.location.search);
        const autoOpen = queryParams.get('autoOpen') !== 'false'; // クエリパラメータがfalseでない限りリンクを自動で開く

        if (summary && autoOpen && !opened.current) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        if (!opened.current) {
                            window.open(summary.articleUrl, '_blank');
                            opened.current = true;
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [summary]);

    if (!summary) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '24px',
                fontWeight: 'bold'
            }}>
                Loading...
            </div>
        );
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            width: '100%',
            maxWidth: `${PAGE_MAX_WIDTH}px`,
            margin: '0 auto',
            padding: '20px',
            boxSizing: 'border-box',
        }}>
            <Header />
            <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: `${PAGE_INNER_MAX_WIDTH}px`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <div style={{
                        width: '100%',
                        position: 'relative',
                        marginBottom: '20px'
                    }}>
                        <img
                            src={summary.imageUrl}
                            alt={summary.title}
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                                borderRadius: '10px'
                            }}
                        />
                    </div>
                    <AppButton title={OPEN_ORIGINAL_ARTICLE} onClick={() => window.open(summary.articleUrl, '_blank')} />
                </div>
            </div>
        </div>
    );
};

export default SummaryDetail;