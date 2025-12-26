import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import type { IUser } from '@/app/store/user/types';
import { Loader, Modal, Toast } from '@/shared/ui';
import { AdminLayout } from '@/widgets/AdminLayout';
import { useUsers } from '@/shared/lib/useUsers';

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
            <h1 className="text-4xl font-bold text-slate-100 mb-8 text-center">Все пользователи</h1>

            <div className="space-y-4 max-w-6xl mx-auto">
                <div className="grid grid-cols-5 gap-4 mb-4 px-4">
                    <div className="text-[#00aaff] font-semibold">Имя</div>
                    <div className="text-[#00aaff] font-semibold">Дата регистрации</div>
                    <div className="text-[#00aaff] font-semibold">Статус</div>
                    <div className="text-[#00aaff] font-semibold">Роль</div>
                    <div className="text-[#00aaff] font-semibold">Действия</div>
                </div>

                {users.length === 0 ? (
                    <div className="text-center text-slate-400 py-8">Пользователи не найдены</div>
                ) : (
                    users.map((user: IUser) => (
                        <div
                            key={user.id}
                            className="p-4 grid grid-cols-5 gap-4 items-center bg-[#3C4254]/90"
                        >
                            <div className="text-slate-100 font-medium">{user.login}</div>
                            <div className="text-slate-100">
                                {user.registeredAt ? new Date(user.registeredAt).toLocaleDateString('ru-RU') : 'N/A'}
                            </div>
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
                                            <FaEdit size={24}/>
                                        </button>
                                        {user.id !== currentUser?.id && (
                                            <button
                                                onClick={() => setConfirmUserId(user.id)}
                                                className="text-red-400 hover:text-red-300 transition-colors p-1"
                                                title="Удалить"
                                            >
                                                <FaTrash size={20}/>
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
                onConfirm={() => confirmUserId && handleDelete(confirmUserId)}
            />
            {toast && <Toast message={toast.message} type={toast.type} />}
        </AdminLayout>
    );
};
