"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { firestore } from './firebase/firebase';
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

const Home = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [url, setUrl] = useState<string>('');

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!url) return;

    // ここでFirebase Functionsなどを使って記事のデータを生成して保存する処理を実装する
    // 例: functions.saveArticle(url);

    console.log('URL submitted:', url);
    setUrl(''); // 入力欄をクリア
  };

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
        <button type="submit" className={styles.button}>登録</button>
      </form>
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
