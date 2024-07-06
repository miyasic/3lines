"use client";

import Link from 'next/link';
import styles from './page.module.css';
import ImagePreview from '../components/IMagePreview';
import Header from '../components/Header';
import { BACKGROUND_IMAGE_PATH, PAGE_INNER_MAX_WIDTH, PAGE_MAX_WIDTH } from '@/constants/constants';
import AppButton from '@/components/AppButton';
import { GET_SUMMARY, REGISTER_SUMMARY } from '@/constants/constantsTexts';
import { useHome } from '@/hooks/useHome';



const Home = () => {
  const {
    state,
    containerRef,
    containerStyle,
    innerContainerStyle,
    imagePreviewStyle,
    handleUrlChange,
    handleSubmit,
    handleSaveSummary,
    updateEditedSummary,
  } = useHome();

  return (

    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      maxWidth: `${PAGE_MAX_WIDTH}px`,
      margin: '0 auto',
      padding: '20px',
      boxSizing: 'border-box',
    }}>
      <Header />
      {!state.windowSizeLoading && (
        <div ref={containerRef} style={{
          ...containerStyle,
          marginBottom: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
          <div style={{
            ...innerContainerStyle,
            width: '100%',
            maxWidth: `${PAGE_INNER_MAX_WIDTH}px`,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            {state.summary ? (
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                <div style={{ marginBottom: '20px' }}>
                  <ImagePreview
                    title={state.summary.title}
                    summary1={state.summary.summary1}
                    summary2={state.summary.summary2}
                    summary3={state.summary.summary3}
                    setTitle={title => updateEditedSummary('title', title)}
                    setSummary1={summary1 => updateEditedSummary('summary1', summary1)}
                    setSummary2={summary2 => updateEditedSummary('summary2', summary2)}
                    setSummary3={summary3 => updateEditedSummary('summary3', summary3)}
                    backgroundImage={BACKGROUND_IMAGE_PATH}
                    style={{ ...imagePreviewStyle, maxWidth: '100%' }}
                  />
                </div>
                <AppButton title={REGISTER_SUMMARY} onClick={handleSaveSummary} />
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
                    padding: '12px', // パディングを少し増やす
                    marginBottom: '20px', // 下マージンを20pxに増やす
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                    fontSize: '16px', // フォントサイズを指定
                  }}
                />
                <AppButton title={GET_SUMMARY} onClick={handleSubmit} />
              </div>
            )}
          </div>
        </div>
      )}

      {!state.windowSizeLoading && (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          width: '100%',
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '10px',
            flexShrink: 0,
          }}>
            保存された要約一覧
          </h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
          }}>
            {state.fetchSummariesLoading ?
              (Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className={styles.skeleton}>
                  <img src="/default_background.png" alt="Loading" className={styles.skeletonImage} />
                  <div className={styles.shimmer}></div>
                </div>
              ))) :
              [...state.summaries, ...Array(3 - (state.summaries.length % 3)).fill(null)].map((summary, index) => (
                summary ? (
                  <div key={summary.id} className={styles.article}>
                    <Link href={`/summary/${summary.id}`}>
                      <img src={summary.imageUrl} alt={summary.title} className={styles.image} />
                    </Link>
                  </div>
                ) : (
                  <div key={`placeholder-${index}`} className={styles.article} style={{ visibility: 'hidden' }} />
                )
              ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
