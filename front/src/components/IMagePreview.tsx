import React from 'react';
import CommonLayout from '@/components/summary/CommonLayout';
import styles from './ImagePreview.module.css';
import useEditableSummary from './useEditableSummary';

type EditableSummaryProps = {
    summary: string;
    isOverLimit: boolean;
    handleInput: (event: React.FormEvent<HTMLDivElement>) => void;
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
    setIsAllUnderLimit: (value: boolean) => void;
    style?: React.CSSProperties;
}

const EditableSummary: React.FC<EditableSummaryProps> = ({ summary, isOverLimit, handleInput }) => (
    <div
        className={styles.editable}
        style={{
            color: isOverLimit ? 'red' : 'inherit',
        }}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
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
    setIsAllUnderLimit,
    style
}) => {
    const { isOverLimit, handleInput } = useEditableSummary(setIsAllUnderLimit);

    return (
        <CommonLayout
            title={
                <EditableSummary
                    summary={title}
                    isOverLimit={isOverLimit.title}
                    handleInput={handleInput(setTitle, 'title')}
                />
            }
            summary1={
                <EditableSummary
                    summary={summary1}
                    isOverLimit={isOverLimit.summary1}
                    handleInput={handleInput(setSummary1, 'summary1')}
                />
            }
            summary2={
                <EditableSummary
                    summary={summary2}
                    isOverLimit={isOverLimit.summary2}
                    handleInput={handleInput(setSummary2, 'summary2')}
                />
            }
            summary3={
                <EditableSummary
                    summary={summary3}
                    isOverLimit={isOverLimit.summary3}
                    handleInput={handleInput(setSummary3, 'summary3')}
                />
            }
            backgroundImage={backgroundImage}
            style={style}
        />
    );
};

export default ImagePreview;
