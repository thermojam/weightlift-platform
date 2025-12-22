import React from 'react';
import { useSelector } from 'react-redux';
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import type { RootState } from '@/store';
import { useNavigate } from 'react-router-dom';
import { Loader } from '@/components/ui/Loader';

export const Profile: React.FC = () => {
    const navigate = useNavigate();
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
        <div className="flex min-h-[calc(100vh-160px)]">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-800 p-6 flex flex-col gap-4 border-r border-slate-700">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-100 hover:text-slate-300 transition-colors mb-4"
                >
                    <FaArrowLeft size={16} />
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 bg-slate-900">
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
                        <div>
                            <label className="text-sm text-[#00aaff]">Почта</label>
                            <p className="text-slate-100">{user.login}@example.com</p>
                        </div>
                        <div>
                            <label className="text-sm text-[#00aaff]">Роль</label>
                            <p className="text-slate-100">{user.role}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
