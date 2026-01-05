import React from 'react';
import { IMaskInput } from 'react-imask';
import { FaChevronDown } from 'react-icons/fa';
import { motion } from 'framer-motion';
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
        <>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full flex flex-col">
                <div className="flex-1 overflow-y-auto hide-scrollbar -mx-4 sm:-mx-6 lg:-mx-8">
                    <div className="px-4 sm:px-6 lg:px-8 pb-8">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-10 pt-4"
                        >
                            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500 bg-clip-text text-transparent mb-6">
                                Тренируйся с лучшими
                            </h1>
                            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                                Заполните форму, и мы разработаем для вас индивидуальный тренировочный план, основанный на
                                научных данных и проверенных авторских методиках.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="group max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-400/10"
                        >
                            <h2 className="text-2xl font-bold text-slate-300 mb-8 text-center transition-colors duration-300 group-hover:text-cyan-400">
                                Форма обратной связи
                            </h2>

                            <form id="feedback-form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                                <div>
                                    <label htmlFor="fullName" className="block text-slate-400 mb-2 text-sm">Имя</label>
                                    <Input id="fullName" {...register('fullName')} type="text" placeholder="Имя и Фамилия" variant="form" />
                                    {errors.fullName && <p className="text-red-400 text-sm mt-2">{errors.fullName.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="discipline" className="block text-slate-400 mb-2 text-sm">Дисциплина</label>
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
                                                    <option value="weightlifting">Тяжелая атлетика</option>
                                                    <option value="powerlifting">Пауэрлифтинг</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                                    <FaChevronDown className="text-slate-400" size={16} />
                                                </div>
                                            </div>
                                        )}
                                    />
                                    {errors.discipline && <p className="text-red-400 text-sm mt-2">{errors.discipline.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-slate-400 mb-2 text-sm">Номер телефона</label>
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
                                                className="w-full bg-slate-900/50 text-slate-200 rounded-full px-6 py-4 border-2 border-slate-800 shadow-inner shadow-black/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-slate-500"
                                            />
                                        )}
                                    />
                                    {errors.phone && <p className="text-red-400 text-sm mt-2">{errors.phone.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-slate-400 mb-2 text-sm">Рост, Вес, Пол</label>
                                    <div className="grid grid-cols-3 p-2 lg:p-2.5 bg-slate-900/50 rounded-full border-2 border-slate-800 shadow-inner ">
                                        <div className="text-center">
                                            <div className="flex items-center justify-center ">
                                                <Button type="button" onClick={() => adjustValue('height', -1)} variant="ghost" size="sm" className="w-7 lg:w-8">-</Button>
                                                <span className="flex-grow text-center text-base font-semibold select-none text-slate-100">{height}</span>
                                                <Button type="button" onClick={() => adjustValue('height', 1)} variant="ghost" size="sm" className="w-7 lg:w-8">+</Button>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="flex items-center justify-center">
                                                <Button type="button" onClick={() => adjustValue('weight', -1)} variant="ghost" size="sm" className="w-7 lg:w-8">-</Button>
                                                <span className="flex-grow text-center text-base font-semibold select-none text-slate-100">{weight}</span>
                                                <Button type="button" onClick={() => adjustValue('weight', 1)} variant="ghost" size="sm" className="w-7 lg:w-8">+</Button>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="flex items-center justify-center">
                                                <Button type="button" onClick={toggleGender} variant="ghost" size="sm" className="w-7 lg:w-8">-</Button>
                                                <span className="flex-grow text-center text-base font-semibold select-none text-slate-100">{gender === 'male' ? 'М' : 'Ж'}</span>
                                                <Button type="button" onClick={toggleGender} variant="ghost" size="sm" className="w-7 lg:w-8">+</Button>
                                            </div>
                                        </div>
                                    </div>
                                    {(errors.height || errors.weight || errors.gender) && <p className="text-red-400 text-sm mt-2">Проверьте данные</p>}
                                </div>
                                <div>
                                    <label htmlFor="city" className="block text-slate-400 mb-2 text-sm">Город</label>
                                    <Input id="city" {...register('city')} type="text" placeholder="Святой город" variant="form"/>
                                    {errors.city && <p className="text-red-400 text-sm mt-2">{errors.city.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-slate-400 mb-2 text-sm invisible">Отправить</label>
                                    <Button
                                        variant="outline"
                                        type="submit"
                                        form="feedback-form"
                                        disabled={isSubmitting || !!formError}
                                        className="w-full"
                                    >
                                        {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
            {toast && <Toast message={toast.message} type={toast.type}/>}
        </>
    );
};
