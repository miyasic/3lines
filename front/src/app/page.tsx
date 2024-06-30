"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { firestore, functions } from './firebase/firebase';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

const topPageStateCopyWith = (state: TopPageState, updates: Partial<TopPageState>): TopPageState => {
  return { ...state, ...updates };
};

const Home = () => {
  const [state, setState] = useState<TopPageState>({
    summaries: [],
    url: '',
    summarizedArticleUrl: '',
    fetchSummariesLoading: false,
    summarizeLoading: false,
    saveSummaryLoading: false,
    summary: null
  });
  const router = useRouter();

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

    fetchSummaries();
  }, []);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prevState => topPageStateCopyWith(prevState, { url: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState(prevState => topPageStateCopyWith(prevState, { summarizeLoading: true }));

    const summarizeFunction = functions.httpsCallable('mock_summarize');

    try {
      const url = state.url;
      const result = await summarizeFunction({ url });

      console.log('Function result:', result);

      const data = result.data as SummaryResponse;
      setState(prevState => topPageStateCopyWith(prevState, {
        url: '',
        summarizedArticleUrl: url,
        summary: {
          title: data.title,
          summary1: data.summary1,
          summary2: data.summary2,
          summary3: data.summary3
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
      console.error('Error saving summary:', error);
    }
  };

  const handleSaveSummary = async () => {
    if (!state.summary) {
      return;
    }
    const requestData: SaveSummaryRequest = {
      articleUrl: state.summarizedArticleUrl,
      title: state.summary.title,
      language: 'ja',
      summary: [state.summary.summary1, state.summary.summary2, state.summary.summary3],
    };
    const summaryId = await saveSummary(requestData);
    if (summaryId) {
      router.push(`/summary/${summaryId}`);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          今北産業
        </Link>
      </header>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={state.url}
          onChange={handleUrlChange}
          placeholder="記事のURLを入力してください"
          className={styles.input}
        />
        <button type="submit" className={styles.button} disabled={state.summarizeLoading}>
          {state.summarizeLoading ? '要約中...' : '要約を取得'}
        </button>
      </form>

      {state.summary && (
        <div className={styles.summary}>
          <h2>{state.summary.title}</h2>
          <p>{state.summary.summary1}</p>
          <p>{state.summary.summary2}</p>
          <p>{state.summary.summary3}</p>
          <p>元の記事: {state.summarizedArticleUrl}</p>
          <button onClick={handleSaveSummary} className={styles.saveButton}>
            記事を保存
          </button>
        </div>
      )}

      <div className={styles.grid}>
        {state.fetchSummariesLoading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className={styles.skeleton}>
              <img src="/default_background.png" alt="Loading" className={styles.skeletonImage} />
              <div className={styles.shimmer}></div>
            </div>
          ))
        ) : (
          state.summaries.map(summary => (
            <div key={summary.id} className={styles.article}>
              <Link href={`/summary/${summary.id}`}>
                <img src={summary.imageUrl} alt={summary.title} className={styles.image} />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
