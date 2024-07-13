"use client";

import styles from './AppButton.module.css';

interface AppButtonProps {
    title: string;
    disabled?: boolean;
    onClick: () => void;
}

const AppButton = ({ title, disabled, onClick }: AppButtonProps) => {
    return (
        <button
            onClick={() => onClick()}
            className={styles.appButton}
            disabled={disabled}
        >
            {title}
        </button>
    );
}

export default AppButton;