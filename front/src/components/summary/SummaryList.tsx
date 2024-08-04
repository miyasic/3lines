import React, { useState } from 'react';
import Link from 'next/link';
import styles from './SummaryList.module.css';
import { BACKGROUND_IMAGE_PATH } from '@/constants/constants';
import { usePathname } from 'next/navigation';
import { TrashIcon } from '@heroicons/react/24/solid';
import CustomDialog from '@/components/dialog';
import { CONFIRM_DELETE_SUMMARY } from '@/constants/constantsTexts';
import { makeSummaryPrivate } from '@/firebase/firebase';

interface Summary {
    id: string;
    title: string;
    imageUrl: string;
    content?: string;
}

interface SummaryListProps {
    summaries: Summary[];
    isLoading: boolean;
    title: string;
    onDelete?: (id: string) => void; // 削除処理を行う関数
}

const SummaryList: React.FC<SummaryListProps> = ({ summaries, isLoading, title, onDelete }) => {
    const [selectedSummary, setSelectedSummary] = useState<Summary | null>(null);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const pathname = usePathname();
    const isMyPage = pathname === '/mypage';

    const showDeleteDialog = (e: React.MouseEvent, summary: Summary) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedSummary(summary);
        setIsConfirmDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedSummary) {
            makeSummaryPrivate(selectedSummary.id);
        }
        setIsConfirmDialogOpen(false);
        setSelectedSummary(null);
    };

    const handleCancelDelete = () => {
        setIsConfirmDialogOpen(false);
        setSelectedSummary(null);
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
                                                <div className={styles.deleteIconWrapper} onClick={(e) => showDeleteDialog(e, summary)}>
                                                    <TrashIcon
                                                        className={styles.deleteIcon}
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
            <CustomDialog
                isOpen={isConfirmDialogOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                title={`「${selectedSummary?.title}」を非公開にしますか？`}
                message={CONFIRM_DELETE_SUMMARY}
            />
        </div>
    );
};

export default SummaryList;