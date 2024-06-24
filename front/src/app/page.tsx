"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { firestore, functions } from './firebase/firebase';
import styles from './page.module.css';

interface Article {
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

const Home = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [summary, setSummary] = useState<SummaryResponse | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const snapshot = await firestore.collection('article').get();
        const articlesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Article[];

        console.log(`Fetched ${articlesData.length} articles`); // 取得した記事の件数をログに表示

        setArticles(articlesData);
      } catch (error) {
        console.error("Error fetching articles:", error); // エラーログを表示
      }
    };

    fetchArticles();
  }, []);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const summarizeFunction = functions.httpsCallable('summarize');

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
        </div>
      )}

      <div className={styles.grid}>
        {articles.map(article => (
          <div key={article.id} className={styles.article}>
            <Link href={`/article/${article.id}`}>
              <img src={article.imageUrl} alt={article.title} className={styles.image} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
