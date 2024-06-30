
interface TopPageState {
    summaries: Summary[];
    url: string;
    summarizedArticleUrl: string;
    loading: boolean;
    summary: SummaryResponse | null;
}

