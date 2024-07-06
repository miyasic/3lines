"use client";

import React, { useEffect, useRef, useState } from 'react';
import { firestore } from '../../../firebase/firebase';
import { useParams } from 'next/navigation';
import Header from '../../../components/Header';
import { PAGE_INNER_MAX_WIDTH, PAGE_MAX_WIDTH, ASPECT_RATIO, BACKGROUND_IMAGE_PATH } from '@/constants/constants';
import AppButton from '@/components/AppButton';
import { OPEN_ORIGINAL_ARTICLE } from '@/constants/constantsTexts';
import styles from './page.module.css';
import AnimatedSummary from '@/components/summary/AnimatedSummary';

const SummaryDetail = () => {
    const [summary, setSummary] = useState<Summary | null>(null);
    const { id } = useParams();
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerStyle, setContainerStyle] = useState({});
    const [imagePreviewStyle, setImagePreviewStyle] = useState({});
    const [innerContainerStyle, setInnerContainerStyle] = useState({});
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

            const imageWidth = innerWidth - 20; // パディングを考慮
            const imageHeight = Math.min(imageWidth / ASPECT_RATIO, containerHeight - 80); // ボタンとマージンのスペースを増やす
            const imageWidth2 = imageHeight * ASPECT_RATIO;

            setImagePreviewStyle({
                width: `${imageWidth2}px`,
                height: `${imageHeight}px`,
                margin: '0 auto',
            });
            setWindowSizeLoading(false);
        };

        updateLayout();
        window.addEventListener('resize', updateLayout);

        return () => window.removeEventListener('resize', updateLayout);
    }, []);

    if (!summary) {
        return (
            <div className={styles.loading}>
                Loading...
            </div>
        );
    }

    return (
        <div className={styles.pageContainer} style={{ maxWidth: PAGE_MAX_WIDTH }}>
            <Header />
            {!windowSizeLoading && (
                <div ref={containerRef} className={styles.contentContainer} style={containerStyle}>
                    <div className={styles.innerContainer} style={innerContainerStyle}>
                        <div style={{ marginBottom: '20px' }}>
                            <AnimatedSummary
                                title={summary.title}
                                summary1={summary.summary[0]}
                                summary2={summary.summary[1]}
                                summary3={summary.summary[2]}
                                backgroundImage={BACKGROUND_IMAGE_PATH}
                            />
                            <AppButton title={OPEN_ORIGINAL_ARTICLE} onClick={() => window.open(summary.articleUrl, '_blank')} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SummaryDetail;
