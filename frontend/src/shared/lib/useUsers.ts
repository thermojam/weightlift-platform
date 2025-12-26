import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, updateUser, fetchRoles } from '@/app/store/user/actions';
import type { RootState, AppDispatch } from '@/app/store';
import type { IUser } from '@/app/store/user/types';
import { useToast } from '@/shared/lib/useToast';

export const useUsers = () => {
    const dispatch: AppDispatch = useDispatch();
    const { users, roles, isLoading } = useSelector((state: RootState) => state.user);
    const currentUser = useSelector((state: RootState) => state.auth.user);

    const [editingUser, setEditingUser] = useState<string | null>(null);
    const [selectedRole, setSelectedRole] = useState<number | null>(null);
    const [confirmUserId, setConfirmUserId] = useState<string | null>(null);
    const { showToast, toast } = useToast();

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchRoles());
    }, [dispatch]);

    const handleEdit = (user: IUser) => {
        setEditingUser(user.id);
        const role = roles.find(r => r.name === user.role);
        setSelectedRole(role ? role.id : null);
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
        setSelectedRole(null);
    };

    const handleSaveRole = async (userId: string) => {
        if (selectedRole === null) return;

        const result = await dispatch(updateUser(userId, selectedRole));
        if (result.success) {
            showToast('Роль обновлена', 'success');
            handleCancelEdit();
        } else {
            showToast(result.error || 'Ошибка обновления роли', 'error');
        }
    };

    const handleDelete = async (userId: string) => {
        const result = await dispatch(deleteUser(userId));
        if (result.success) {
            showToast('Пользователь удалён', 'success');
        } else {
            showToast(result.error || 'Ошибка удаления пользователя', 'error');
        }
        setConfirmUserId(null);
    };

    const getRoleName = (roleName: string): string => {
        const role = roles.find(r => r.name === roleName);
        return role ? role.name.toLowerCase() : roleName.toLowerCase();
    };

    return {
        users,
        roles,
        isLoading,
        currentUser,
        editingUser,
        selectedRole,
        confirmUserId,
        toast,
        getRoleName,
        setSelectedRole,
        setConfirmUserId,
        handleEdit,
        handleCancelEdit,
        handleSaveRole,
        handleDelete,
    };
};
