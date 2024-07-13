'use client';

import { BACKGROUND_IMAGE_PATH, PAGE_MAX_WIDTH } from '@/constants/constants';
import styles from '../app/summary/[id]/page.module.css';
import Header from './layout/Header';
import AnimatedSummary from './summary/AnimatedSummary';
import { OPEN_ORIGINAL_ARTICLE } from '@/constants/constantsTexts';
import AppButton from './button/AppButton';
import { useSummaryDetail } from '@/hooks/useSummaryDetail';


interface SummaryDetailProps {
    summary: Summary;
}


export const SummaryDetailClient: React.FC<SummaryDetailProps> = ({ summary }) => {
    const { containerRef, containerStyle, innerContainerStyle, windowSizeLoading } = useSummaryDetail(summary);
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
}