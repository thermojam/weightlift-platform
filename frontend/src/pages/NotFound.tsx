import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

export const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-0">
            <div className="flex flex-col items-center justify-center flex-1">
                <h1 className="text-9xl font-bold text-[#00aaff] mb-4">404</h1>

                <p className="text-3xl text-slate-100 mb-8">Страница не найдена</p>

                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-3 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-lg px-6 py-3 text-[#00aaff] hover:bg-slate-700/80 transition-all duration-300 hover:border-[#00aaff] group"
                >
                    <span className="text-lg font-medium">Вернуться на главную</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};
