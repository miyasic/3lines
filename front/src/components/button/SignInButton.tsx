import Image from 'next/image';
import styles from './SignInButton.module.css';

interface GitHubSignInButtonProps {
    onClick?: () => void;
}

const GitHubSignInButton: React.FC<GitHubSignInButtonProps> = ({ onClick }) => (
    <button
        className={styles.githubSigninButton}
        onClick={onClick}
    >
        <Image src="/github-mark-white.svg" alt="GitHub logo" width={20} height={20} />
        <span>Sign in with GitHub</span>
    </button>
);

export default GitHubSignInButton;