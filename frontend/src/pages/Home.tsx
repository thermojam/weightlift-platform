import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import mainImage from '/coach-img.png';

export const Home: React.FC = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-0 h-full flex">
            <div className="w-full flex items-end">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full">
                    <div className="text-center md:text-left self-center">
                        <h1 className="text-4xl lg:text-5xl font-bold text-slate-100 mb-6">
                            Объединение научного подхода с авторским опытом в твоих руках
                        </h1>
                        <p className="text-lg text-gray-300 mb-4">
                            Приложение предлагает уникальное сочетание научных данных, авторских методик и живого
                            комьюнити.
                        </p>
                        <p className="text-lg text-gray-300 mb-8">
                            Здесь ты найдёшь всё необходимое для роста, мотивации и обмена опытом с единомышленниками.
                        </p>
                        <Link to="/auth">
                            <div className="relative group inline-block">
                                <div
                                    className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-tilt"/>
                                <Button
                                    size="lg"
                                    className="relative bg-black rounded-full text-2xl px-10 py-8 text-gray-300 cursor-pointer"
                                >
                                    Начать
                                </Button>
                            </div>
                        </Link>
                    </div>
                    <div className="flex justify-center md:justify-end items-end">
                        <img
                            src={mainImage}
                            alt="Coach"
                            className="w-full max-w-md lg:max-w-lg xl:max-w-xl self-end rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
