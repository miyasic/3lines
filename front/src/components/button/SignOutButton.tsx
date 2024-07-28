import styles from './SignOutButton.module.css';

interface SignOutButtonProps {
    onClick?: () => void;
}

const SignOutButton: React.FC<SignOutButtonProps> = ({ onClick }) => (
    <div className={styles.buttonContainer}>
        <button
            className={styles.githubSignoutButton}
            onClick={onClick}
        >
            <span>Sign out</span>
        </button>
    </div>
);

export default SignOutButton;