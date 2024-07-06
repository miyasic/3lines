// app/components/ImagePreview.tsx
import { IMAKITA_SANGYO as IMAKITA_SANGYO } from '@/constants/constantsTexts';
import React, { useCallback, useMemo, useState } from 'react';

const IMAGE_WIDTH = 1200;
const IMAGE_HEIGHT = 628;
const TITLE_FONT_SIZE = 40;
const NORMAL_FONT_SIZE = 35;
const LOGO_FONT_SIZE = 42;
const PADDING = 32;
const HEIGHT_PADDING = 32;
const FRAME_WIDTH = 32;
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

    const layout = useMemo(() => {
        const titleY = FRAME_WIDTH + HEIGHT_PADDING + TITLE_FONT_SIZE;
        const availableHeight = IMAGE_HEIGHT - FRAME_WIDTH - HEIGHT_PADDING - TITLE_FONT_SIZE - HEIGHT_PADDING * 2;
        const linePadding = (availableHeight - 3 * NORMAL_FONT_SIZE) / 5;
        const summaryStartY = FRAME_WIDTH + HEIGHT_PADDING + TITLE_FONT_SIZE + HEIGHT_PADDING + linePadding / 2;

        return {
            titleY,
            summary1Y: summaryStartY + NORMAL_FONT_SIZE,
            summary2Y: summaryStartY + NORMAL_FONT_SIZE + (NORMAL_FONT_SIZE + linePadding),
            summary3Y: summaryStartY + NORMAL_FONT_SIZE + 2 * (NORMAL_FONT_SIZE + linePadding),
            summaryX: FRAME_WIDTH + PADDING,
            logoX: IMAGE_WIDTH - FRAME_WIDTH - PADDING,
            logoY: IMAGE_HEIGHT - FRAME_WIDTH - HEIGHT_PADDING,
        };
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
        <div style={{ ...style, width: '100%', height: '100%' }}>
            <svg viewBox={`0 0 ${IMAGE_WIDTH} ${IMAGE_HEIGHT}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
                <image href={backgroundImage} width={IMAGE_WIDTH} height={IMAGE_HEIGHT} />

                <foreignObject x="0" y={layout.titleY - TITLE_FONT_SIZE} width={IMAGE_WIDTH} height={TITLE_FONT_SIZE * 2} requiredExtensions="http://www.w3.org/1999/xhtml">
                    <div
                        style={{
                            ...editableStyle,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: `${TITLE_FONT_SIZE}px`,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: isOverLimit.title ? 'red' : 'inherit',
                        }}
                        contentEditable
                        suppressContentEditableWarning
                        onInput={handleInput(setTitle, 'title')}
                        onPaste={handlePaste(setTitle, 'title')}
                    >
                        {title}
                    </div>
                </foreignObject>

                {[
                    { y: layout.summary1Y, text: summary1, setter: setSummary1, field: 'summary1' as const },
                    { y: layout.summary2Y, text: summary2, setter: setSummary2, field: 'summary2' as const },
                    { y: layout.summary3Y, text: summary3, setter: setSummary3, field: 'summary3' as const },
                ].map((item, index) => (
                    <foreignObject key={index} x={layout.summaryX} y={item.y - NORMAL_FONT_SIZE} width={IMAGE_WIDTH - layout.summaryX * 2} height={NORMAL_FONT_SIZE * 2} requiredExtensions="http://www.w3.org/1999/xhtml">
                        <div
                            style={{
                                ...editableStyle,
                                fontSize: `${NORMAL_FONT_SIZE}px`,
                                color: isOverLimit[item.field] ? 'red' : 'inherit',
                            }}
                            contentEditable
                            suppressContentEditableWarning
                            onInput={handleInput(item.setter, item.field)}
                            onPaste={handlePaste(item.setter, item.field)}
                        >
                            {item.text}
                        </div>
                    </foreignObject>
                ))}

                <text
                    x={layout.logoX}
                    y={layout.logoY}
                    fontSize={LOGO_FONT_SIZE}
                    fontWeight="bold"
                    textAnchor="end"
                    fontFamily="RocknRollOne-Regular, sans-serif"
                    fill="#000"
                >
                    {IMAKITA_SANGYO}
                </text>
            </svg>
        </div>
    );
};

export default ImagePreview;