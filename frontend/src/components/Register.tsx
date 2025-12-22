import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register as registerUser } from '@/store/auth/actions';
import type { RootState } from '@/store';

const schema = yup.object({
    login: yup
        .string()
        .required('Логин обязателен')
        .min(3, 'Логин должен содержать минимум 3 символа')
        .max(20, 'Логин не может быть длиннее 20 символов')
        .matches(/^[a-zA-Z0-9_]+$/, 'Логин может содержать только буквы, цифры и подчеркивания'),
    password: yup
        .string()
        .required('Пароль обязателен')
        .min(6, 'Пароль должен содержать минимум 6 символов'),
    confirmPassword: yup
        .string()
        .required('Подтверждение пароля обязательно')
        .oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

interface RegisterFormData {
    login: string;
    password: string;
    confirmPassword: string;
}

export const Register: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const error = useSelector((state: RootState) => state.auth.error);
    const isLoading = useSelector((state: RootState) => state.auth.isLoading);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        const result = await dispatch(registerUser(data.login, data.password) as any);
        if (result.success) {
            navigate('/profile');
        }
    };

    return (
        <div className="w-[400px]">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-8 bg-[#2c2c2c] rounded-[15px]">
                <h1 className="text-2xl font-bold text-[#00aaff] mb-6 text-center">Регистрация</h1>

                {error && (
                    <p className="bg-red-900/50 text-red-400 text-sm text-center p-3 rounded-lg mb-4">
                        {error}
                    </p>
                )}

                <label htmlFor="login" className="sr-only">Логин</label>
                <input
                    id="login"
                    type="text"
                    {...register('login')}
                    placeholder="Логин"
                    className="w-full bg-[#2c2c2c] border-none p-4 mb-4 rounded-[10px] shadow-[inset_5px_5px_10px_#1e1e1e,_inset_-5px_-5px_10px_#3a3a3a] text-gray-200 placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#00aaff] transition-shadow"
                />
                {errors.login && (
                    <p className="text-red-400 text-sm mb-2">{errors.login.message}</p>
                )}

                <label htmlFor="password" className="sr-only">Пароль</label>
                <input
                    id="password"
                    type="password"
                    {...register('password')}
                    placeholder="Пароль"
                    className="w-full bg-[#2c2c2c] border-none p-4 mb-4 rounded-[10px] shadow-[inset_5px_5px_10px_#1e1e1e,_inset_-5px_-5px_10px_#3a3a3a] text-gray-200 placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#00aaff] transition-shadow"
                />
                {errors.password && (
                    <p className="text-red-400 text-sm mb-2">{errors.password.message}</p>
                )}

                <label htmlFor="confirmPassword" className="sr-only">Подтвердите пароль</label>
                <input
                    id="confirmPassword"
                    type="password"
                    {...register('confirmPassword')}
                    placeholder="Подтвердите пароль"
                    className="w-full bg-[#2c2c2c] border-none p-4 mb-6 rounded-[10px] shadow-[inset_5px_5px_10px_#1e1e1e,_inset_-5px_-5px_10px_#3a3a3a] text-gray-200 placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#00aaff] transition-shadow"
                />
                {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mb-2">{errors.confirmPassword.message}</p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full p-4 border-none rounded-[10px] bg-gradient-to-r from-[#00aaff] to-[#0088cc] text-white font-bold cursor-pointer transition-all duration-300 ease-in-out shadow-[5px_5px_10px_#1e1e1e,_-5px_-5px_10px_#3a3a3a] mb-6 hover:shadow-[3px_3px_8px_#1e1e1e,_-3px_-3px_8px_#3a3a3a] hover:from-[#0088cc] hover:to-[#006699] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>

                <p className="text-center text-sm text-gray-400">
                    Уже есть аккаунт?{' '}
                    <NavLink to="/auth/login" className="font-medium text-[#00aaff] hover:underline cursor-pointer">
                        Войти
                    </NavLink>
                </p>
            </form>
        </div>
    );
};
