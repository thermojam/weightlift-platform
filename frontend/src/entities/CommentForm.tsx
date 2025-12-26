import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addComment, fetchPost } from '@/app/store/posts/actions';
import { Button } from '@/shared/ui';
import type { RootState } from '@/app/store';

interface CommentFormProps {
    postId: string;
}

const schema = yup.object({
    content: yup
        .string()
        .required('Комментарий не может быть пустым')
        .min(1, 'Комментарий должен содержать хотя бы 1 символ')
        .max(1000, 'Комментарий не может быть длиннее 1000 символов'),
});

interface CommentFormData {
    content: string;
}

export const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CommentFormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: CommentFormData) => {
        const result = await dispatch(addComment(postId, data.content));
        if (result.payload) {
            reset();
            dispatch(fetchPost(postId));
        } else if (result.error) {
            console.error('Ошибка при добавлении комментария:', result.error);
        }
    };

    if (!user) {
        return (
            <div className="mt-8 bg-slate-800 rounded-lg p-6 border border-slate-700">
                <p className="text-slate-300 mb-4 text-center">
                    Хотите оставить комментарий?
                </p>
                <p className="text-slate-400 mb-4 text-center text-sm">
                    Войдите в систему или зарегистрируйтесь, чтобы присоединиться к обсуждению!
                </p>
                <div className="flex gap-4 justify-center">
                    <Button
                        onClick={() => navigate('/auth/login')}
                        variant="primary"
                    >
                        Войти
                    </Button>
                    <Button
                        onClick={() => navigate('/auth/register')}
                        variant="outline"
                    >
                        Зарегистрироваться
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <textarea
                {...register('content')}
                placeholder="Написать комментарий..."
                className="w-full bg-slate-700 text-slate-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
            />
            {errors.content && (
                <p className="text-red-400 text-sm mt-1">{errors.content.message}</p>
            )}
            <Button type="submit" className="mt-2">Отправить</Button>
        </form>
    );
};
