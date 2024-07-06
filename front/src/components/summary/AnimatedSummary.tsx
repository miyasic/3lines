import React, { useState } from 'react';
import TypingAnimation from '../TypingAnimation';
import CommonLayout from './CommonLayout';

type AnimatedSummaryProps = {
    title: string;
    summary1: string;
    summary2: string;
    summary3: string;
    backgroundImage: string;
};

const AnimatedSummary: React.FC<AnimatedSummaryProps> = ({ title, summary1, summary2, summary3, backgroundImage }) => {
    const [showSummary1, setShowSummary1] = useState(false);
    const [showSummary2, setShowSummary2] = useState(false);
    const [showSummary3, setShowSummary3] = useState(false);

    return (
        <CommonLayout
            title={title}
            summary1={<TypingAnimation text={summary1} speed={25} onComplete={() => setShowSummary1(true)} />}
            summary2={showSummary1 ? <TypingAnimation text={summary2} speed={25} onComplete={() => setShowSummary2(true)} /> : null}
            summary3={showSummary2 ? <TypingAnimation text={summary3} speed={25} /> : null}
            backgroundImage={backgroundImage}
        />
    );
};

export default AnimatedSummary;
