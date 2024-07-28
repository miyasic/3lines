"use client";


import React from 'react';
import styles from './page.module.css';
import Header from '@/components/layout/Header';
import { PAGE_MAX_WIDTH } from '@/constants/constants';
import Footer from '@/components/layout/Footer';
import SummaryList from '@/components/summary/SummaryList';
import { MY_SUMMARY_LIST } from '@/constants/constantsTexts';
import { useMyPage } from '@/hooks/useMyPage';
import SignOutButton from '@/components/button/SignOutButton';
import { signOut } from '@/firebase/firebase';

const MyPage: React.FC = () => {
    const { userSummaries, isLoading } = useMyPage();
    return (
        <div className={styles.pageContainer} style={{ maxWidth: PAGE_MAX_WIDTH }}>
            <Header />
            <main className={styles.mainContent}>
                <div className={styles.container}>
                    <SummaryList
                        summaries={userSummaries}
                        isLoading={isLoading}
                        title={MY_SUMMARY_LIST}
                    />

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MyPage;