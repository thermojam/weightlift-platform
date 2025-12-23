import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/store/auth/actions';
import type { RootState } from '@/store';
import { Button, Input } from "@/components/ui";

const schema = yup.object({
    login: yup.string().required('Логин обязателен'),
    password: yup.string().required('Пароль обязателен'),
});

interface LoginFormData {
    login: string;
    password: string;
}

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const error = useSelector((state: RootState) => state.auth.error);
    const isLoading = useSelector((state: RootState) => state.auth.isLoading);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginFormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: LoginFormData) => {
        const result = await dispatch(login(data.login, data.password) as any);
        if (result.success) {
            navigate('/profile');
        }
    };

    return (
        <div className="w-[500px]">
            <form onSubmit={handleSubmit(onSubmit)}
                  className="bg-[#1c202a]/50 backdrop-blur-sm rounded-3xl p-8 border border-[#00aaff]/90 shadow-2xl shadow-[#00aaff]/20">
                <h1 className="text-2xl font-bold text-[#00aaff] mb-8 text-center">Авторизация</h1>

                {error && (
                    <p className="bg-red-900/50 text-red-400 text-sm text-center p-3 rounded-lg mb-4">
                        {error}
                    </p>
                )}

                <label htmlFor="login-field" className="sr-only">Логин</label>
                <Input
                    id="login-field"
                    variant="auth"
                    type="text"
                    {...register('login')}
                    placeholder="Логин"
                    className="w-full bg-[#2c2c2c] border-none p-4 mb-4 text-gray-200 placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#00aaff]"
                />
                {errors.login && (
                    <p className="text-red-400 text-sm mb-2">{errors.login.message}</p>
                )}

                <label htmlFor="password-field" className="sr-only">Пароль</label>
                <Input
                    id="password-field"
                    variant="auth"
                    type="password"
                    {...register('password')}
                    placeholder="Пароль"
                    className="w-full bg-[#2c2c2c] border-none p-4 mb-6  text-gray-200 placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#00aaff] transition-shadow"
                />
                {errors.password && (
                    <p className="text-red-400 text-sm mb-2">{errors.password.message}</p>
                )}

                <Button
                    type="submit"
                    variant="auth"
                    disabled={isLoading}
                    className="w-full p-4 border-none rounded-full bg-gradient-to-r from-[#00aaff] to-[#0088cc] text-white font-bold cursor-pointer transition-all duration-300 ease-in-out shadow-[5px_5px_10px_#1e1e1e,_-5px_-5px_10px_#3a3a3a] mb-6 hover:shadow-[3px_3px_8px_#1e1e1e,_-3px_-3px_8px_#3a3a3a] hover:from-[#0088cc] hover:to-[#006699] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Вход...' : 'Войти'}
                </Button>

                <p className="text-center text-sm text-gray-400">
                    Нет аккаунта?{' '}
                    <NavLink to="/auth/register" className="font-medium text-[#00aaff] hover:underline cursor-pointer">
                        Зарегистрироваться
                    </NavLink>
                </p>
            </form>
        </div>
    );
};
