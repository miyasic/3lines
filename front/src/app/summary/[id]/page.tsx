"use client";

import React from 'react';
import Header from '../../../components/Header';
import { PAGE_MAX_WIDTH, BACKGROUND_IMAGE_PATH } from '@/constants/constants';
import AppButton from '@/components/AppButton';
import { OPEN_ORIGINAL_ARTICLE } from '@/constants/constantsTexts';
import styles from './page.module.css';
import AnimatedSummary from '@/components/summary/AnimatedSummary';
import { useSummaryDetail } from '@/hooks/useSummaryDetail';

const SummaryDetail = () => {
    const { summary, containerRef, containerStyle, innerContainerStyle, windowSizeLoading } = useSummaryDetail();

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
