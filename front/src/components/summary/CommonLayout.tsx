import React from 'react';
import { IMAKITA_SANGYO } from '@/constants/constantsTexts';

const IMAGE_WIDTH = 1200;
const IMAGE_HEIGHT = 628;
const TITLE_FONT_SIZE = 40;
const NORMAL_FONT_SIZE = 35;
const LOGO_FONT_SIZE = 42;
const PADDING = 32;
const HEIGHT_PADDING = 32;
const FRAME_WIDTH = 32;

interface CommonLayoutProps {
    title: React.ReactNode;
    summary1: React.ReactNode;
    summary2: React.ReactNode;
    summary3: React.ReactNode;
    backgroundImage: string;
    style?: React.CSSProperties;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({
    title,
    summary1,
    summary2,
    summary3,
    backgroundImage,
    style
}) => {

    const layout = {
        titleY: FRAME_WIDTH + HEIGHT_PADDING + TITLE_FONT_SIZE,
        availableHeight: IMAGE_HEIGHT - FRAME_WIDTH - HEIGHT_PADDING - TITLE_FONT_SIZE - HEIGHT_PADDING * 2,
        linePadding: (IMAGE_HEIGHT - FRAME_WIDTH - HEIGHT_PADDING - TITLE_FONT_SIZE - HEIGHT_PADDING * 2 - 3 * NORMAL_FONT_SIZE) / 5,
        summaryStartY: FRAME_WIDTH + HEIGHT_PADDING + TITLE_FONT_SIZE + HEIGHT_PADDING + ((IMAGE_HEIGHT - FRAME_WIDTH - HEIGHT_PADDING - TITLE_FONT_SIZE - HEIGHT_PADDING * 2 - 3 * NORMAL_FONT_SIZE) / 5) / 2,
        summary1Y: FRAME_WIDTH + HEIGHT_PADDING + TITLE_FONT_SIZE + HEIGHT_PADDING + ((IMAGE_HEIGHT - FRAME_WIDTH - HEIGHT_PADDING - TITLE_FONT_SIZE - HEIGHT_PADDING * 2 - 3 * NORMAL_FONT_SIZE) / 5) / 2 + NORMAL_FONT_SIZE,
        summary2Y: FRAME_WIDTH + HEIGHT_PADDING + TITLE_FONT_SIZE + HEIGHT_PADDING + ((IMAGE_HEIGHT - FRAME_WIDTH - HEIGHT_PADDING - TITLE_FONT_SIZE - HEIGHT_PADDING * 2 - 3 * NORMAL_FONT_SIZE) / 5) / 2 + NORMAL_FONT_SIZE + NORMAL_FONT_SIZE + ((IMAGE_HEIGHT - FRAME_WIDTH - HEIGHT_PADDING - TITLE_FONT_SIZE - HEIGHT_PADDING * 2 - 3 * NORMAL_FONT_SIZE) / 5),
        summary3Y: FRAME_WIDTH + HEIGHT_PADDING + TITLE_FONT_SIZE + HEIGHT_PADDING + ((IMAGE_HEIGHT - FRAME_WIDTH - HEIGHT_PADDING - TITLE_FONT_SIZE - HEIGHT_PADDING * 2 - 3 * NORMAL_FONT_SIZE) / 5) / 2 + NORMAL_FONT_SIZE + NORMAL_FONT_SIZE + ((IMAGE_HEIGHT - FRAME_WIDTH - HEIGHT_PADDING - TITLE_FONT_SIZE - HEIGHT_PADDING * 2 - 3 * NORMAL_FONT_SIZE) / 5) + NORMAL_FONT_SIZE + ((IMAGE_HEIGHT - FRAME_WIDTH - HEIGHT_PADDING - TITLE_FONT_SIZE - HEIGHT_PADDING * 2 - 3 * NORMAL_FONT_SIZE) / 5),
        summaryX: FRAME_WIDTH + PADDING,
        logoX: IMAGE_WIDTH - FRAME_WIDTH - PADDING,
        logoY: IMAGE_HEIGHT - FRAME_WIDTH - HEIGHT_PADDING,
    };

    console.log('layout', layout);

    return (
        <div style={{ ...style, width: '100%', height: '100%' }}>
            <svg viewBox={`0 0 ${IMAGE_WIDTH} ${IMAGE_HEIGHT}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
                <image href={backgroundImage} width={IMAGE_WIDTH} height={IMAGE_HEIGHT} />

                <foreignObject x={layout.summaryX} y={layout.titleY - TITLE_FONT_SIZE} width={IMAGE_WIDTH - layout.summaryX * 2} height={TITLE_FONT_SIZE * 2} requiredExtensions="http://www.w3.org/1999/xhtml">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: `${TITLE_FONT_SIZE}px`, fontWeight: 'bold' }}>
                        {title}
                    </div>
                </foreignObject>

                <foreignObject x={layout.summaryX} y={layout.summary1Y - NORMAL_FONT_SIZE} width={IMAGE_WIDTH - layout.summaryX * 2} height={NORMAL_FONT_SIZE * 2} requiredExtensions="http://www.w3.org/1999/xhtml">
                    <div style={{ fontSize: `${NORMAL_FONT_SIZE}px` }}>
                        {summary1}
                    </div>
                </foreignObject>

                <foreignObject x={layout.summaryX} y={layout.summary2Y - NORMAL_FONT_SIZE} width={IMAGE_WIDTH - layout.summaryX * 2} height={NORMAL_FONT_SIZE * 2} requiredExtensions="http://www.w3.org/1999/xhtml">
                    <div style={{ fontSize: `${NORMAL_FONT_SIZE}px` }}>
                        {summary2}
                    </div>
                </foreignObject>

                <foreignObject x={layout.summaryX} y={layout.summary3Y - NORMAL_FONT_SIZE} width={IMAGE_WIDTH - layout.summaryX * 2} height={NORMAL_FONT_SIZE * 2} requiredExtensions="http://www.w3.org/1999/xhtml">
                    <div style={{ fontSize: `${NORMAL_FONT_SIZE}px` }}>
                        {summary3}
                    </div>
                </foreignObject>

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

export default CommonLayout;
