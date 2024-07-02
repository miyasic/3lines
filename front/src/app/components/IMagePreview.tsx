// app/components/ImagePreview.tsx
import React, { useRef } from 'react';

const LOGO_TEXT = "今北産業";

const ImagePreview: React.FC<ImagePreviewProps> = ({ title, summary1, summary2, summary3, backgroundImage, setTitle, setSummary1, setSummary2, setSummary3 }) => {
    const titleRef = useRef<HTMLDivElement>(null);

    const handleInput = (setter: (value: string) => void) => (event: React.FormEvent<HTMLDivElement>) => {
        setter(event.currentTarget.textContent || "");
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '0', paddingBottom: '52.33%', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
            <div
                contentEditable
                suppressContentEditableWarning
                style={{
                    position: 'absolute',
                    top: '5.08%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '3.33vw',
                    fontWeight: 'bold',
                    outline: 'none',
                    width: '90%', /* Add width to ensure text doesn't overflow */
                    textAlign: 'center', /* Center text */
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
                    top: '14.64%',
                    left: '5.33%',
                    fontSize: '2.92vw',
                    outline: 'none',
                    width: '90%', /* Add width to ensure text doesn't overflow */
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
                    top: '27.86%',
                    left: '5.33%',
                    fontSize: '2.92vw',
                    outline: 'none',
                    width: '90%', /* Add width to ensure text doesn't overflow */
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
                    top: '41.08%',
                    left: '5.33%',
                    fontSize: '2.92vw',
                    outline: 'none',
                    width: '90%', /* Add width to ensure text doesn't overflow */
                }}
                onInput={handleInput(setSummary3)}
            >
                {summary3}
            </div>
            <div style={{
                position: 'absolute',
                bottom: '5.08%',
                right: '5.33%',
                fontSize: '3.5vw',
                fontWeight: 'bold',
                fontFamily: 'RocknRollOne-Regular',
            }}>
                {LOGO_TEXT}
            </div>
        </div>
    );
};

export default ImagePreview;
