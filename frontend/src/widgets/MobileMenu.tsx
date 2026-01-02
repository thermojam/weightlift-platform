import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaTimes, FaUserCircle, FaArrowLeft } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import type { IUser } from '@/entities/User/model/types';
import { LogoutButton } from '@/features/auth/logout/ui/LogoutButton';
import Logo from '@/assets/images/logo.svg';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    user: IUser | null;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, user }) => {
    const navigate = useNavigate();
    const navLinkClasses = ({isActive}: { isActive: boolean }) =>
        `relative text-slate-100 text-4xl font-bold py-4 text-center inline-block transition-colors duration-300 hover:text-slate-300 group ` +
        `after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-slate-300 after:rounded-full after:transition-transform after:duration-300 ` +
        (isActive ? 'text-slate-300 after:scale-x-100' : 'after:scale-x-0 group-hover:after:scale-x-100');

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 md:hidden"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative h-full w-full bg-black/50 backdrop-blur-xl flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="absolute top-0 left-4">
                            <NavLink to="/" onClick={onClose}>
                                <img src={Logo} alt="Logo" className="h-20 w-auto" />
                            </NavLink>
                        </div>

                        <div className="absolute top-4 right-4">
                            <button onClick={onClose} className="text-white p-2">
                                <FaTimes size={32} />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-8 text-center w-full px-4">
                            <div className="flex flex-col items-center gap-4"> {/* Centering the links */}
                                <NavLink to="/" className={navLinkClasses} onClick={onClose}>Главная</NavLink>
                                <NavLink to="/posts" className={navLinkClasses} onClick={onClose}>Статьи</NavLink>
                                <NavLink to="/videos" className={navLinkClasses} onClick={onClose}>Видео</NavLink>
                                <NavLink to="/project" className={navLinkClasses} onClick={onClose}>Проект</NavLink>
                                <NavLink to="/form" className={navLinkClasses} onClick={onClose}>Форма</NavLink>
                            </div>

                            <div className="border-t border-white/20" />

                            {!user ? (
                                <NavLink to="/auth/login" className="flex items-center justify-center gap-3 text-white text-2xl py-2" onClick={onClose}>
                                    <FaUserCircle size={28} />
                                    <span>Войти</span>
                                </NavLink>
                            ) : (
                                <div className="flex flex-col items-center gap-5 text-white">
                                    <NavLink to="/profile" title="Профиль" className="flex items-center gap-2.5 text-2xl font-semibold hover:text-slate-300 transition-colors" onClick={onClose}>
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                        </span>
                                        <span>{user?.login}</span>
                                    </NavLink>
                                    <div className="flex items-center justify-center gap-8 w-full mt-2">
                                        <button onClick={() => { navigate(-1); onClose(); }} title="Назад" className="hover:text-slate-300 transition-colors">
                                            <FaArrowLeft size={22} />
                                        </button>
                                        <LogoutButton className="hover:text-slate-300 transition-colors cursor-pointer text-lg" />
                                    </div>
                                </div>
                            )}
                        </nav>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
