import React, { useCallback, useState } from 'react';
import CommonLayout from '@/components/summary/CommonLayout';
import styles from './ImagePreview.module.css';

const MAX_CHARS = 30;

type EditableSummaryProps = {
    summary: string;
    isOverLimit: boolean;
    handleInput: (event: React.FormEvent<HTMLDivElement>) => void;
    handlePaste: (event: React.ClipboardEvent<HTMLDivElement>) => void;
};

interface ImagePreviewProps {
    title: string;
    summary1: string;
    summary2: string;
    summary3: string;
    backgroundImage: string;
    setTitle: (value: string) => void;
    setSummary1: (value: string) => void;
    setSummary2: (value: string) => void;
    setSummary3: (value: string) => void;
    style?: React.CSSProperties;
}

const EditableSummary: React.FC<EditableSummaryProps> = ({ summary, isOverLimit, handleInput, handlePaste }) => (
    <div
        className={styles.editable}
        style={{
            color: isOverLimit ? 'red' : 'inherit',
        }}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onPaste={handlePaste}
    >
        {summary}
    </div>
);

const ImagePreview: React.FC<ImagePreviewProps> = ({
    title,
    summary1,
    summary2,
    summary3,
    backgroundImage,
    setTitle,
    setSummary1,
    setSummary2,
    setSummary3,
    style
}) => {
    const [isOverLimit, setIsOverLimit] = useState({
        title: false,
        summary1: false,
        summary2: false,
        summary3: false
    });

    const handleInput = useCallback((setter: (value: string) => void, field: keyof typeof isOverLimit) => (event: React.FormEvent<HTMLDivElement>) => {
        const newText = event.currentTarget.textContent || "";
        if (newText.length <= MAX_CHARS) {
            setter(newText);
            setIsOverLimit(prev => ({ ...prev, [field]: false }));
        } else {
            event.currentTarget.textContent = newText.slice(0, MAX_CHARS);
            setter(newText.slice(0, MAX_CHARS));
            setIsOverLimit(prev => ({ ...prev, [field]: true }));
        }
    }, []);

    const handlePaste = useCallback((setter: (value: string) => void, field: keyof typeof isOverLimit) => (event: React.ClipboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        const pastedText = event.clipboardData.getData('text');
        const currentText = event.currentTarget.textContent || "";
        const newText = (currentText + pastedText).slice(0, MAX_CHARS);
        event.currentTarget.textContent = newText;
        setter(newText);
        setIsOverLimit(prev => ({ ...prev, [field]: newText.length > MAX_CHARS }));
    }, []);

    return (
        <CommonLayout
            title={
                <EditableSummary
                    summary={title}
                    isOverLimit={isOverLimit.title}
                    handleInput={handleInput(setTitle, 'title')}
                    handlePaste={handlePaste(setTitle, 'title')}
                />
            }
            summary1={
                <EditableSummary
                    summary={summary1}
                    isOverLimit={isOverLimit.summary1}
                    handleInput={handleInput(setSummary1, 'summary1')}
                    handlePaste={handlePaste(setSummary1, 'summary1')}
                />
            }
            summary2={
                <EditableSummary
                    summary={summary2}
                    isOverLimit={isOverLimit.summary2}
                    handleInput={handleInput(setSummary2, 'summary2')}
                    handlePaste={handlePaste(setSummary2, 'summary2')}
                />
            }
            summary3={
                <EditableSummary
                    summary={summary3}
                    isOverLimit={isOverLimit.summary3}
                    handleInput={handleInput(setSummary3, 'summary3')}
                    handlePaste={handlePaste(setSummary3, 'summary3')}
                />
            }
            backgroundImage={backgroundImage}
            style={style}
        />
    );
};

export default ImagePreview;
