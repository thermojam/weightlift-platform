import { useState } from 'react';
import type { FC, FormEvent, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import { getAiResponse } from '@/shared/api';
import { usePosts } from '@/shared/lib/usePosts';
import { useVideos } from '@/shared/lib/useVideos';

interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}

export const AiAssistant: FC = () => {
    const diaryEntries = useSelector((state: RootState) => state.diary.entries);
    const user = useSelector((state: RootState) => state.auth.user);
    const [aiMessage, setAiMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { posts } = usePosts('');
    const { videos } = useVideos();

    const handleAiMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAiMessage(e.target.value);
    };

    const handleAiSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!aiMessage.trim()) return;

        const userMessage: ChatMessage = { sender: 'user', text: aiMessage };
        setChatHistory((prev) => [...prev, userMessage]);
        setAiMessage('');
        setIsLoading(true);

        const formattedDiaryData =
            diaryEntries.length > 0
                ? JSON.stringify(diaryEntries.slice(-10), null, 2)
                : 'Пока нет данных о тренировках.';

        const userLogin = user ? user.login : 'атлет';

        const articlesKnowledgeBase = posts.map((p) => ({ title: p.title, content: p.content.slice(0, 100) + '...' }));
        const videosKnowledgeBase = videos.map((v) => ({ title: v.title, description: v.description.slice(0, 100) + '...' }));

        const fullPrompt = `
# Роль:
Ты — тренер по тяжелой атлетике по имени "Андрей Владимирович". Твой стиль — это смесь суровой справедливости, глубокой экспертизы и тонкого юмора. Ты не терпишь лени, но всегда готов похвалить за реальные достижения.

# Правила ответа:
1.  **Опора на данные:** Твой анализ и советы должны строиться ИСКЛЮЧИТЕЛЬНО на данных из дневника тренировок. Не выдумывай цифры, методы или упражнения, которых нет в логах. Ссылайся на конкретные даты и показатели.
2.  **Принципиальность:** Будь честным и справедливым. Если атлет показывает регресс или плато, скажи об этом прямо, но конструктивно. Например: "Вижу, твой присед с 15-го числа стоит на месте. Пора встряхнуться."
3.  **Остроумие:** Ты можешь использовать уместный юмор и сарказм. Если прогресса нет, можно пошутить. Если прогресс есть, похвали, но сдержанно: "Неплохо, атлет. Ты почти перестал напоминать новичка."
4.  **Образ "мастера своего дела":** Говори как строгий, но мудрый наставник. Начинай ответ с обращения к клиенту по логину на ты.
5.  **Рекомендации контента:** Если вопрос или данные указывают на проблему (плато, плохая техника, отсутствие прогресса), порекомендуй релевантную статью или видео из Базы знаний. Форматируй рекомендацию так: "💡 **Рекомендую:** [Название статьи/видео]".

# База знаний:
Тебе доступны следующие статьи и видео. Используй их для рекомендаций. Но не навязчиво, только при необходимости!

**Статьи:**
\`\`\`json
${JSON.stringify(articlesKnowledgeBase, null, 2)}
\`\`\`

**Видео:**
\`\`\`json
${JSON.stringify(videosKnowledgeBase, null, 2)}
\`\`\`

# Контекст:
Твой клиент, ${userLogin}, предоставил свои последние данные по тренировкам и задает тебе вопрос.

**Данные тренировок клиента (последние 10 записей):**
\`\`\`json
${formattedDiaryData}
\`\`\`

**Вопрос клиента:**
"${aiMessage}"

# Задача:
Проанализируй данные, ответь на вопрос и дай рекомендации, строго следуя своим правилам и образу. Если нужно, порекомендуй материалы из Базы знаний.
`;

        try {
            const response = await getAiResponse(fullPrompt);
            const aiMessageText = response.choices[0].message.content;
            const aiResponseMessage: ChatMessage = { sender: 'ai', text: aiMessageText };
            setChatHistory((prev) => [...prev, aiResponseMessage]);
        } catch (error) {
            console.error(error);
            const errorMessage: ChatMessage = {
                sender: 'ai',
                text: 'Произошла ошибка при получении ответа от ИИ.',
            };
            setChatHistory((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const welcomeMessage = user
        ? `${user.login}, задайте свой вопрос...`
        : 'Задайте свой вопрос...';

    return (
        <div className="lg:col-span-5 bg-slate-800 p-6 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold text-slate-100 mb-4">ИИ Ассистент</h2>
            <div className="h-96 bg-slate-900/50 rounded-lg p-4 flex flex-col">
                <div className="flex-grow overflow-y-auto mb-4 space-y-4">
                    {chatHistory.length === 0 ? (
                        <p className="text-slate-400">{welcomeMessage}</p>
                    ) : (
                        chatHistory.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${
                                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                                }`}
                            >
                                <p
                                    className={`max-w-prose rounded-lg px-4 py-2 ${
                                        msg.sender === 'user'
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-slate-700 text-slate-300'
                                    }`}
                                >
                                    {msg.text}
                                </p>
                            </div>
                        ))
                    )}
                    {isLoading && (
                        <div className="flex justify-start">
                            <p className="max-w-prose rounded-lg px-4 py-2 bg-slate-700 text-slate-300">
                                Ассистент анализирует твои данные...
                            </p>
                        </div>
                    )}
                </div>
                <form onSubmit={handleAiSubmit} className="mt-auto flex">
                    <input
                        type="text"
                        value={aiMessage}
                        onChange={handleAiMessageChange}
                        placeholder="Спроси совета у тренера..."
                        className="flex-grow bg-slate-700 border border-slate-600 rounded-l-lg py-2 px-3 text-slate-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-r-lg disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? '...' : 'Отправить'}
                    </button>
                </form>
            </div>
        </div>
    );
};
