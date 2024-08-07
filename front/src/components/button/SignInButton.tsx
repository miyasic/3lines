import Image from 'next/image';
import styles from './SignInButton.module.css';

interface GitHubSignInButtonProps {
    onClick?: () => void;
    inDialog?: boolean;
}

const GitHubSignInButton: React.FC<GitHubSignInButtonProps> = ({ onClick, inDialog = false }) => (
    <button
        className={`${styles.githubSigninButton} ${inDialog ? styles.inDialog : ''}`}
        onClick={onClick}
    >
        <span>Sign in with</span>
        <Image src="/github-mark-white.svg" alt="GitHub logo" width={20} height={20} />

    </button>
);

export default GitHubSignInButton;