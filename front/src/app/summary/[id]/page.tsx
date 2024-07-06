"use client";

import React, { useEffect, useState } from 'react';
import { firestore } from '../../../firebase/firebase';
import { useParams } from 'next/navigation';
import Header from '../../../components/Header';

const MAX_WIDTH = 1500;
const INNER_MAX_WIDTH = 600;
const IMAGE_WIDTH = 1200;
const IMAGE_HEIGHT = 628;
const ASPECT_RATIO = IMAGE_HEIGHT / IMAGE_WIDTH;

const SummaryDetail = () => {
    const [summary, setSummary] = useState<Summary | null>(null);
    const [countdown, setCountdown] = useState(3);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchSummary = async () => {
                try {
                    const doc = await firestore.collection('summary').doc(id as string).get();
                    if (doc.exists) {
                        setSummary({
                            id: doc.id,
                            ...doc.data()
                        } as Summary);
                    } else {
                        console.error("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching document:", error);
                }
            };

            fetchSummary();
        }
    }, [id]);

    useEffect(() => {
        if (summary) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        window.open(summary.articleUrl, '_blank');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [summary]);


    if (!summary) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '24px',
                fontWeight: 'bold'
            }}>
                Loading...
            </div>
        );
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            width: '100%',
            maxWidth: `${MAX_WIDTH}px`,
            margin: '0 auto',
            padding: '20px',
            boxSizing: 'border-box',
        }}>
            <Header />
            <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: `${INNER_MAX_WIDTH}px`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <div style={{
                        width: '100%',
                        paddingBottom: `${ASPECT_RATIO * 100}%`,
                        position: 'relative',
                        marginBottom: '20px'
                    }}>
                        <img
                            src={summary.imageUrl}
                            alt={summary.title}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '10px'
                            }}
                        />
                    </div>
                    <button
                        onClick={() => window.open(summary.articleUrl, '_blank')}
                        style={{
                            width: 'auto', // 幅を自動に設定
                            minWidth: '200px', // 最小幅を設定
                            padding: '12px 24px', // パディングを調整
                            backgroundColor: '#38a169',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px', // フォントサイズを調整
                            fontWeight: 'bold', // フォントを太くする
                            transition: 'background-color 0.3s', // トランジション効果を追加
                            margin: '0 auto', // 中央に配置
                            display: 'block', // ブロック要素に変更
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2f855a'} // ホバー時の色を設定
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#38a169'} // マウスが離れたときの色を元に戻す
                    >
                        記事を開く
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SummaryDetail;