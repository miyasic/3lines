"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { firestore, functions } from './firebase/firebase';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import ImagePreview from './components/IMagePreview';
import Header from './components/Header';


const topPageStateCopyWith = (state: TopPageState, updates: Partial<TopPageState>): TopPageState => {
  return { ...state, ...updates };
};

const MAX_WIDTH = 1500; // maxWidth
const INNER_MAX_WIDTH = 600; // 上部要素の最大幅
const ASPECT_RATIO = 1920 / 1005;

const Home = () => {
  const [state, setState] = useState<TopPageState>({
    summaries: [],
    url: '',
    summarizedArticleUrl: '',
    fetchSummariesLoading: false,
    summarizeLoading: false,
    saveSummaryLoading: false,
    summary: null,
    editedSummary: null,
  });
  const [containerStyle, setContainerStyle] = useState({});
  const [imagePreviewStyle, setImagePreviewStyle] = useState({});
  const [innerContainerStyle, setInnerContainerStyle] = useState({});
  const router = useRouter();
  const containerRef = useRef(null);

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
    const updateLayout = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const containerHeight = Math.floor(windowHeight * 2 / 3);
      const containerWidth = Math.min(windowWidth - 40, MAX_WIDTH); // 左右に20pxずつのパディングを確保
      const innerWidth = Math.min(containerWidth - 40, INNER_MAX_WIDTH); // 内部要素にも左右10pxずつのパディングを追加

      setContainerStyle({
        height: `${containerHeight}px`,
        width: `${containerWidth}px`,
        padding: '0 20px', // 左右のパディングを追加
      });

      setInnerContainerStyle({
        width: `${innerWidth}px`,
        margin: '0 auto',
        padding: '0 10px', // 内部要素にパディングを追加
      });

      const imageWidth = innerWidth - 20; // パディングを考慮
      const imageHeight = Math.min(imageWidth / ASPECT_RATIO, containerHeight - 80); // ボタンとマージンのスペースを増やす
      const imageWidth2 = imageHeight * ASPECT_RATIO;

      setImagePreviewStyle({
        width: `${imageWidth2}px`,
        height: `${imageHeight}px`,
        margin: '0 auto',
      });
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    fetchSummaries();

    return () => window.removeEventListener('resize', updateLayout);

  }, []);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prevState => topPageStateCopyWith(prevState, { url: event.target.value }));
  };

  const handleSubmit = async () => {
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
        editedSummary: {
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
    if (!state.editedSummary) {
      return;
    }
    const requestData: SaveSummaryRequest = {
      articleUrl: state.summarizedArticleUrl,
      title: state.editedSummary.title,
      language: 'ja',
      summary: [state.editedSummary.summary1, state.editedSummary.summary2, state.editedSummary.summary3],
    };
    const summaryId = await saveSummary(requestData);
    if (summaryId) {
      router.push(`/summary/${summaryId}`);
    }
  };

  const backgroundImage = '/default_background.png';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      maxWidth: `${MAX_WIDTH}px`,
      margin: '0 auto',
      padding: '20px',
      boxSizing: 'border-box',
    }}>
      <Header />

      <div ref={containerRef} style={{ ...containerStyle, marginBottom: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ ...innerContainerStyle, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {state.summary ? (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
              <div style={{ marginBottom: '20px' }}>
                <ImagePreview
                  title={state.summary.title}
                  summary1={state.summary.summary1}
                  summary2={state.summary.summary2}
                  summary3={state.summary.summary3}
                  setTitle={title => setState(prevState => topPageStateCopyWith(prevState, {
                    editedSummary: {
                      title: title,
                      summary1: state.editedSummary?.summary1 || '',
                      summary2: state.editedSummary?.summary2 || '',
                      summary3: state.editedSummary?.summary3 || '',
                    },
                  }))}
                  setSummary1={summary1 => setState(prevState => topPageStateCopyWith(prevState, {
                    editedSummary: {
                      title: state.editedSummary?.title || '',
                      summary1: summary1,
                      summary2: state.editedSummary?.summary2 || '',
                      summary3: state.editedSummary?.summary3 || '',
                    },
                  }))}
                  setSummary2={summary2 => setState(prevState => topPageStateCopyWith(prevState, {
                    editedSummary: {
                      title: state.editedSummary?.title || '',
                      summary1: state.editedSummary?.summary1 || '',
                      summary2: summary2,
                      summary3: state.editedSummary?.summary3 || '',
                    },
                  }))}
                  setSummary3={summary3 => setState(prevState => topPageStateCopyWith(prevState, {
                    editedSummary: {
                      title: state.editedSummary?.title || '',
                      summary1: state.editedSummary?.summary1 || '',
                      summary2: state.editedSummary?.summary2 || '',
                      summary3: summary3,
                    },
                  }))}
                  backgroundImage={backgroundImage}
                  style={{ ...imagePreviewStyle, maxWidth: '100%' }}
                />
              </div>
              <button
                onClick={handleSaveSummary}
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#38a169',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                {state.summarizeLoading ? '要約中...' : '要約を取得'}
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
              <input
                type="text"
                value={state.url}
                onChange={handleUrlChange}
                placeholder="記事のURLを入力してください"
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  boxSizing: 'border-box'
                }}
              />
              <button
                onClick={handleSubmit}
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#3490dc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                要約を取得
              </button>
            </div>
          )}
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', flexShrink: 0 }}>保存された要約一覧</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', }}>
          {state.summaries.map(summary => (
            <div key={summary.id} className={styles.article}>
              <Link href={`/summary/${summary.id}`}>
                <img src={summary.imageUrl} alt={summary.title} className={styles.image} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
