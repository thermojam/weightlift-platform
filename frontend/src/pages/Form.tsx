import React from 'react';
import { IMaskInput } from 'react-imask';
import { FaArrowUp } from 'react-icons/fa';
import { Button, Input, Toast } from '@/shared/ui';
import { useFeedbackForm } from '@/shared/hooks/useFeedbackForm';

export const Form: React.FC = () => {
    const {
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
        ControllerComponent,
    } = useFeedbackForm();

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-0 flex flex-col">
            <div className="flex-1 overflow-y-auto hide-scrollbar">
                <div className="text-center mb-8">
                    <h1 className="text-4xl lg:text-5xl font-bold text-slate-100 mb-6">
                        Тренируйся с лучшими - достигай большего!
                    </h1>
                    <p className="text-base text-slate-400 max-w-2xl mx-auto">
                        Присоединяйся к нашим тренировкам, чтобы получить не просто стандартную программу, а тщательно разработанный индивидуальный план, который учитывает твои уникальные особенности и цели. Наш подход основан на научных исследованиях в области спортивной адаптологии и проверенных авторских методах.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-[#1c202a]/50 border border-[#00aaff]/90 shadow-2xl shadow-[#00aaff]/20 rounded-3xl p-8">
                        <h2 className="text-xl font-bold text-[#00aaff] mb-8 text-center">
                            Форма обратной связи
                        </h2>

                        <form id="feedback-form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

                            <div>
                                <label htmlFor="fullName" className="block text-slate-400 mb-2 text-sm px-4">Имя</label>
                                <Input id="fullName" {...register('fullName')} type="text" placeholder="Adam Jones" variant="form" />
                                {errors.fullName && <p className="text-red-400 text-sm mt-2 px-4">{errors.fullName.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="discipline" className="block text-slate-400 mb-2 text-sm px-4">Дисциплина</label>
                                <ControllerComponent
                                    name="discipline"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="relative">
                                            <select
                                                id="discipline"
                                                {...field}
                                                className="w-full bg-slate-900/50 text-slate-200 rounded-full px-6 py-4 border-2 border-slate-800 shadow-inner shadow-black/40 focus:outline-none focus:border-[#00aaff]/50 appearance-none text-center"
                                            >
                                                <option value="weightlifting">Weightlifting</option>
                                                <option value="powerlifting">Powerlifting</option>
                                            </select>
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center pointer-events-none border border-slate-700 shadow-inner shadow-black/50">
                                                <FaArrowUp className="text-slate-400" size={12} />
                                            </div>
                                        </div>
                                    )}
                                />
                                {errors.discipline && <p className="text-red-400 text-sm mt-2 text-center">{errors.discipline.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-slate-400 mb-2 text-sm px-4">Номер телефона</label>
                                <ControllerComponent
                                    name="phone"
                                    control={control}
                                    render={({ field: { onChange, onBlur, value, name, ref } }) => (
                                        <IMaskInput
                                            mask="+{7} (000) 000-00-00"
                                            value={value || ''}
                                            unmask={true}
                                            onAccept={(unmaskedValue) => onChange({ target: { name, value: unmaskedValue } })}
                                            onBlur={onBlur}
                                            inputRef={ref}
                                            placeholder="+7 (999) 999-99-99"
                                            className="w-full bg-slate-900/50 text-slate-200 rounded-full px-6 py-4 border-2 border-slate-800 shadow-inner shadow-black/40 focus:outline-none focus:border-[#00aaff]/50 placeholder-slate-500"
                                        />
                                    )}
                                />
                                {errors.phone && <p className="text-red-400 text-sm mt-2 px-4">{errors.phone.message}</p>}
                            </div>

                            <div>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <label className="block text-slate-400 mb-2 text-sm">Рост</label>
                                        <div className="flex items-center justify-between bg-slate-900/50 text-slate-200 rounded-full border-2 border-slate-800 shadow-inner shadow-black/40 ">
                                            <Button type="button" onClick={() => adjustValue('height', -1)} variant="ghost" size="icon" className="rounded-r-none">-</Button>
                                            <span className="flex-grow text-center text-lg font-semibold select-none">{height}</span>
                                            <Button type="button" onClick={() => adjustValue('height', 1)} variant="ghost" size="icon" className="rounded-l-none">+</Button>
                                        </div>
                                        {errors.height && <p className="text-red-400 text-xs mt-1 text-center">{errors.height.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-slate-400 mb-2 text-sm">Вес</label>
                                        <div className="flex items-center justify-between bg-slate-900/50 text-slate-200 rounded-full border-2 border-slate-800 shadow-inner shadow-black/40 w-full">
                                            <Button type="button" onClick={() => adjustValue('weight', -1)} variant="ghost" size="icon" className="rounded-r-none">-</Button>
                                            <span className="flex-grow text-center text-lg font-semibold select-none">{weight}</span>
                                            <Button type="button" onClick={() => adjustValue('weight', 1)} variant="ghost" size="icon" className="rounded-l-none">+</Button>
                                        </div>
                                        {errors.weight && <p className="text-red-400 text-xs mt-1 text-center">{errors.weight.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-slate-400 mb-2 text-sm">Пол</label>
                                        <div className="flex items-center justify-between bg-slate-900/50 text-slate-200 rounded-full border-2 border-slate-800 shadow-inner shadow-black/40 w-full">
                                            <Button type="button" onClick={toggleGender} variant="ghost" size="icon" className="rounded-r-none">-</Button>
                                            <span className="flex-grow text-center text-lg font-semibold select-none">{gender === 'male' ? 'Муж' : 'Жен'}</span>
                                            <Button type="button" onClick={toggleGender} variant="ghost" size="icon" className="rounded-l-none">+</Button>
                                        </div>
                                        {errors.gender && <p className="text-red-400 text-xs mt-1 text-center">{errors.gender.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="city" className="block text-slate-400 mb-2 text-sm px-4">Город</label>
                                <Input id="city" {...register('city')} type="text" placeholder="Saint - Petersburg" variant="form" />
                                {errors.city && <p className="text-red-400 text-sm mt-2 px-4">{errors.city.message}</p>}
                            </div>

                            <div>
                                <label className="block text-slate-400 mb-2 text-sm px-4 invisible">Отправить</label>
                                <Button variant="auth" size="md"
                                        type="submit"
                                        form="feedback-form"
                                        disabled={isSubmitting || !!formError}
                                >
                                    {isSubmitting ? 'Отправка...' : 'Отправить'}
                                </Button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            {toast && <Toast message={toast.message} type={toast.type} />}
        </div>
    );
};
