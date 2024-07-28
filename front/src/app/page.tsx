"use client";
import styles from './page.module.css';
import Header from '../components/layout/Header';
import { BACKGROUND_IMAGE_PATH, PAGE_INNER_MAX_WIDTH, PAGE_MAX_WIDTH } from '@/constants/constants';
import { GET_SUMMARY, INPUT_URL, REGISTER_SUMMARY, SUMMARY_LIST } from '@/constants/constantsTexts';
import { useHome } from '@/hooks/useHome';
import ImagePreview from '@/components/IMagePreview';
import Footer from '@/components/layout/Footer';
import AppButton from '@/components/button/AppButton';
import SummaryList from '@/components/summary/SummaryList';



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
    setIsAllUnderLimit,
  } = useHome();

  return (

    <div className="pageContainer" style={{ maxWidth: PAGE_MAX_WIDTH }}>
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
                    setIsAllUnderLimit={setIsAllUnderLimit}
                    backgroundImage={BACKGROUND_IMAGE_PATH}
                    style={{ ...imagePreviewStyle, maxWidth: '100%' }}
                  />
                </div>
                <AppButton title={REGISTER_SUMMARY} onClick={handleSaveSummary} disabled={!state.isAllUnderLimit} isLoading={state.saveSummaryLoading} />
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
                <AppButton title={GET_SUMMARY} onClick={handleSubmit} disabled={!state.isValidUrl} isLoading={state.summarizeLoading} />
              </div>
            )}
          </div>
        </div>
      )}
      {!state.windowSizeLoading && (
        <SummaryList summaries={state.summaries} isLoading={state.fetchSummariesLoading} title={SUMMARY_LIST} />
      )}
      {!state.windowSizeLoading && (
        <Footer />
      )}
    </div>
  );
};

export default Home;