export const topPageStateCopyWith = (state: TopPageState, updates: Partial<TopPageState>): TopPageState => {
    return { ...state, ...updates };
};

export const summaryResponseCopyWith = (summaryResponse: SummaryResponse | null, update: Partial<SummaryResponse>): SummaryResponse => {
    if (!summaryResponse) {
        return {
            ...{
                title: "",
                summary1: "",
                summary2: "",
                summary3: ""
            },
            ...update
        };
    }
    return {
        ...summaryResponse,
        ...update
    };
};

export const myPageStateCopyWith = (state: MyPageState, updates: Partial<MyPageState>): MyPageState => {
    return { ...state, ...updates };
};