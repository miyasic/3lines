import React, { useState, useEffect, useCallback } from 'react';
import { IMAKITA_SANGYO } from '@/constants/constantsTexts';
import Link from 'next/link';
import GitHubSignInButton from '../button/SignInButton';
import { auth, signIn, signOut } from '@/firebase/firebase';
import { User } from 'firebase/auth';
import AppButton from '../button/AppButton';
import SignOutButton from '../button/SignOutButton';

const Header: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setUser(user as User);
        });
        return () => unsubscribe();
    }, []);

    const handleGithubLogin = async () => {
        const newUser = await signIn(user);
    };

    const hideLoginButton = user == null;
    const showLoginButton = user?.isAnonymous ?? false;
    const showSignOutButton = !showLoginButton && !hideLoginButton;

    return (
        <header className={'header'}>
            <Link href="/">
                {IMAKITA_SANGYO}
            </Link>
            {showLoginButton &&
                <GitHubSignInButton onClick={handleGithubLogin} />
            }
            {showSignOutButton &&
                <SignOutButton onClick={() => signOut()} />}
        </header >
    );
};

export default Header;