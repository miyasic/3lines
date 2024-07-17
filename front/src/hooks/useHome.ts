import { useEffect, useRef, useState } from 'react';
import { firestore, functions } from '../firebase/firebase';
import { topPageStateCopyWith, summaryResponseCopyWith } from '@/utils/helpers';
import { useRouter } from 'next/navigation';
import { ASPECT_RATIO, PAGE_INNER_MAX_WIDTH, PAGE_MAX_WIDTH } from '@/constants/constants';

const URL_REGEX = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-]*)*\/?$/;

export const useHome = () => {
    const [state, setState] = useState<TopPageState>({
        summaries: [],
        url: '',
        isValidUrl: false,
        isAllUnderLimit: true,
        summarizedArticleUrl: '',
        windowSizeLoading: true,
        fetchSummariesLoading: false,
        summarizeLoading: false,
        saveSummaryLoading: false,
        summary: null,
        editedSummary: null,
    });
    const [containerStyle, setContainerStyle] = useState({});
    const [imagePreviewStyle, setImagePreviewStyle] = useState({});
    const [innerContainerStyle, setInnerContainerStyle] = useState({});
    const router = useRouter();
    const containerRef = useRef(null);

    useEffect(() => {
        const fetchSummaries = async () => {
            setState(prevState => topPageStateCopyWith(prevState, { fetchSummariesLoading: true }));

            try {
                const snapshot = await firestore.collection('summary').get();
                const summariesData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Summary[];

                console.log(`Fetched ${summariesData.length} summaries`);

                setState(prevState => topPageStateCopyWith(prevState, { summaries: summariesData, fetchSummariesLoading: false }));
            } catch (error) {
                console.error("Error fetching summaries:", error);
                setState(prevState => topPageStateCopyWith(prevState, { fetchSummariesLoading: false }));
            }
        };

        const updateLayout = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const containerHeight = Math.floor(windowHeight * 2 / 3);
            const containerWidth = Math.min(windowWidth - 40, PAGE_MAX_WIDTH); // 左右に20pxずつのパディングを確保
            const innerWidth = Math.min(containerWidth - 40, PAGE_INNER_MAX_WIDTH); // 内部要素にも左右10pxずつのパディングを追加

            setContainerStyle({
                height: `${containerHeight}px`,
                width: `${containerWidth}px`,
                padding: '0 20px', // 左右のパディングを追加
            });

            setInnerContainerStyle({
                width: `${innerWidth}px`,
                margin: '0 auto',
                padding: '0 10px', // 内部要素にパディングを追加
            });

            const imageWidth = innerWidth - 20; // パディングを考慮
            const imageHeight = Math.min(imageWidth / ASPECT_RATIO, containerHeight - 80); // ボタンとマージンのスペースを増やす
            const imageWidth2 = imageHeight * ASPECT_RATIO;

            setImagePreviewStyle({
                width: `${imageWidth2}px`,
                height: `${imageHeight}px`,
                margin: '0 auto',
            });
            setState(prevState => topPageStateCopyWith(prevState, { windowSizeLoading: false }));
        };

        updateLayout();
        window.addEventListener('resize', updateLayout);
        fetchSummaries();

        return () => window.removeEventListener('resize', updateLayout);
    }, []);

    const setIsAllUnderLimit = (isAllUnderLimit: boolean) => {
        setState(prevState => topPageStateCopyWith(prevState, { isAllUnderLimit }));
    }
    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value;
        setState(prevState => topPageStateCopyWith(prevState, { url: event.target.value, isValidUrl: URL_REGEX.test(url) }));
    };

    const handleSubmit = async () => {
        setState(prevState => topPageStateCopyWith(prevState, { summarizeLoading: true }));

        const summarizeFunction = functions.httpsCallable('summarize');

        try {
            const url = state.url;
            const result = await summarizeFunction({ url });

            console.log('Function result:', result);

            const data = result.data as SummaryResponse;
            // summaryを30文字に制限
            const title = data.title.slice(0, 25);
            const summary1 = data.summary1.slice(0, 30);
            const summary2 = data.summary2.slice(0, 30);
            const summary3 = data.summary3.slice(0, 30);
            setState(prevState => topPageStateCopyWith(prevState, {
                url: '',
                summarizedArticleUrl: url,
                summary: {
                    title: title,
                    summary1: summary1,
                    summary2: summary2,
                    summary3: summary3
                },
                editedSummary: {
                    title: title,
                    summary1: summary1,
                    summary2: summary2,
                    summary3: summary3
                },
                summarizeLoading: false
            }));
        } catch (error) {
            console.error("Error summarizing article:", error);
            setState(prevState => topPageStateCopyWith(prevState, { summarizeLoading: false }));
        }
    };

    const saveSummary = async (summaryData: SaveSummaryRequest) => {

        const saveSummaryFunction = functions.httpsCallable('save_summary');
        try {
            const result = await saveSummaryFunction(summaryData);
            console.log('Summary saved:', result.data);

            return result.data.summaryId;
        } catch (error) {
            setState(prevState => topPageStateCopyWith(prevState, { saveSummaryLoading: false }));
            console.error('Error saving summary:', error);
        }
    };

    const handleSaveSummary = async () => {
        if (!state.editedSummary) {
            return;
        }
        setState(prevState => topPageStateCopyWith(prevState, { saveSummaryLoading: true }));
        const requestData: SaveSummaryRequest = {
            articleUrl: state.summarizedArticleUrl,
            title: state.editedSummary.title,
            language: 'ja',
            summary: [state.editedSummary.summary1, state.editedSummary.summary2, state.editedSummary.summary3],
        };
        const summaryId = await saveSummary(requestData);
        if (summaryId) {
            router.push(`/summary/${summaryId}`);
        }
    };

    const updateEditedSummary = (key: keyof SummaryResponse, value: string) => {
        console.log('updateEditedSummary:', key, value);
        setState(prevState => topPageStateCopyWith(prevState, {
            editedSummary: summaryResponseCopyWith(prevState.editedSummary, { [key]: value }),
        }));
    };

    return {
        state,
        containerRef,
        containerStyle,
        innerContainerStyle,
        imagePreviewStyle,
        handleUrlChange,
        handleSubmit,
        handleSaveSummary,
        updateEditedSummary,
        setIsAllUnderLimit,
    };
};
