"use client";

import { useEffect, useState } from 'react';
import { firestore } from './firebase/firebase';

interface Article {
  id: string;
  title: string;
}

const Home = () => {
  const [articles, setArticles] = useState<Article[]>([]);

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

  return (
    <div>
      <h1>Generated Summaries</h1>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <h1>{article.title}</h1>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
