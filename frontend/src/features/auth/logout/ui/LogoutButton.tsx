import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { logoutUser } from '@/app/store/auth/actions';
import { useAppDispatch } from '@/app/store';

export const LogoutButton: React.FC<{className?: string}> = ({className}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate('/auth/login');
    };

    return (
        <button onClick={handleLogout} title="Выйти" className={className}>
            <FaSignOutAlt size={24} />
        </button>
    );
};
