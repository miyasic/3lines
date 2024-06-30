"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { firestore, functions } from './firebase/firebase';
import styles from './page.module.css';

interface Summary {
  id: string;
  userId: string;
  articleUrl: string;
  imageUrl: string;
  domain: string;
  title: string;
  summary: string[];
  language: string;
}

interface SummaryResponse {
  title: string;
  summary1: string;
  summary2: string;
  summary3: string;
}

interface SaveSummaryRequest {
  articleUrl: string;
  title: string;
  summary: string[];
  language: string;
}

const Home = () => {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [url, setUrl] = useState<string>('');
  const [summarizedArticleUrl, setSummarizedArticleUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [summary, setSummary] = useState<SummaryResponse | null>(null);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const snapshot = await firestore.collection('summary').get();
        const summariesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Summary[];

        console.log(`Fetched ${summariesData.length} summaries`); // 取得した記事の件数をログに表示

        setSummaries(summariesData);
      } catch (error) {
        console.error("Error fetching summaries:", error); // エラーログを表示
      }
    };

    fetchSummaries();
  }, []);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const summarizeFunction = functions.httpsCallable('mock_summarize');

    try {
      const result = await summarizeFunction({ url });

      console.log('Function result:', result); // summarizeFunctionの結果をログに表示

      const data = result.data as SummaryResponse;
      console.log('Parsed data:', data); // パースされたデータをログに表示

      setSummary({
        title: data.title,
        summary1: data.summary1,
        summary2: data.summary2,
        summary3: data.summary3
      });

      console.log('Updated summary:', summary);

      setSummarizedArticleUrl(url);
      setUrl('');


    } catch (error) {
      console.error("Error summarizing article:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Updated summary:', summary); // summaryの変更を追跡してログに表示
  }, [summary]);
  const saveSummary = async (summaryData: SaveSummaryRequest) => {
    const saveSummaryFunction = functions.httpsCallable('save_summary');
    try {
      const result = await saveSummaryFunction(summaryData);
      console.log('Summary saved:', result.data);
    } catch (error) {
      console.error('Error saving summary:', error);
    }
  };

  const handleSaveSummary = async () => {
    if (!summary) {
      return;
    }
    const requestData: SaveSummaryRequest = {
      articleUrl: summarizedArticleUrl,
      title: summary.title,
      language: 'ja',
      summary: [summary.summary1, summary.summary2, summary.summary3],
    }
    await saveSummary(requestData);
    clearAll();
  }

  const clearAll = () => {
    setSummary(null);
    setSummarizedArticleUrl('');
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="記事のURLを入力してください"
          className={styles.input}
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? '要約中...' : '要約を取得'}
        </button>
      </form>


      {summary && (
        <div className={styles.summary}>
          <h2>{summary.title}</h2>
          <p>{summary.summary1}</p>
          <p>{summary.summary2}</p>
          <p>{summary.summary3}</p>
          <p>元の記事: {summarizedArticleUrl}</p>
          <button onClick={handleSaveSummary} className={styles.saveButton}>
            記事を保存
          </button>
        </div>
      )}

      <div className={styles.grid}>
        {summaries.map(summary => (
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
