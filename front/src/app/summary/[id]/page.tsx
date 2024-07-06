"use client";

import React from 'react';
import { useSummaryDetail } from '@/hooks/useSummaryDetail';
import Header from '../../../components/Header';
import { PAGE_INNER_MAX_WIDTH, PAGE_MAX_WIDTH } from '@/constants/constants';
import AppButton from '@/components/AppButton';
import { OPEN_ORIGINAL_ARTICLE } from '@/constants/constantsTexts';
import styles from './page.module.css';
import '../../globals.css';
import AnimatedSummary from '@/components/summary/AnimatedSummary';

const SummaryDetail = () => {
    const { summary, countdown } = useSummaryDetail();

    if (!summary) {
        return (
            <div className="loading">
                Loading...
            </div>
        );
    }

    return (
        <div className="pageContainer" style={{ maxWidth: PAGE_MAX_WIDTH }}>
            <Header />
            <div className={styles.contentContainer}>
                <div className={styles.innerContainer} style={{ maxWidth: `${PAGE_INNER_MAX_WIDTH}px` }}>
                    {/* <div className={styles.imageContainer}>
                        <img
                            src={summary.imageUrl}
                            alt={summary.title}
                            className={styles.image}
                        />
                    </div> */}
                    <AnimatedSummary
                        title={summary.title}
                        summary1={summary.summary[0]}
                        summary2={summary.summary[1]}
                        summary3={summary.summary[2]}
                    />
                    <AppButton title={OPEN_ORIGINAL_ARTICLE} onClick={() => window.open(summary.articleUrl, '_blank')} />
                </div>
            </div>
        </div>
    );
};

export default SummaryDetail;
