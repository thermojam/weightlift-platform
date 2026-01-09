import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaEnvelope, FaUser, FaUsers, FaPlusSquare, FaBook, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import { isAdminOrModerator, isAdmin } from '@/shared/hooks/permissions';

interface SidebarProps {
    isMobileOpen: boolean;
    onCloseMobile: () => void;
}

const allNavLinks = [
    { to: '/profile', label: 'Профиль', icon: FaUser, check: () => true },
    { to: '/diary', label: 'Дневник', icon: FaBook, check: () => true },
    { to: '/post', label: 'Создать статью', icon: FaPlusSquare, check: isAdminOrModerator },
    { to: '/users', label: 'Пользователи', icon: FaUsers, check: isAdmin },
    { to: '/feedback', label: 'Заявки', icon: FaEnvelope, check: isAdmin },
];

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
    const user = useSelector((state: RootState) => state.auth.user);

    const visibleNavLinks = allNavLinks.filter(link => link.check(user?.role));

    return (
        <aside
            className={`bg-slate-800/50 backdrop-blur-lg md:bg-transparent flex flex-col gap-4 transition-transform duration-300 fixed md:relative h-full z-40 md:z-auto left-0 top-0 transform ${isMobileOpen ? 'translate-x-0 w-full p-6' : '-translate-x-full'} md:translate-x-0 md:w-24 md:p-4`}>
            <div className="flex items-center justify-end md:justify-center">
                <button
                    onClick={onCloseMobile}
                    className="md:hidden text-slate-100 hover:text-slate-300"
                >
                    <FaTimes size={24} />
                </button>
            </div>

            <nav className="flex flex-col gap-2">
                {visibleNavLinks.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        onClick={onCloseMobile}
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-full transition-colors md:justify-center ${
                                isActive
                                    ? 'bg-cyan-900 text-slate-100 font-semibold'
                                    : 'text-slate-300 hover:bg-slate-700 hover:text-slate-100'
                            }`
                        }
                        title={label}
                    >
                        <Icon size={24} />
                        {isMobileOpen && <span className="md:hidden">{label}</span>}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};
