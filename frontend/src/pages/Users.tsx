import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { fetchUsers, deleteUser, updateUser, fetchRoles } from '@/store/user/actions';
import type { RootState, AppDispatch } from '@/store';
import type { IUser } from '@/store/user/types';
import { Loader } from '@/components/ui/Loader';
import { Modal } from '@/components/ui/Modal';
import { Toast } from '@/components/ui/Toast';
import { useToast } from '@/hooks/useToast';
import { AdminLayout } from '@/layouts/AdminLayout';
import {Button} from "@/components/ui";

export const Users: React.FC = () => {
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

    const handleSaveRole = async (userId: string) => {
        if (selectedRole === null) return;

        const result = await dispatch(updateUser(userId, selectedRole));
        if (result.success) {
            showToast('Роль обновлена', 'success');
            setEditingUser(null);
            setSelectedRole(null);
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
    };

    const getRoleName = (roleName: string): string => {
        const role = roles.find(r => r.name === roleName);
        return role ? role.name.toLowerCase() : roleName.toLowerCase();
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
                <Loader label="Загружаем пользователей..." />
            </div>
        );
    }

    return (
        <AdminLayout>
            <h1 className="text-4xl font-bold text-slate-100 mb-8 text-center">Все пользователи</h1>

            <div className="space-y-4 max-w-6xl mx-auto">
                {/* Table Headers */}
                <div className="grid grid-cols-5 gap-4 mb-4 px-4">
                    <div className="text-[#00aaff] font-semibold">Имя</div>
                    <div className="text-[#00aaff] font-semibold">Почта</div>
                    <div className="text-[#00aaff] font-semibold">Статус</div>
                    <div className="text-[#00aaff] font-semibold">Роль</div>
                    <div className="text-[#00aaff] font-semibold">Действия</div>
                </div>

                {/* User Rows */}
                {users.length === 0 ? (
                    <div className="text-center text-slate-400 py-8">Пользователи не найдены</div>
                ) : (
                    users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-slate-800 border border-[#00aaff] rounded-lg p-4 grid grid-cols-5 gap-4 items-center"
                        >
                            <div className="text-slate-100 font-medium">{user.login}</div>
                            <div className="text-slate-100">{user.login}@example.com</div>
                            <div className={user.isActive ? 'text-green-400' : 'text-red-400'}>
                                {user.isActive ? 'активен' : 'отключен'}
                            </div>
                            <div className="text-slate-100">
                                {editingUser === user.id ? (
                                    <select
                                        value={selectedRole || ''}
                                        onChange={(e) => setSelectedRole(Number(e.target.value))}
                                        className="bg-slate-700 text-slate-100 rounded px-2 py-1 border border-slate-600 focus:outline-none focus:border-[#00aaff]"
                                    >
                                        {roles.map((role) => (
                                            <option key={role.id} value={role.id}>
                                                {role.name.toLowerCase()}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    getRoleName(user.role)
                                )}
                            </div>
                            <div className="flex items-center gap-3">
                                {editingUser === user.id ? (
                                    <>
                                        <button
                                            onClick={() => handleSaveRole(user.id)}
                                            className="text-green-400 hover:text-green-300 transition-colors text-sm"
                                        >
                                            Сохранить
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditingUser(null);
                                                setSelectedRole(null);
                                            }}
                                            className="text-red-400 hover:text-red-300 transition-colors text-sm"
                                        >
                                            Отмена
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            onClick={() => handleEdit(user)}
                                            className="text-[#00aaff] hover:text-[#0088cc] transition-colors p-1"
                                            title="Редактировать"
                                        >
                                            <FaEdit size={16} />
                                        </Button>
                                        {user.id !== currentUser?.id && (
                                            <button
                                                onClick={() => setConfirmUserId(user.id)}
                                                className="text-red-400 hover:text-red-300 transition-colors p-1"
                                                title="Удалить"
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Modal
                isOpen={!!confirmUserId}
                title="Удаление пользователя"
                description="Вы уверены, что хотите удалить этого пользователя?"
                confirmText="Удалить"
                cancelText="Отмена"
                destructive
                onClose={() => setConfirmUserId(null)}
                onConfirm={() => {
                    if (confirmUserId) {
                        handleDelete(confirmUserId);
                    }
                    setConfirmUserId(null);
                }}
            />
            {toast && <Toast message={toast.message} type={toast.type} />}
        </AdminLayout>
    );
};
