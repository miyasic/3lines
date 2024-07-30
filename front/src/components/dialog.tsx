import React from 'react';
import styles from './Dialog.module.css';
import AppButton from './button/AppButton';
import { CANCEL, DELETE_SUMMARY } from '@/constants/constantsTexts';

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
                    <AppButton title={CANCEL} onClick={onClose}></AppButton>
                    <AppButton title={DELETE_SUMMARY} onClick={onConfirm} overrideStyles={{ backgroundColor: '#ff4444', }}></AppButton>
                </div>
            </div>
        </div>
    );
};

export default CustomDialog;
