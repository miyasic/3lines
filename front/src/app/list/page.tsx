"use client";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import SummaryList from "@/components/summary/SummaryList";
import { PAGE_MAX_WIDTH } from "@/constants/constants";
import { SUMMARY_LIST } from "@/constants/constantsTexts";
import { useList } from "@/hooks/useList";
import styles from './page.module.css';

const List = () => {
    const { state } = useList();

    return (
        <div className="pageContainer" style={{ maxWidth: PAGE_MAX_WIDTH }}>
            <Header />
            <main className={styles.mainContent}>
                <SummaryList summaries={state.summaries} isLoading={state.fetchSummariesLoading} title={SUMMARY_LIST} />
            </main>
            <Footer />
        </div>
    );
};

export default List;