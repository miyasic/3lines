"use client";

import { useEffect, useState } from 'react';
import { firestore } from '../../firebase/firebase';
import React from 'react';
import { useParams } from 'next/navigation';

interface Summary {
    id: string;
    title: string;
    summary: string[];
}

const SummaryDetail = () => {
    const [summary, setSummary] = useState<Summary | null>(null);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchSummary = async () => {
                const doc = await firestore.collection('summary').doc(id as string).get();
                if (doc.exists) {
                    setSummary({
                        id: doc.id,
                        ...doc.data()
                    } as Summary);
                } else {
                    console.error("No such document!");
                }
            };

            fetchSummary();
        }
    }, [id]);

    if (!summary) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold mb-5">{summary.title}</h1>
            <ul className="list-disc pl-5">
                {summary.summary.map((point, index) => (
                    <li key={index} className="mb-2">{point}</li>
                ))}
            </ul>
        </div>
    );
};

export default SummaryDetail;
