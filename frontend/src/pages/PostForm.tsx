import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Loader, Toast  } from '@/shared/ui';
import { useToast } from '@/shared/lib/useToast';
import { fetchPost, addPost, updatePost } from '@/app/store/posts/actions';
import type { RootState } from '@/app/store';

const schema = yup.object({
    title: yup
        .string()
        .required('Заголовок обязателен')
        .min(3, 'Заголовок должен содержать минимум 3 символа')
        .max(200, 'Заголовок не может быть длиннее 200 символов'),
    content: yup
        .string()
        .required('Содержание обязательно')
        .min(10, 'Содержание должно содержать минимум 10 символов'),
    imageUrl: yup
        .string()
        .required('URL изображения обязателен')
        .url('Введите корректный URL'),
});

interface PostFormData {
    title: string;
    content: string;
    imageUrl: string;
}

export const PostForm: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const post = useSelector((state: RootState) => state.posts.post);
    const error = useSelector((state: RootState) => state.posts.error);
    const isLoading = useSelector((state: RootState) => state.posts.isLoading);
    const isEditing = !!id;
    const { toast, showToast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<PostFormData>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (isEditing && id) {
            dispatch(fetchPost(id));
        }
    }, [id, isEditing, dispatch]);

    useEffect(() => {
        if (post && isEditing) {
            setValue('title', post.title);
            setValue('content', post.content);
            setValue('imageUrl', post.imageUrl);
        }
    }, [post, isEditing, setValue]);

    const onSubmit = async (data: PostFormData) => {
        const postData = {
            title: data.title,
            content: data.content,
            imageUrl: data.imageUrl,
        };

        if (isEditing && id) {
            const result = await dispatch(updatePost(id, postData));
            if (result.success) {
                showToast('Статья обновлена', 'success');
                navigate(`/posts/${id}`);
            } else if (result.error) {
                showToast(result.error.message, 'error');
            }
        } else {
            const result = await dispatch(addPost(postData));
            if (result.payload) {
                showToast('Статья создана', 'success');
                navigate(`/posts/${result.payload.id}`);
            } else if (result.error) {
                showToast(result.error.message, 'error');
            }
        }
    };

    if (isEditing && isLoading && !post) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Loader label="Загружаем статью..." />
            </div>
        );
    }

    if (isEditing && error && !post) {
        return <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-red-400">{error as string}</div>;
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-slate-100 mb-8">{isEditing ? 'Редактировать статью' : 'Создать статью'}</h1>
            {error && (
                <div className="bg-red-900/50 text-red-400 text-sm text-center p-3 rounded-lg mb-4">
                    {error as string}
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-800 rounded-lg shadow-lg p-8">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-slate-300 mb-2">Заголовок</label>
                    <input
                        id="title"
                        type="text"
                        {...register('title')}
                        className="w-full bg-slate-700 text-slate-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.title && (
                        <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="imageUrl" className="block text-slate-300 mb-2">URL изображения</label>
                    <input
                        id="imageUrl"
                        type="text"
                        {...register('imageUrl')}
                        className="w-full bg-slate-700 text-slate-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.imageUrl && (
                        <p className="text-red-400 text-sm mt-1">{errors.imageUrl.message}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-slate-300 mb-2">Содержание</label>
                    <textarea
                        id="content"
                        {...register('content')}
                        className="w-full bg-slate-700 text-slate-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={10}
                    />
                    {errors.content && (
                        <p className="text-red-400 text-sm mt-1">{errors.content.message}</p>
                    )}
                </div>
                <Button variant="outline" type="submit">{isEditing ? 'Сохранить' : 'Создать'}</Button>
            </form>
            {toast && <Toast message={toast.message} type={toast.type} />}
        </div>
    );
};
