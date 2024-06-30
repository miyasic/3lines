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
    loading: false,
    summary: null
  });
  const router = useRouter();

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const snapshot = await firestore.collection('summary').get();
        const summariesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Summary[];

        console.log(`Fetched ${summariesData.length} summaries`); // 取得した記事の件数をログに表示

        setState(topPageStateCopyWith(state, { summaries: summariesData }));
      } catch (error) {
        console.error("Error fetching summaries:", error); // エラーログを表示
      }
    };

    fetchSummaries();
  }, []);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(topPageStateCopyWith(state, { url: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState(topPageStateCopyWith(state, { loading: true }));
    const summarizeFunction = functions.httpsCallable('mock_summarize');

    try {
      const url = state.url;
      const result = await summarizeFunction({ url }); // summarizeFunctionを呼び出す

      console.log('Function result:', result); // summarizeFunctionの結果をログに表示

      const data = result.data as SummaryResponse;
      setState(topPageStateCopyWith(state, {
        summary: {
          title: data.title,
          summary1: data.summary1,
          summary2: data.summary2,
          summary3: data.summary3
        }
      }));
      setState(topPageStateCopyWith(state, { url: '', summarizedArticleUrl: state.url }));


    } catch (error) {
      console.error("Error summarizing article:", error);
    } finally {
      setState(topPageStateCopyWith(state, { loading: false }));
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
    }
    const summaryId = await saveSummary(requestData);
    if (summaryId) {
      router.push(`/summary/${summaryId}`); // summaryIdを使用して詳細ページに遷移
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={state.url}
          onChange={handleUrlChange}
          placeholder="記事のURLを入力してください"
          className={styles.input}
        />
        <button type="submit" className={styles.button} disabled={state.loading}>
          {state.loading ? '要約中...' : '要約を取得'}
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
        {state.summaries.map(summary => (
          <div key={summary.id} className={styles.article}>
            <Link href={`/summary/${summary.id}`}>
              <img src={summary.imageUrl} alt={summary.title} className={styles.image} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
