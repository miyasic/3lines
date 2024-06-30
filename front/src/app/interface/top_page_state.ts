
interface TopPageState {
    summaries: Summary[];
    url: string;
    summarizedArticleUrl: string;
    fetchSummariesLoading: boolean;
    summarizeLoading: boolean;
    saveSummaryLoading: boolean;
    summary: SummaryResponse | null;
}

