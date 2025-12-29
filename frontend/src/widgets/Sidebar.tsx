import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaEnvelope, FaUser, FaUsers, FaPlusSquare, FaBook } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import { isAdminOrModerator, isAdmin } from '@/shared/hooks/permissions';

interface SidebarProps {
    isCollapsed: boolean;
    onToggleCollapse: () => void;
}

const allNavLinks = [
    { to: '/profile', label: 'Профиль', icon: FaUser, check: () => true },
    { to: '/diary', label: 'Дневник', icon: FaBook, check: () => true },
    { to: '/post', label: 'Создать статью', icon: FaPlusSquare, check: isAdminOrModerator },
    { to: '/users', label: 'Пользователи', icon: FaUsers, check: isAdmin },
    { to: '/feedback', label: 'Заявки', icon: FaEnvelope, check: isAdmin },
];

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleCollapse }) => {
    const user = useSelector((state: RootState) => state.auth.user);

    const visibleNavLinks = allNavLinks.filter(link => link.check(user?.role));

    return (
        <aside
            className={`bg-slate-800 flex flex-col gap-4 border-r border-slate-700 transition-all duration-300 ${
                isCollapsed ? 'w-24 p-4' : 'w-64 p-6'
            }`}
        >
            <button
                onClick={onToggleCollapse}
                className="flex items-center justify-center gap-2 text-slate-100 hover:text-slate-300 transition-colors mb-4 h-10 w-full"
            >
                {isCollapsed ? <FaArrowRight size={20} /> : <FaArrowLeft size={16} />}
                {!isCollapsed && <span>Свернуть</span>}
            </button>

            <nav className="flex flex-col gap-2">
                {visibleNavLinks.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                                isActive
                                    ? 'bg-slate-700 text-slate-100 font-semibold'
                                    : 'text-slate-300 hover:bg-slate-700 hover:text-slate-100'
                            } ${isCollapsed ? 'justify-center' : ''}`
                        }
                        title={isCollapsed ? label : undefined}
                    >
                        <Icon size={isCollapsed ? 24 : 16} />
                        {!isCollapsed && <span>{label}</span>}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};
