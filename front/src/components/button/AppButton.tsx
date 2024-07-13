"use client";

import styles from './AppButton.module.css';
import buttonStyles from './Button.module.css';

interface AppButtonProps {
    title: string;
    disabled?: boolean;
    isLoading?: boolean;
    onClick: () => void;
}

const AppButton = ({ title, disabled, isLoading, onClick }: AppButtonProps) => {
    return (
        <button
            onClick={() => onClick()}
            className={`${buttonStyles.baseButton} ${styles.appButton} ${isLoading ? styles.loading : ''}`}
            disabled={disabled || isLoading}
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