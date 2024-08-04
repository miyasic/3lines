import { LIST_SIZE_TWELVE } from "@/constants/constants";
import { firestore } from "@/firebase/firebase";
import { ListPageStateCopyWith } from "@/utils/helpers";
import { useCallback, useEffect, useState } from "react";

export const useList = () => {
    const [state, setState] = useState<ListPageState>({
        summaries: [],
        fetchSummariesLoading: false,
        noMoreSummaries: false
    });

    const [lastVisible, setLastVisible] = useState<any>(null);
    const [hasMore, setHasMore] = useState(true);
    const [initialLoadCompleted, setInitialLoadCompleted] = useState(false); // 初回ロードの完了を追跡

    const fetchInitialSummaries = useCallback(async () => {
        if (initialLoadCompleted || state.fetchSummariesLoading) return; // 初回ロードが完了していればスキップ

        setState(prevState => ListPageStateCopyWith(prevState, { fetchSummariesLoading: true }));

        try {

            let query = firestore.collection('summary')
                .where('isPrivate', '==', false)
                .orderBy('createdAt', 'desc')
                .limit(LIST_SIZE_TWELVE);

            const snapshot = await query.get();
            if (!snapshot.empty) {
                const newLastVisible = snapshot.docs[snapshot.docs.length - 1];
                const summariesData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Summary[];

                setLastVisible(newLastVisible);
                setState(prevState => ListPageStateCopyWith(prevState, {
                    summaries: summariesData,
                    fetchSummariesLoading: false,
                    noMoreSummaries: summariesData.length < LIST_SIZE_TWELVE
                }));
                setInitialLoadCompleted(true); // 初回ロード完了を設定
            } else {
                setHasMore(false);
                setState(prevState => ListPageStateCopyWith(prevState, { fetchSummariesLoading: false }));
            }
        } catch (error) {
            console.error("Error fetching initial summaries:", error);
            setState(prevState => ListPageStateCopyWith(prevState, { fetchSummariesLoading: false }));
        }
    }, [initialLoadCompleted]);

    const fetchMoreSummaries = useCallback(async () => {
        if (state.fetchSummariesLoading || !hasMore || !initialLoadCompleted) return;

        setState(prevState => ListPageStateCopyWith(prevState, { fetchSummariesLoading: true }));

        try {

            let query = firestore.collection('summary')
                .where('isPrivate', '==', false)
                .orderBy('createdAt', 'desc')
                .limit(LIST_SIZE_TWELVE);

            if (lastVisible) {
                query = query.startAfter(lastVisible);
            }

            const snapshot = await query.get();
            if (!snapshot.empty) {
                const newLastVisible = snapshot.docs[snapshot.docs.length - 1];
                const summariesData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Summary[];

                setLastVisible(newLastVisible);
                setState(prevState => ListPageStateCopyWith(prevState, {
                    summaries: [...prevState.summaries, ...summariesData],
                    fetchSummariesLoading: false,
                    noMoreSummaries: summariesData.length < LIST_SIZE_TWELVE
                }));
            } else {
                setHasMore(false);
                setState(prevState => ListPageStateCopyWith(prevState, { fetchSummariesLoading: false }));
            }
        } catch (error) {
            console.error("Error fetching more summaries:", error);
            setState(prevState => ListPageStateCopyWith(prevState, { fetchSummariesLoading: false }));
        }
    }, [lastVisible, hasMore, initialLoadCompleted]);

    useEffect(() => {
        fetchInitialSummaries(); // 初回データ取得
    }, [fetchInitialSummaries]);

    return {
        state,
        fetchMoreSummaries
    };
};
