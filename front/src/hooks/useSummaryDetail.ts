import { useEffect, useState, useRef } from 'react';
import { firestore } from '../firebase/firebase';
import { useParams } from 'next/navigation';
import { PAGE_INNER_MAX_WIDTH, PAGE_MAX_WIDTH } from '@/constants/constants';

export const useSummaryDetail = () => {
    const [summary, setSummary] = useState<Summary | null>(null);
    const [countdown, setCountdown] = useState(3);
    const { id } = useParams();
    const opened = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({});
    const [innerContainerStyle, setInnerContainerStyle] = useState<React.CSSProperties>({});
    const [windowSizeLoading, setWindowSizeLoading] = useState(true);

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

    useEffect(() => {
        const updateLayout = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const containerHeight = Math.floor(windowHeight * 2 / 3);
            const containerWidth = Math.min(windowWidth - 40, PAGE_MAX_WIDTH); // 左右に20pxずつのパディングを確保
            const innerWidth = Math.min(containerWidth - 40, PAGE_INNER_MAX_WIDTH); // 内部要素にも左右10pxずつのパディングを追加

            setContainerStyle({
                height: `${containerHeight}px`,
                width: `${containerWidth}px`,
                padding: '0 20px', // 左右のパディングを追加
            });

            setInnerContainerStyle({
                width: `${innerWidth}px`,
                margin: '0 auto',
                padding: '0 10px', // 内部要素にパディングを追加
            });
            setWindowSizeLoading(false);
        };

        updateLayout();
        window.addEventListener('resize', updateLayout);

        return () => window.removeEventListener('resize', updateLayout);
    }, []);

    return { summary, containerRef, containerStyle, innerContainerStyle, windowSizeLoading };
};
