import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import type { IUser } from '@/app/store/user/types';
import { Loader, Modal, Toast } from '@/shared/ui';
import { AdminLayout } from '@/widgets/AdminLayout';
import { useUsers } from '@/entities/User/lib/useUsers.ts';

export const Users: React.FC = () => {
    const {
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
    } = useUsers();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
                <Loader label="Загружаем пользователей..." />
            </div>
        );
    }

    return (
        <AdminLayout>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-100 mb-6 sm:mb-8 text-center">Все пользователи</h1>

            <div className="space-y-4 max-w-6xl mx-auto px-2 sm:px-0">
                {/* Desktop Headers */}
                <div className="hidden md:grid grid-cols-5 gap-4 px-4 text-[#00aaff] font-semibold">
                    <div>Имя</div>
                    <div>Дата регистрации</div>
                    <div>Статус</div>
                    <div>Роль</div>
                    <div>Действия</div>
                </div>

                {users.length === 0 ? (
                    <div className="text-center text-slate-400 py-8">Пользователи не найдены</div>
                ) : (
                    users.map((user: IUser) => (
                        <div
                            key={user.id}
                            className="p-4 rounded-lg bg-cyan-950 md:grid md:grid-cols-5 md:gap-4 md:items-center"
                        >
                            {/* Mobile & Desktop Content */}
                            <div className="flex justify-between items-center md:block">
                                <span className="md:hidden text-[#00aaff] font-semibold">Имя</span>
                                <div className="text-slate-100 font-medium text-right md:text-left">{user.login}</div>
                            </div>

                            <div className="flex justify-between items-center md:block mt-2 pt-2 border-t border-slate-700/50 md:border-none md:mt-0 md:pt-0">
                                <span className="md:hidden text-[#00aaff] font-semibold">Дата регистрации</span>
                                <div className="text-slate-100 text-right md:text-left">
                                    {user.registeredAt ? new Date(user.registeredAt).toLocaleDateString('ru-RU') : 'N/A'}
                                </div>
                            </div>

                            <div className="flex justify-between items-center md:block mt-2 pt-2 border-t border-slate-700/50 md:border-none md:mt-0 md:pt-0">
                                <span className="md:hidden text-[#00aaff] font-semibold">Статус</span>
                                <div className={user.isActive ? 'text-green-400' : 'text-red-400'}>
                                    {user.isActive ? 'активен' : 'отключен'}
                                </div>
                            </div>

                            <div className="flex justify-between items-center md:block mt-2 pt-2 border-t border-slate-700/50 md:border-none md:mt-0 md:pt-0">
                                <span className="md:hidden text-[#00aaff] font-semibold">Роль</span>
                                <div className="text-slate-100">
                                    {editingUser === user.id ? (
                                        <select
                                            value={selectedRole || ''}
                                            onChange={(e) => setSelectedRole(Number(e.target.value))}
                                            className="bg-slate-700 text-slate-100 rounded px-2 py-1 border border-slate-600 focus:outline-none focus:border-[#00aaff] w-full"
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
                            </div>

                            <div className="flex justify-between items-center md:justify-start md:gap-3 mt-4 pt-3 border-t border-slate-700 md:border-none md:mt-0 md:pt-0">
                                <span className="md:hidden text-[#00aaff] font-semibold">Действия</span>
                                <div className="flex items-center gap-3">
                                    {editingUser === user.id ? (
                                        <>
                                            <button
                                                onClick={() => handleSaveRole(user.id)}
                                                className="text-green-400 hover:text-green-300 transition-colors text-sm font-semibold"
                                            >
                                                Сохранить
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="text-red-400 hover:text-red-300 transition-colors text-sm"
                                            >
                                                Отмена
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="text-[#00aaff] hover:text-[#0088cc] transition-colors p-1"
                                                title="Редактировать"
                                            >
                                                <FaEdit size={24} />
                                            </button>
                                            {user.id !== currentUser?.id && (
                                                <button
                                                    onClick={() => setConfirmUserId(user.id)}
                                                    className="text-red-400 hover:text-red-300 transition-colors p-1"
                                                    title="Удалить"
                                                >
                                                    <FaTrash size={20} />
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
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
                onConfirm={() => confirmUserId && handleDelete(confirmUserId)}
            />
            {toast && <Toast message={toast.message} type={toast.type} />}
        </AdminLayout>
    );
};
