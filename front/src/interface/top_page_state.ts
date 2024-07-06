
interface TopPageState {
    summaries: Summary[];
    url: string;
    summarizedArticleUrl: string;
    windowSizeLoading: boolean;
    fetchSummariesLoading: boolean;
    summarizeLoading: boolean;
    saveSummaryLoading: boolean;
    summary: SummaryResponse | null;
    editedSummary: SummaryResponse | null;
}

