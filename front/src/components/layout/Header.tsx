import { IMAKITA_SANGYO } from '@/constants/constantsTexts';
import Link from 'next/link';
import { auth, linkAnonymousUserWithGithub, signInWithGithub } from '@/firebase/firebase';

const Header = () => {
    const handleGithubLogin = async () => {
        const user = auth.currentUser;
        if (user && user.isAnonymous) {
            await linkAnonymousUserWithGithub();
        } else {
            await signInWithGithub();
        }
        await signInWithGithub();
    };

    return (
        <header className="header">
            <Link href="/">
                {IMAKITA_SANGYO}
            </Link>
            <button onClick={handleGithubLogin} style={{ marginLeft: 'auto' }}>
                Login with GitHub
            </button>
        </header>

    );
};

export default Header;
