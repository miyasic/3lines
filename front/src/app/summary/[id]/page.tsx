"use client";

import Header from '../../../components/Header';
import { PAGE_INNER_MAX_WIDTH, PAGE_MAX_WIDTH } from '@/constants/constants';
import AppButton from '@/components/AppButton';
import { OPEN_ORIGINAL_ARTICLE } from '@/constants/constantsTexts';
import { useSummaryDetail } from '@/hooks/useSummaryDetail';

const SummaryDetail = () => {
    const { summary, countdown } = useSummaryDetail();

    if (!summary) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '24px',
                fontWeight: 'bold'
            }}>
                Loading...
            </div>
        );
    }
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            width: '100%',
            maxWidth: `${PAGE_MAX_WIDTH}px`,
            margin: '0 auto',
            padding: '20px',
            boxSizing: 'border-box',
        }}>
            <Header />
            <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: `${PAGE_INNER_MAX_WIDTH}px`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <div style={{
                        width: '100%',
                        position: 'relative',
                        marginBottom: '20px'
                    }}>
                        <img
                            src={summary.imageUrl}
                            alt={summary.title}
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                                borderRadius: '10px'
                            }}
                        />
                    </div>
                    <AppButton title={OPEN_ORIGINAL_ARTICLE} onClick={() => window.open(summary.articleUrl, '_blank')} />
                </div>
            </div>
        </div>
    );
};

export default SummaryDetail;