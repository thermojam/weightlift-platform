import { useState } from "react";
import type { FC, FormEvent, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { getAiResponse } from "@/shared/api";
import { usePosts } from "@/entities/Post/lib/usePosts";
import { useVideos } from "@/shared/hooks/useVideos";
import { Button, Input } from "@/shared/ui";
import { AI_ASSISTANT_RULES } from "@/shared/consts/aiAssistantRules";

interface ChatMessage {
    sender: "user" | "ai";
    text: string;
}

export const AiAssistant: FC = () => {
    const diaryEntries = useSelector((state: RootState) => state.diary.entries);
    const user = useSelector((state: RootState) => state.auth.user);
    const [aiMessage, setAiMessage] = useState("");
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { posts } = usePosts("");
    const { videos } = useVideos();

    const handleAiMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAiMessage(e.target.value);
    };

    const handleAiSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!aiMessage.trim()) return;

        const userMessage: ChatMessage = { sender: "user", text: aiMessage };
        setChatHistory((prev) => [...prev, userMessage]);
        setAiMessage("");
        setIsLoading(true);

        const formattedDiaryData =
            diaryEntries.length > 0
                ? JSON.stringify(diaryEntries.slice(-10), null, 2)
                : "Пока нет данных о тренировках.";

        const userLogin = user ? user.login : "атлет";

        const articlesKnowledgeBase = posts.map((p) => ({
            title: p.title,
            content: p.content.slice(0, 100) + "...",
        }));
        const videosKnowledgeBase = videos.map((v) => ({
            title: v.title,
            description: v.description.slice(0, 100) + "...",
        }));

        const fullPrompt = `
# Роль:
${AI_ASSISTANT_RULES.role}

# Правила ответа:
${AI_ASSISTANT_RULES.rules.join("\\n")}

# База знаний:
Тебе доступны следующие статьи и видео. Используй их для рекомендаций.

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
            const aiResponseMessage: ChatMessage = {
                sender: "ai",
                text: aiMessageText,
            };
            setChatHistory((prev) => [...prev, aiResponseMessage]);
        } catch (error) {
            console.error(error);
            const errorMessage: ChatMessage = {
                sender: "ai",
                text: "Произошла ошибка при получении ответа от ИИ.",
            };
            setChatHistory((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const welcomeMessage = user
        ? `${user.login}, задайте свой вопрос ...`
        : "Задайте свой вопрос ..";

    return (
        <div className="lg:col-span-5 bg-slate-800 p-6 rounded-lg shadow-lg mt-8 border border-[#00aaff]/90 shadow-[#00aaff]/20">
            <h2 className="text-2xl font-bold text-[#00aaff] mb-4">
                Ассистент
            </h2>
            <div className="h-96  bg-slate-900/50 rounded-lg p-8 flex flex-col">
                <div className="flex-grow overflow-y-auto mb-4 space-y-4">
                    {chatHistory.length === 0 ? (
                        <p className="text-slate-400">{welcomeMessage}</p>
                    ) : (
                        chatHistory.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${
                                    msg.sender === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <p
                                    className={`max-w-8/12 rounded-lg px-4 py-2 ${
                                        msg.sender === "user"
                                            ? "bg-blue-600 text-white"
                                            : "bg-cyan-950 text-slate-300"
                                    }`}
                                >
                                    {msg.text}
                                </p>
                            </div>
                        ))
                    )}
                    {isLoading && (
                        <div className="flex justify-start">
                            <p className="max-w-prose rounded-lg px-4 py-2 bg-cyan-950 text-slate-300">
                                Андрей думает...
                            </p>
                        </div>
                    )}
                </div>
                <form onSubmit={handleAiSubmit} className="mt-auto flex gap-2">
                    <Input
                        variant="form"
                        type="text"
                        value={aiMessage}
                        onChange={handleAiMessageChange}
                        placeholder="Спроси совета у тренера..."
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"
                        variant="outline"
                        disabled={isLoading}
                    >
                        {isLoading ? "..." : "Отправить"}
                    </Button>
                </form>
            </div>
        </div>
    );
};
