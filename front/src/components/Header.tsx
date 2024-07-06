// app/components/Header.tsx
import { IMAKITA_SANGYO } from '@/constants/constantsTexts';
import Link from 'next/link';

const Header = () => (
    <header className="header">
        <Link href="/">
            {IMAKITA_SANGYO}
        </Link>
    </header>
);

export default Header;
