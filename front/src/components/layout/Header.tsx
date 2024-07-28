import React, { useState, useEffect, useCallback } from 'react';
import { IMAKITA_SANGYO } from '@/constants/constantsTexts';
import Link from 'next/link';
import GitHubSignInButton from '../button/SignInButton';
import { auth, signIn } from '@/firebase/firebase';
import { User } from 'firebase/auth';
import { UserCircleIcon } from '@heroicons/react/24/solid'


const Header: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            // 未ログイン時
            if (!user) {
                auth.signInAnonymously();
            }
            setUser(user as User);
        });
        return () => unsubscribe();
    }, []);

    const handleGithubLogin = async () => {
        const newUser = await signIn(user);
        setUser(newUser);
    };

    const hideLoginButton = user == null;
    const showLoginButton = user?.isAnonymous ?? false;
    const showUserIcon = !showLoginButton && !hideLoginButton;

    return (
        <header className={'header'}>
            <Link href="/">
                {IMAKITA_SANGYO}
            </Link>
            {showLoginButton &&
                <GitHubSignInButton onClick={handleGithubLogin} />
            }
            {showUserIcon &&
                <Link href="/mypage">
                    <UserCircleIcon className="h-10 w-10 text-gray-500 cursor-pointer hover:text-gray-700" />
                </Link>}
        </header >
    );
};

export default Header;