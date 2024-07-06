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
// 1文字あたりの表示速度を指定するspeedプロパティを追加
const SPEED_PER_CHAR = 25;

const AnimatedSummary: React.FC<AnimatedSummaryProps> = ({ title, summary1, summary2, summary3, backgroundImage }) => {
    const [showSummary1, setShowSummary1] = useState(false);
    const [showSummary2, setShowSummary2] = useState(false);
    const [showSummary3, setShowSummary3] = useState(false);

    return (
        <CommonLayout
            title={title}
            summary1={<TypingAnimation text={summary1} speed={SPEED_PER_CHAR} onComplete={() => setShowSummary1(true)} />}
            summary2={showSummary1 ? <TypingAnimation text={summary2} speed={SPEED_PER_CHAR} onComplete={() => setShowSummary2(true)} /> : null}
            summary3={showSummary2 ? <TypingAnimation text={summary3} speed={SPEED_PER_CHAR} /> : null}
            backgroundImage={backgroundImage}
        />
    );
};

export default AnimatedSummary;
