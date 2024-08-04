import { firestore } from "@/firebase/firebase";
import { ListPageStateCopyWith } from "@/utils/helpers";
import { useEffect, useState } from "react"

export const useList = () => {
    const [state, setState] = useState<ListPageState>({
        summaries: [],
        fetchSummariesLoading: false,
    });

    useEffect(() => {
        const fetchSummaries = async () => {
            setState(prevState => ListPageStateCopyWith(prevState, { fetchSummariesLoading: true }));

            try {
                const snapshot = await firestore.collection('summary').where('isPrivate', '==', false).orderBy('createdAt', 'desc').get();
                const summariesData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Summary[];

                console.log(`Fetched ${summariesData.length} summaries`);

                setState(prevState => ListPageStateCopyWith(prevState, { summaries: summariesData, fetchSummariesLoading: false }));
            } catch (error) {
                console.error("Error fetching summaries:", error);
                setState(prevState => ListPageStateCopyWith(prevState, { fetchSummariesLoading: false }));
            }
        };

        fetchSummaries();
    }, []);

    return {
        state: state,
    };
}