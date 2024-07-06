"use client";

import styles from './AppButton.module.css';

interface AppButtonProps {
    title: string;
    onClick: () => void;
}

const AppButton = ({ title, onClick }: AppButtonProps) => {
    return (
        <button
            onClick={() => onClick()}
            className={styles.appButton}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2f855a'} // ホバー時の色を設定
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#38a169'} // マウスが離れたときの色を元に戻す
        >
            {title}
        </button>
    );
}

export default AppButton;