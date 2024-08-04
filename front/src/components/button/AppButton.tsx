"use client";

import styles from './AppButton.module.css';
import buttonStyles from './button.module.css';

interface AppButtonProps {
    title: string;
    disabled?: boolean;
    isLoading?: boolean;
    overrideStyles?: React.CSSProperties;
    onClick: () => void;
}

const AppButton = ({ title, disabled, isLoading, overrideStyles, onClick }: AppButtonProps) => {
    return (
        <button
            onClick={() => onClick()}
            className={`${buttonStyles.baseButton} ${styles.appButton} ${isLoading ? styles.loading : ''} ${overrideStyles}`}
            disabled={disabled || isLoading}
            style={overrideStyles}
        >
            {isLoading ? (
                <span className={styles.loadingDots}>
                    <span>・</span><span>・</span><span>・</span>
                </span>
            ) : (
                title
            )}
        </button>
    );
}

export default AppButton;