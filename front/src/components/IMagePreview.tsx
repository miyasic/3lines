import React, { useCallback, useState } from 'react';
import CommonLayout from '@/components/summary/CommonLayout';

const MAX_CHARS = 30;

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
            event.currentTarget.textContent = newText.slice(0, MAX_CHARS + 1);
            setter(newText.slice(0, MAX_CHARS + 1));
            setIsOverLimit(prev => ({ ...prev, [field]: true }));
        }
    }, []);

    const handlePaste = useCallback((setter: (value: string) => void, field: keyof typeof isOverLimit) => (event: React.ClipboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        const pastedText = event.clipboardData.getData('text');
        const currentText = event.currentTarget.textContent || "";
        const newText = (currentText + pastedText).slice(0, MAX_CHARS + 1);
        event.currentTarget.textContent = newText;
        setter(newText);
        setIsOverLimit(prev => ({ ...prev, [field]: newText.length > MAX_CHARS }));
    }, []);

    const editableStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        fontSize: 'inherit',
        fontWeight: 'inherit',
        textAlign: 'inherit',
        color: 'inherit',
        background: 'transparent',
        border: 'none',
        outline: 'none',
        padding: '0',
        margin: '0',
        overflow: 'hidden',
        resize: 'none',
        fontFamily: 'inherit',
    };

    return (
        <CommonLayout
            title={title}
            summary1={
                <div
                    style={{
                        ...editableStyle,
                        fontSize: '35px',
                        color: isOverLimit.summary1 ? 'red' : 'inherit',
                    }}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleInput(setSummary1, 'summary1')}
                    onPaste={handlePaste(setSummary1, 'summary1')}
                >
                    {summary1}
                </div>
            }
            summary2={
                <div
                    style={{
                        ...editableStyle,
                        fontSize: '35px',
                        color: isOverLimit.summary2 ? 'red' : 'inherit',
                    }}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleInput(setSummary2, 'summary2')}
                    onPaste={handlePaste(setSummary2, 'summary2')}
                >
                    {summary2}
                </div>
            }
            summary3={
                <div
                    style={{
                        ...editableStyle,
                        fontSize: '35px',
                        color: isOverLimit.summary3 ? 'red' : 'inherit',
                    }}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleInput(setSummary3, 'summary3')}
                    onPaste={handlePaste(setSummary3, 'summary3')}
                >
                    {summary3}
                </div>
            }
            backgroundImage={backgroundImage}
            style={style}
        />
    );
};

export default ImagePreview;
