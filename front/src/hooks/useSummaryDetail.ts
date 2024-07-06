import { useEffect, useState, useRef } from 'react';
import { firestore } from '../firebase/firebase';
import { useParams } from 'next/navigation';

export const useSummaryDetail = () => {
    const [summary, setSummary] = useState<Summary | null>(null);
    const [countdown, setCountdown] = useState(3);
    const { id } = useParams();
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

    return { summary, countdown };
};
