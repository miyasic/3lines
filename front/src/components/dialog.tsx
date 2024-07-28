import React from 'react';
import styles from './dialog.module.css';

interface CustomDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

const CustomDialog: React.FC<CustomDialogProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.dialog}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.message}>{message}</p>
                <div className={styles.buttonContainer}>
                    <button className={styles.cancelButton} onClick={onClose}>キャンセル</button>
                    <button className={styles.confirmButton} onClick={onConfirm}>OK</button>
                </div>
            </div>
        </div>
    );
};

export default CustomDialog;
