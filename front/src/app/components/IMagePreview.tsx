// app/components/ImagePreview.tsx
import React, { useRef } from 'react';


const IMAGE_WIDTH = 1200;
const IMAGE_HEIGHT = 628;
const TITLE_FONT_SIZE = 40;
const NORMAL_FONT_SIZE = 35;
const LOGO_FONT_SIZE = 42;
const PADDING = 32;
const HEIGHT_PADDING = 32;
const FRAME_WIDTH = 32;

const LOGO_TEXT = "今北産業";

const ImagePreview: React.FC<ImagePreviewProps> = ({ title, summary1, summary2, summary3, backgroundImage, setTitle, setSummary1, setSummary2, setSummary3 }) => {
    const titleRef = useRef<HTMLDivElement>(null);

    const handleInput = (setter: (value: string) => void) => (event: React.FormEvent<HTMLDivElement>) => {
        setter(event.currentTarget.textContent || "");
    };
    return (
        <div style={{ position: 'relative', width: `${IMAGE_WIDTH}px`, height: `${IMAGE_HEIGHT}px`, backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
            <div
                contentEditable
                suppressContentEditableWarning
                style={{
                    position: 'absolute',
                    top: `${FRAME_WIDTH + HEIGHT_PADDING}px`,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: `${TITLE_FONT_SIZE}px`,
                    fontWeight: 'bold',
                    outline: 'none'
                }}
                onInput={handleInput(setTitle)}
            >
                {title}
            </div>
            <div
                contentEditable
                suppressContentEditableWarning
                style={{
                    position: 'absolute',
                    top: `${FRAME_WIDTH + HEIGHT_PADDING * 2 + TITLE_FONT_SIZE}px`,
                    left: `${FRAME_WIDTH + PADDING}px`,
                    fontSize: `${NORMAL_FONT_SIZE}px`,
                    outline: 'none'
                }}
                onInput={handleInput(setSummary1)}
            >
                {summary1}
            </div>
            <div
                contentEditable
                suppressContentEditableWarning
                style={{
                    position: 'absolute',
                    top: `${FRAME_WIDTH + HEIGHT_PADDING * 2 + TITLE_FONT_SIZE + NORMAL_FONT_SIZE + HEIGHT_PADDING}px`,
                    left: `${FRAME_WIDTH + PADDING}px`,
                    fontSize: `${NORMAL_FONT_SIZE}px`,
                    outline: 'none'
                }}
                onInput={handleInput(setSummary2)}
            >
                {summary2}
            </div>
            <div
                contentEditable
                suppressContentEditableWarning
                style={{
                    position: 'absolute',
                    top: `${FRAME_WIDTH + HEIGHT_PADDING * 2 + TITLE_FONT_SIZE + 2 * (NORMAL_FONT_SIZE + HEIGHT_PADDING)}px`,
                    left: `${FRAME_WIDTH + PADDING}px`,
                    fontSize: `${NORMAL_FONT_SIZE}px`,
                    outline: 'none'
                }}
                onInput={handleInput(setSummary3)}
            >
                {summary3}
            </div>
            <div style={{
                position: 'absolute',
                bottom: `${FRAME_WIDTH + HEIGHT_PADDING}px`,
                right: `${FRAME_WIDTH + PADDING}px`,
                fontSize: `${LOGO_FONT_SIZE}px`,
                fontWeight: 'bold',
                fontFamily: 'RocknRollOne-Regular',
            }}>
                {LOGO_TEXT}
            </div>
        </div>
    );
};

export default ImagePreview;
