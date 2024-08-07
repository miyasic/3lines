import React from 'react';
import styles from './Dialog.module.css';
import AppButton from './button/AppButton';
import { CANCEL, DELETE_SUMMARY } from '@/constants/constantsTexts';

interface CustomDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (() => void) | null;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    confirmButton?: React.ReactNode;
}

const CustomDialog: React.FC<CustomDialogProps> = ({ isOpen, onClose, onConfirm, title, message, cancelText, confirmText, confirmButton }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.dialog}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.message}>{message}</p>
                <div className={styles.buttonContainer}>
                    <AppButton title={cancelText ?? CANCEL} onClick={onClose}></AppButton>
                    {confirmButton ? (confirmButton) :
                        (onConfirm && <AppButton title={confirmText ?? DELETE_SUMMARY} onClick={onConfirm} overrideStyles={{ backgroundColor: '#ff4444', }}></AppButton>)
                    }
                </div>
            </div>
        </div>
    );
};

export default CustomDialog;
