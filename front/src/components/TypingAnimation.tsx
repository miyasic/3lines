import React, { useEffect, useState } from 'react';
import styles from './TypingAnimation.module.css';

type TypingAnimationProps = {
    text: string;
    speed?: number;
    delay?: number;
    onComplete?: () => void;
};

const TypingAnimation: React.FC<TypingAnimationProps> = ({ text, speed = 100, delay = 0, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeoutId = setTimeout(() => {
                setDisplayedText((prev) => prev + text[currentIndex]);
                setCurrentIndex(currentIndex + 1);
            }, speed + delay);

            return () => clearTimeout(timeoutId);
        } else if (onComplete) {
            onComplete();
        }
    }, [currentIndex, text, speed, delay, onComplete]);

    useEffect(() => {
        setDisplayedText('');
        setCurrentIndex(0);
    }, [text]);

    return <span className={styles.typing}>{displayedText}</span>;
};

export default TypingAnimation;
