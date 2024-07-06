import React, { useState } from 'react';
import TypingAnimation from '../TypingAnimation';
import styles from './AnimatedSummary.module.css';

type AnimatedSummaryProps = {
    title: string;
    summary1: string;
    summary2: string;
    summary3: string;
};

const AnimatedSummary: React.FC<AnimatedSummaryProps> = ({ title, summary1, summary2, summary3 }) => {
    const [showSummary1, setShowSummary1] = useState(false);
    const [showSummary2, setShowSummary2] = useState(false);
    const [showSummary3, setShowSummary3] = useState(false);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{title}</h1>
            {<p className={styles.summary}><TypingAnimation text={summary1} speed={25} onComplete={() => setShowSummary1(true)} /></p>}
            {showSummary1 && <p className={styles.summary}><TypingAnimation text={summary2} speed={25} onComplete={() => setShowSummary2(true)} /></p>}
            {showSummary2 && <p className={styles.summary}><TypingAnimation text={summary3} speed={25} /></p>}
        </div>
    );
};

export default AnimatedSummary;
