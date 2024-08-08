import { useEffect, useState, useRef } from 'react';
import { PAGE_INNER_MAX_WIDTH, PAGE_MAX_WIDTH } from '@/constants/constants';
import { auth, signIn } from '@/firebase/firebase';
import { User } from 'firebase/auth';

export const useSummaryDetail = (summary: Summary) => {
    const [countdown, setCountdown] = useState(3);
    const opened = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({});
    const [innerContainerStyle, setInnerContainerStyle] = useState<React.CSSProperties>({});
    const [windowSizeLoading, setWindowSizeLoading] = useState(true);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);



    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const autoOpen = queryParams.get('autoOpen') !== 'false'; // クエリパラメータがfalseでない限りリンクを自動で開く
        const after3Seconds = () => {
            if (summary.userId === auth.currentUser?.uid) {
                if (auth.currentUser?.isAnonymous) {
                    setIsConfirmDialogOpen(true);
                }
            } else {
                window.open(summary.articleUrl, '_blank');
            }
        };
        if (summary && autoOpen && !opened.current) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        if (!opened.current) {
                            after3Seconds();
                            opened.current = true;
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [summary]);

    useEffect(() => {
        const updateLayout = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const containerHeight = Math.floor(windowHeight * 2 / 3);
            const containerWidth = Math.min(windowWidth - 40, PAGE_MAX_WIDTH); // 左右に20pxずつのパディングを確保
            const innerWidth = Math.min(containerWidth - 40, PAGE_INNER_MAX_WIDTH); // 内部要素にも左右10pxずつのパディングを追加

            setContainerStyle({
                height: `${containerHeight}px`,
                width: `${containerWidth}px`,
                padding: '0 20px', // 左右のパディングを追加
            });

            setInnerContainerStyle({
                width: `${innerWidth}px`,
                margin: '0 auto',
                padding: '0 10px', // 内部要素にパディングを追加
            });
            setWindowSizeLoading(false);
        };

        updateLayout();
        window.addEventListener('resize', updateLayout);

        return () => window.removeEventListener('resize', updateLayout);
    }, []);

    const handleCancelDelete = () => {
        setIsConfirmDialogOpen(false);
    }


    const handleGithubLogin = async () => {
        const user = auth.currentUser as User;
        if (user) {
            const newUser = await signIn(user);
            setIsConfirmDialogOpen(false);
        };
    }


    return {
        summary, containerRef, containerStyle, innerContainerStyle, windowSizeLoading, isConfirmDialogOpen, handleCancelDelete, handleGithubLogin
    };
};

