import React from 'react';
import { useSelector } from 'react-redux';
import { FaEdit } from 'react-icons/fa';
import type { RootState } from '@/store';
import { Loader } from '@/components/ui/Loader';
import { AdminLayout } from '@/layouts/AdminLayout';

export const Profile: React.FC = () => {
    const { user, isLoading } = useSelector((state: RootState) => state.auth);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
                <Loader label="Загружаем профиль..." />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
                <div className="text-center text-slate-400">Пользователь не найден</div>
            </div>
        );
    }

    return (
        <AdminLayout>
            <h1 className="text-4xl font-bold text-slate-100 mb-8 text-center">Личный кабинет</h1>

            <div className="max-w-2xl mx-auto bg-slate-800 border border-[#00aaff] rounded-lg p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-slate-100">Профиль</h2>
                    <button className="text-[#00aaff] hover:text-[#0088cc] transition-colors p-1">
                        <FaEdit size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-[#00aaff]">Имя</label>
                        <p className="text-slate-100 font-medium">{user.login}</p>
                    </div>
                    {user.registeredAt && (
                        <div>
                            <label className="text-sm text-[#00aaff]">Дата регистрации</label>
                            <p className="text-slate-100">{new Date(user.registeredAt).toLocaleDateString('ru-RU')}</p>
                        </div>
                    )}
                    <div>
                        <label className="text-sm text-[#00aaff]">Статус</label>
                        <p className="text-slate-100">{user.role}</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};
