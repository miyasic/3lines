"use client";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import SummaryList from "@/components/summary/SummaryList";
import { PAGE_MAX_WIDTH } from "@/constants/constants";
import { MORE, SUMMARY_LIST, THIS_IS_ALL } from "@/constants/constantsTexts";
import { useList } from "@/hooks/useList";
import styles from './page.module.css';
import AppButton from "@/components/button/AppButton";

const List: React.FC = () => {
    const { state, fetchMoreSummaries } = useList();

    return (
        <div className="pageContainer" style={{ maxWidth: PAGE_MAX_WIDTH }}>
            <Header />
            <main className={styles.mainContent}>
                <SummaryList summaries={state.summaries} isLoading={state.fetchSummariesLoading} title={SUMMARY_LIST} />
                {state.noMoreSummaries ? <p className={styles.noMoreMessage}>
                    {THIS_IS_ALL}
                </p>
                    : <AppButton title={MORE} onClick={() => fetchMoreSummaries()} />
                }
            </main>

            <Footer />
        </div>
    );
};

export default List;