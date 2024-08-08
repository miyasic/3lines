import React from 'react';
import Link from 'next/link';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-100 text-gray-600 py-6 text-sm font-light">
            <div className="container mx-auto px-4">
                <div className="mb-4">
                    <ul className="space-y-1">
                        <li><Link href="https://www.kiyac.app/termsOfService/YjQt6ObdGY5SzSkxISay" className="hover:text-gray-800">利用規約</Link></li>
                        <li><Link href="https://www.kiyac.app/privacypolicy/WQvZrGYpmRaiH8jInLJF" className="hover:text-gray-800">プライバシーポリシー</Link></li>
                        <div>ver {process.env.APP_VERSION}</div>
                    </ul>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-end">
                    <p>&copy; 2024 今北産業. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;