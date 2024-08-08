"use client";
import Script from "next/script";

const GoogleAdScript = () => {
    if (process.env.VERCEL_ENV === "production") {
        return (
            <>
                <Script async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6246635878467153"
                    crossOrigin="anonymous"
                    strategy="afterInteractive"
                />
            </>
        );
    }
    return <></>;
};

export default GoogleAdScript;