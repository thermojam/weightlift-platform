import React, { useState } from 'react';
import { Sidebar } from '@/widgets/Sidebar';
import { FaDashcube } from 'react-icons/fa';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(prevState => !prevState);
    };

    return (
        <div className="flex min-h-full bg-slate-900">
            <Sidebar
                isMobileOpen={isMobileMenuOpen}
                onCloseMobile={toggleMobileMenu}
            />
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
                    onClick={toggleMobileMenu}
                />
            )}
            <main className="flex-1 p-8 md:p-8 w-full overflow-auto">
                <button
                    className="text-slate-100 hover:text-slate-300 md:hidden mb-4"
                    onClick={toggleMobileMenu}
                >
                    <FaDashcube size={24} />
                </button>
                {children}
            </main>
        </div>
    );
};
