import React from 'react';
import Link from 'next/link';
import styles from './SummaryList.module.css';
import { BACKGROUND_IMAGE_PATH } from '@/constants/constants';

interface Summary {
    id: string;
    title: string;
    imageUrl: string;
}

interface SummaryListProps {
    summaries: Summary[];
    isLoading: boolean;
    title: string;
}

const SummaryList: React.FC<SummaryListProps> = ({ summaries, isLoading, title }) => {

    return (
        <div className={styles.summaryListContainer}>
            <h2 className={styles.summaryListHeader}>{title}</h2>
            <div className={styles.summaryList}>
                {isLoading ? (
                    Array.from({ length: 12 }).map((_, index) => (
                        <div key={index} className={styles.skeleton}>
                            <img src={BACKGROUND_IMAGE_PATH} alt="Loading" className={styles.skeletonImage} />
                            <div className={styles.shimmer}></div>
                        </div>
                    ))
                ) : (
                    [...summaries, ...(summaries.length % 3 === 0 ? [] : Array(3 - (summaries.length % 3)).fill(null))].map(
                        (summary, index) =>
                            summary ? (
                                <div key={summary.id} className={styles.article}>
                                    <Link href={`/summary/${summary.id}`}>
                                        <img src={summary.imageUrl} alt={summary.title} className={styles.image} />
                                    </Link>
                                </div>
                            ) : (
                                <div key={`placeholder-${index}`} className={styles.article} style={{ visibility: 'hidden' }} />
                            )
                    )
                )}
            </div>
        </div>
    );
};

export default SummaryList;