import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaUserCircle, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';
import { logoutUser } from '@/store/auth/actions';
import type { RootState } from '@/store';
import Logo from  '@/assets/images/logo.svg'

export const Navbar: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser() as any);
        navigate('/auth/login');
    };

    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `relative text-slate-100 py-2 transition-colors duration-300 hover:text-slate-300 ` +
        `after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-slate-300 after:transition-transform after:duration-300 ` +
        (isActive ? 'text-slate-300 after:scale-x-100' : 'after:scale-x-0 group-hover:after:scale-x-100');

    return (
        <header className="header-gradient shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex h-20 items-center justify-between">
                    <NavLink to="/" className="flex-shrink-0" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                        <img src={Logo} alt="Logo" className="h-12 w-auto" />
                    </NavLink>

                    <div className="hidden md:flex items-center gap-8 lg:gap-12">
                        <NavLink to="/" className={navLinkClasses}>Главная</NavLink>
                        <NavLink to="/articles" className={navLinkClasses}>Статьи</NavLink>
                        <NavLink to="/videos" className={navLinkClasses}>Видео</NavLink>
                        <NavLink to="/project" className={navLinkClasses}>Проект</NavLink>
                        <NavLink to="/form" className={navLinkClasses}>Форма</NavLink>
                    </div>

                    <div className="flex items-center gap-5 text-white">
                        {!user ? (
                            <NavLink to="/auth/login" title="Войти" className="hover:text-slate-300 transition-colors" onClick={(e) => { e.preventDefault(); navigate('/auth/login'); }}>
                                <FaUserCircle size={28} />
                            </NavLink>
                        ) : (
                            <div className="flex items-center gap-5">
                                <NavLink to="/profile" title="Профиль" className="hidden sm:inline text-lg font-semibold hover:text-slate-300 transition-colors">
                                    {user?.login}
                                </NavLink>

                                <button onClick={() => navigate(-1)} title="Назад" className="hover:text-slate-300 transition-colors">
                                    <FaArrowLeft size={24} />
                                </button>

                                <button onClick={handleLogout} title="Выйти" className="hover:text-slate-300 transition-colors cursor-pointer">
                                    <FaSignOutAlt size={24} />
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};
