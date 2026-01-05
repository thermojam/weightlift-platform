import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaUserCircle, FaArrowLeft, FaBars } from 'react-icons/fa';
import type { RootState } from '@/app/store';
import Logo from '../../public/logo.svg'
import { LogoutButton } from '@/features/auth/logout/ui/LogoutButton';
import { MobileMenu } from './MobileMenu';

export const Navbar: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinkClasses = ({isActive}: { isActive: boolean }) =>
        `relative text-slate-100 py-2 transition-colors duration-300 hover:text-slate-300 group ` +
        `after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-slate-300 after:rounded-full after:transition-transform after:duration-300 ` +
        (isActive ? 'text-slate-300 after:scale-x-100' : 'after:scale-x-0 group-hover:after:scale-x-100');

    return (
        <header className="header-gradient shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex h-20 items-center justify-between">
                    <NavLink to="/" className="flex-shrink-0" onClick={(e) => {
                        e.preventDefault();
                        navigate('/');
                    }}>
                        <img src={Logo} alt="Logo" className="h-20 w-auto"/>
                    </NavLink>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 lg:gap-12">
                        <NavLink to="/" className={navLinkClasses}>Главная</NavLink>
                        <NavLink to="/posts" className={navLinkClasses}>Статьи</NavLink>
                        <NavLink to="/videos" className={navLinkClasses}>Видео</NavLink>
                        <NavLink to="/project" className={navLinkClasses}>Проект</NavLink>
                        <NavLink to="/form" className={navLinkClasses}>Форма</NavLink>
                    </div>

                    {/* Desktop User Section */}
                    <div className="hidden md:flex items-center gap-5 text-white">
                        {!user ? (
                            <NavLink to="/auth/login" title="Войти" className="hover:text-slate-300 transition-colors">
                                <FaUserCircle size={28}/>
                            </NavLink>
                        ) : (
                            <div className="flex items-center gap-5">
                                <NavLink to="/profile" title="Профиль" className="flex items-center gap-2.5 text-lg font-semibold hover:text-slate-300 transition-colors">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                    </span>
                                    <span>{user?.login}</span>
                                </NavLink>
                                <button onClick={() => navigate(-1)} title="Назад" className="hover:text-slate-300 transition-colors">
                                    <FaArrowLeft size={24}/>
                                </button>
                                <LogoutButton className="hover:text-slate-300 transition-colors cursor-pointer"/>
                            </div>
                        )}
                    </div>

                    {/* Mobile Burger Menu */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setMobileMenuOpen(true)} className="text-white">
                            <FaBars size={28} />
                        </button>
                    </div>
                </nav>
            </div>

            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                user={user}
            />
        </header>
    );
};
