// app/components/ImagePreview.tsx
import React, { useRef } from 'react';

const LOGO_TEXT = "今北産業";

const ImagePreview: React.FC<ImagePreviewProps> = ({ title, summary1, summary2, summary3, backgroundImage, setTitle, setSummary1, setSummary2, setSummary3, style }) => {
    const titleRef = useRef<HTMLDivElement>(null);

    const handleInput = (setter: (value: string) => void) => (event: React.FormEvent<HTMLDivElement>) => {
        setter(event.currentTarget.textContent || "");
    };

    return (
        <div style={{ ...style, position: 'relative' }}>
            <svg
                viewBox="0 0 1920 1005"
                preserveAspectRatio="xMidYMid meet"
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '20px',
                    overflow: 'hidden',
                }}
            >
                <image
                    href={backgroundImage}
                    width="1920"
                    height="1005"
                />
                <text
                    x="960"
                    y="76"
                    textAnchor="middle"
                    fontSize="64"
                    fontWeight="bold"
                    fill="#333"
                >
                    {title}
                </text>
                <text x="102" y="220" fontSize="48" fill="#333">{summary1}</text>
                <text x="102" y="420" fontSize="48" fill="#333">{summary2}</text>
                <text x="102" y="620" fontSize="48" fill="#333">{summary3}</text>
                <text
                    x="1818"
                    y="955"
                    textAnchor="end"
                    fontSize="72"
                    fontWeight="bold"
                    fontFamily="RocknRollOne-Regular, sans-serif"
                    fill="#333"
                >
                    {LOGO_TEXT}
                </text>
            </svg>
        </div>
    );
};


export default ImagePreview;
