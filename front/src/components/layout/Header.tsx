import { IMAKITA_SANGYO } from '@/constants/constantsTexts';
import Link from 'next/link';
import GitHubSignInButton from '../button/SignInButton';
import { auth, linkAnonymousUserWithGithub } from '@/firebase/firebase';

const Header = () => {

    const handleGithubLogin = async () => {
        const user = auth.currentUser;
        if (user && user.isAnonymous) {
            await linkAnonymousUserWithGithub();
        } else { /* ログイン済みならボタンは出さないし、未ログインなら匿名認証はしているはず*/ }
    };

    return <header className={'header'}>
        <Link href="/">
            {IMAKITA_SANGYO}
        </Link>
        <GitHubSignInButton onClick={handleGithubLogin} />
    </header>
};

export default Header;
