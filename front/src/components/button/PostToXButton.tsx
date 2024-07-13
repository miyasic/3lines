import React from 'react';
import Image from 'next/image';
import styles from './PostToXButton.module.css';
import buttonStyles from './Button.module.css';

interface XPostButtonProps {
    text: string;
    id: string;
    className?: string;
}



const XPostButton = ({ text, id, className = '' }: XPostButtonProps) => {
    const handleClick = () => {
        const shareText = encodeURIComponent(text);
        const shareUrl = encodeURIComponent(`https://3lines.me/summary/${id}`);
        const xShareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
        window.open(xShareUrl, '_blank', 'noopener,noreferrer');

    };

    return (
        <button
            onClick={handleClick}
            className={`${buttonStyles.baseButton} ${styles.postToXButton} `}
        >
            <span className={styles.xLogo}>
                <Image
                    src="/logo.svg"
                    alt="X Logo"
                    width={18}
                    height={18}
                />
            </span>

            <span>でシェア</span>
        </button>
    );
};

export default XPostButton;