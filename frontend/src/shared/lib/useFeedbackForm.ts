import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { apiClient } from '@/shared/api';
import { useToast } from '@/shared/lib/useToast';

const schema = yup.object({
    fullName: yup
        .string()
        .trim()
        .required('Имя и фамилия обязательны')
        .min(2, 'Минимум 2 символа')
        .max(100, 'Максимум 100 символов'),
    phone: yup
        .string()
        .required('Номер телефона обязателен')
        .length(11, 'Неверный формат номера телефона'),
    city: yup
        .string()
        .trim()
        .required('Город обязателен')
        .min(2, 'Минимум 2 символа')
        .max(100, 'Максимум 100 символов'),
    discipline: yup
        .mixed<'weightlifting' | 'powerlifting'>()
        .required('Дисциплина обязательна')
        .oneOf(['weightlifting', 'powerlifting'], 'Выберите дисциплину'),
    height: yup
        .number()
        .required('Рост обязателен')
        .min(100, 'Минимум 100 см')
        .max(250, 'Максимум 250 см')
        .typeError('Рост должен быть числом'),
    weight: yup
        .number()
        .required('Вес обязателен')
        .min(30, 'Минимум 30 кг')
        .max(300, 'Максимум 300 кг')
        .typeError('Вес должен быть числом'),
    gender: yup
        .mixed<'male' | 'female'>()
        .required('Пол обязателен')
        .oneOf(['male', 'female'], 'Выберите пол'),
});

interface FeedbackFormData {
    fullName: string;
    phone: string;
    city: string;
    discipline: 'weightlifting' | 'powerlifting';
    height: number;
    weight: number;
    gender: 'male' | 'female';
}

export const useFeedbackForm = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch,
        reset,
    } = useForm<FeedbackFormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            fullName: '',
            phone: '',
            city: '',
            discipline: 'weightlifting',
            height: 170,
            weight: 70,
            gender: 'male',
        },
    });

    const { toast, showToast } = useToast();

    const height = watch('height');
    const weight = watch('weight');
    const gender = watch('gender');

    const onSubmit = async (data: FeedbackFormData) => {
        try {
            await apiClient.post('/feedback', data);
            showToast('Форма успешно отправлена', 'success');
            setTimeout(() => reset(), 0);
        } catch (error: any) {
            showToast(error.response?.data?.error || 'Ошибка при отправке формы', 'error');
        }
    };

    const adjustValue = (field: 'height' | 'weight', delta: number) => {
        const current = watch(field);
        let newValue: number;
        if (field === 'height') {
            newValue = Math.max(100, Math.min(250, current + delta));
        } else {
            newValue = Math.max(30, Math.min(300, current + delta));
        }
        setValue(field, newValue, { shouldValidate: true });
    };

    const toggleGender = () => {
        setValue('gender', gender === 'male' ? 'female' : 'male', { shouldValidate: true });
    };

    const formError = errors.fullName?.message || errors.phone?.message || errors.city?.message || errors.discipline?.message || errors.height?.message || errors.weight?.message || errors.gender?.message;

    return {
        register,
        control,
        handleSubmit,
        errors,
        isSubmitting,
        height,
        weight,
        gender,
        onSubmit,
        adjustValue,
        toggleGender,
        formError,
        toast,
        ControllerComponent: Controller,
    };
};
