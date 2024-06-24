"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { firestore } from '../../firebase/firebase';
import React from 'react';
import { useParams } from 'next/navigation';

interface Article {
    id: string;
    title: string;
    summary: string[];
}

const ArticleDetail = () => {
    const [article, setArticle] = useState<Article | null>(null);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchArticle = async () => {
                const doc = await firestore.collection('article').doc(id as string).get();
                if (doc.exists) {
                    setArticle({
                        id: doc.id,
                        ...doc.data()
                    } as Article);
                } else {
                    console.error("No such document!");
                }
            };

            fetchArticle();
        }
    }, [id]);

    if (!article) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold mb-5">{article.title}</h1>
            <ul className="list-disc pl-5">
                {article.summary.map((point, index) => (
                    <li key={index} className="mb-2">{point}</li>
                ))}
            </ul>
        </div>
    );
};

export default ArticleDetail;
