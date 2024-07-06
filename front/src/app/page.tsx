"use client";

import Link from 'next/link';
import styles from './page.module.css';
import ImagePreview from '../components/IMagePreview';
import Header from '../components/Header';
import { BACKGROUND_IMAGE_PATH, PAGE_INNER_MAX_WIDTH, PAGE_MAX_WIDTH } from '@/constants/constants';
import AppButton from '@/components/AppButton';
import { GET_SUMMARY, INPUT_URL, REGISTER_SUMMARY } from '@/constants/constantsTexts';
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

    <div className={styles.pageContainer} style={{ maxWidth: PAGE_MAX_WIDTH }}>
      <Header />
      {!state.windowSizeLoading && (
        <div ref={containerRef} className={styles.container} style={containerStyle}>
          <div className={styles.innerContainer} style={{ ...innerContainerStyle, maxWidth: `${PAGE_INNER_MAX_WIDTH}px`, }}>
            {state.summary ? (
              <div className={styles.summaryContainer}>
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
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  value={state.url}
                  onChange={handleUrlChange}
                  placeholder={INPUT_URL}
                  className={styles.input}
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
