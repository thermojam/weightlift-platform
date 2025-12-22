import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@/components/ui/Button';
import { FaArrowCircleRight } from "react-icons/fa";

import mainImage from '/coach-img.png';

export const Home: React.FC = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-0 h-full flex">
            <div className="w-full flex items-end">
                <div className="grid grid-cols-1 md:grid-cols-2 w-full">
                    <div className="text-center md:text-left self-center">
                        <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500 bg-clip-text text-transparent">
                            Объединение научного подхода с авторским опытом в твоих руках
                        </h1>
                        <p className="text-2xl text-gray-300 my-12">
                            Приложение предлагает уникальное сочетание научных данных, авторских методик и живого
                            комьюнити.
                            Здесь ты найдёшь всё необходимое для роста, мотивации и обмена опытом с единомышленниками.
                        </p>
                        <Link to="/auth">
                            <div className="relative group inline-block">
                                <Button variant="secondary" size="lg">
                                    Создать аккаунт
                                    <FaArrowCircleRight size={20} className="mx-2"/>
                                </Button>
                            </div>
                        </Link>
                    </div>
                    <div className="flex justify-center md:justify-end items-end">
                        <img
                            src={mainImage}
                            alt="Coach"
                            className="w-full max-w-md lg:max-w-lg xl:max-w-lg self-end rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
