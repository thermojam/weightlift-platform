import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Marquee } from '@/shared/ui';
import {
    FaArrowCircleRight,
    FaBrain,
    FaUsers,
    FaChartLine,
    FaRobot,
    FaBookOpen,
    FaRunning
} from "react-icons/fa";
import mainImage from '../../public/images/coach.png';

export const Home: React.FC = () => {
    const marqueeItems = [
        { text: "Научный подход", icon: <FaBrain />, color: "text-cyan-400" },
        { text: "Авторские методики", icon: <FaBookOpen />, color: "text-amber-400" },
        { text: "Живое комьюнити", icon: <FaUsers />, color: "text-emerald-400" },
        { text: "Анализ прогресса", icon: <FaChartLine />, color: "text-indigo-400" },
        { text: "ИИ-Ассистент", icon: <FaRobot />, color: "text-rose-400" },
        { text: "Рост и мотивация", icon: <FaRunning />, color: "text-orange-400" },
    ];

    return (
        <div className="h-full w-full flex flex-col overflow-y-auto hide-scrollbar">

            <div className="flex-grow">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full mt-8">
                    <div className="relative h-full">

                        <div className="h-full grid grid-cols-1 md:grid-cols-2 items-center">

                            <div className="md:h-full flex flex-col justify-center text-center md:text-left py-8 md:py-0 z-10">
                                <h1 className="custom-title text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500 bg-clip-text text-transparent">
                                    Объединение научного подхода с авторским опытом в твоих руках
                                </h1>
                                <p className="custom-description text-lg sm:text-xl text-gray-300 my-6 md:my-8 max-w-xl mx-auto md:mx-0">
                                    Приложение предлагает уникальное сочетание научных данных, авторских методик и живого комьюнити. Здесь ты найдёшь всё необходимое для роста, мотивации и обмена опытом с единомышленниками.
                                </p>
                                <Link to="/auth" className="self-center md:self-start">
                                    <div className="relative group inline-block mt-4">
                                        <Button
                                            variant="secondary"
                                            size="lg"
                                            className="bg-white/5 border border-white/20 backdrop-blur-lg hover:bg-white/10 transition-colors"
                                        >
                                            Создать аккаунт
                                            <FaArrowCircleRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform"/>
                                        </Button>
                                    </div>
                                </Link>
                            </div>

                            <div className="md:hidden flex justify-center items-end">
                                <img
                                    src={mainImage}
                                    alt="Coach"
                                    className="max-w-xs sm:max-w-sm object-contain mt-8"
                                />
                            </div>
                        </div>

                        <div className="hidden md:flex justify-end items-end absolute bottom-0 right-0 h-full w-1/2 pointer-events-none">
                            <img
                                src={mainImage}
                                alt="Coach"
                                className="h-full w-auto object-contain"
                            />
                        </div>

                    </div>
                </div>
            </div>

            <div className="flex-shrink-0">
                <Marquee items={marqueeItems} />
            </div>

        </div>
    );
};
