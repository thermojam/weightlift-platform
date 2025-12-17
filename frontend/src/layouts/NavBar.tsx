import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar: React.FC = () => {

    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `relative text-slate-100 py-2 transition-colors duration-300 hover:text-slate-300 ` +
        `after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-slate-300 after:transition-transform after:duration-300 ` +
        (isActive ? 'text-slate-300 after:scale-x-100' : 'after:scale-x-0 group-hover:after:scale-x-100');


    return (
        <header className="header-gradient shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex h-20 items-center justify-between">
                    <div>
                        <img src="/logo.svg" alt="FitApp Logo" className="h-12 w-auto" />
                    </div>

                    <div className="hidden md:flex items-center gap-8 lg:gap-12">
                        <NavLink to="/" className={navLinkClasses}>Главная</NavLink>
                        <NavLink to="/articles" className={navLinkClasses}>Статьи</NavLink>
                        <NavLink to="/videos" className={navLinkClasses}>Видео</NavLink>
                        <NavLink to="/project" className={navLinkClasses}>Проект</NavLink>
                        <NavLink to="/form" className={navLinkClasses}>Форма</NavLink>
                    </div>
                </nav>
            </div>
        </header>
    );
};
