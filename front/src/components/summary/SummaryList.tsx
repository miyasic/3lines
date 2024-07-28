import React, { useState } from 'react';
import Link from 'next/link';
import styles from './SummaryList.module.css';
import { BACKGROUND_IMAGE_PATH } from '@/constants/constants';
import { usePathname } from 'next/navigation';
import { KeyIcon, TrashIcon } from '@heroicons/react/24/solid';

interface Summary {
    id: string;
    title: string;
    imageUrl: string;
    content?: string;  // ダイアログに表示する内容
}


interface SummaryListProps {
    summaries: Summary[];
    isLoading: boolean;
    title: string;
}

const SummaryList: React.FC<SummaryListProps> = ({ summaries, isLoading, title }) => {
    const [selectedSummary, setSelectedSummary] = useState<Summary | null>(null);
    const pathname = usePathname();
    const isMyPage = pathname === '/mypage';

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Delete', id);
        // if (onDelete) {
        //     onDelete(id);
        // }
    };


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
                                <div key={summary.id} className={`${styles.article} ${isMyPage ? styles.articleHoverable : ''}`}>
                                    <Link href={`/summary/${summary.id}`}>
                                        <div className={styles.imageContainer}>
                                            <img src={summary.imageUrl} alt={summary.title} className={styles.image} />
                                            {isMyPage && (
                                                <div className={styles.deleteIconWrapper}>
                                                    <KeyIcon
                                                        className={styles.deleteIcon}
                                                        onClick={(e) => handleDelete(e, summary.id)}
                                                    />
                                                </div>
                                            )}
                                        </div>
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