"use client";
import { useEffect } from 'react';

declare global {
    interface Window {
        adsbygoogle: { [key: string]: unknown }[]
    }
}

const AdSense = () => {
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_ENV === 'production') {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    return (
        <>
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-6246635878467153"
                data-ad-slot="9034237825"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </>
    );
};

export default AdSense;
