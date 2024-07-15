import styles from './SignOutButton.module.css';

interface SignOutButtonProps {
    onClick?: () => void;
}

const SignOutButton: React.FC<SignOutButtonProps> = ({ onClick }) => (
    <button
        className={styles.githubSigninButton}
        onClick={onClick}
    >
        <span>Sign out</span>
    </button>
);

export default SignOutButton;