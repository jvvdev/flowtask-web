'use client'

import { authService } from "@/api/auth-service";
import { chatIaService } from "@/api/dashboard/chatia-service";
import { teamService } from "@/api/dashboard/team-service";
import { is } from "date-fns/locale";
import { BotMessageSquare, Loader2, MoveRight, Timer, Users, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";


interface Message {
    role: string;
    content: string;
}

interface FormValues {
    message: string;
}

export function IASection() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([])
    const [mode, setMode] = useState(1);
    const [onFocus, setOnFocus] = useState(false);
    const [isChatting, setIsChatting] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [notActiveGroup, setNotActiveGroup] = useState(false)
    const [loading, setLoading] = useState(true)

    const { register, handleSubmit } = useForm<FormValues>();

    useEffect(() => {
        async function getData() {
            const actualGroupRaw = await teamService.getTeamByUser();
            let actualGroup: { id_group: string } | null = null;
            if (actualGroupRaw) {
                try {
                    actualGroup = JSON.parse(actualGroupRaw);
                    setLoading(false)
                } catch {
                    actualGroup = null;
                    setLoading(false)
                }
            } else {
                setNotActiveGroup(true);
                setLoading(false)
            }
            if (!actualGroup) return;

        }

        getData();
    }, []);

    // aumentar tamanho do textarea
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height =
                textareaRef.current.scrollHeight + "px";
        }
    };

    const onSubmit = async (data: FormValues) => {
        setIsChatting(true);

        console.log(data.message);

        // adiciona a mensagem do usuário
        setMessages(prev => [
            ...prev,
            {
                role: "user",
                content: message,
            }
        ]);

        const res = await chatIaService.getResponse(message);

        console.log(res);

        if (res.message === "Prompt gerado com sucesso") {
            // adiciona a resposta do assistente sem apagar a do usuário
            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    content: res.data,
                }
            ]);
        }
    };

    useEffect(() => {
        if (!onFocus) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
handleSubmit(onSubmit)();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onFocus]);

    return (
        loading ? <div className="w-full h-full flex items-center justify-center opacity-50 gap-1">
            <Loader2 className="animate-spin" />
            Carregando...
        </div> : notActiveGroup ?
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <Users size={40} className="text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">Nenhum grupo ativo encontrado</h3>
                <p className="text-muted-foreground">Selecione um grupo para acessar essa página.</p>
            </div> : <div className={`flex flex-col h-[90vh] w-full items-center ${!isChatting ? "justify-center" : ""}`}>

                {/* Header / topo fixo */}
                {!isChatting && (
                    <div className="flex items-center sm:gap-2">
                        <Image
                            src="/iaManager.png"
                            alt="Chat AI"
                            width={60}
                            height={60}
                            className="rounded-full size-15 sm:size-18"
                        />
                        <h1 className="text-lg sm:text-2xl font-bold">
                            Como posso te ajudar hoje?
                        </h1>
                    </div>
                )}

                {/* Container das mensagens */}
                {isChatting && (
                    <div className="my-4 flex flex-col w-[95%] sm:w-120 2xl:w-[40%] flex-1 overflow-y-auto gap-2 p-4 pr-2
                                [&::-webkit-scrollbar]:w-1.5
                                [&::-webkit-scrollbar-track]:rounded-md
                                [&::-webkit-scrollbar-thumb]:rounded-md
                                [&::-webkit-scrollbar-track]:bg-zinc-200/50
                                dark:[&::-webkit-scrollbar-track]:bg-zinc-800/30
                                [&::-webkit-scrollbar-thumb]:bg-zinc-400
                                dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700">
                        {messages.map((item, index) => (
                            <div
                                key={index}
                                className={`flex ${item.role === "user" ? "self-end" : ""} p-2 max-w-[90%] rounded-md border dark:bg-zinc-800/30 dark:border-zinc-200/5 dark:text-zinc-50/90`}
                            >
<ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                    {item.content.replace(/\n/g, "<br />")}
                                </ReactMarkdown>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer / form fixo no final do container */}
                <div className="w-[95%] sm:w-120 2xl:w-[40%] p-2 bg-zinc-50 dark:bg-zinc-800/30 border rounded-xl mb-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
                        <textarea
                            className="p-2 outline-none w-full resize-none overflow-auto max-h-32"
                            placeholder="Digite sua mensagem..."
                            onFocus={() => setOnFocus(true)}
                            value={message}
                            onInput={handleInput}
                            rows={1}
                            {...register("message", { required: true })}
                        />
                        <div className="flex items-center justify-center gap-2">
                            <button className="group relative p-1 px-2 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-400 hover:bg-zinc-300 dark:hover:bg-zinc-800 duration-200">
                                @
                                <div className="absolute hidden -left-16 top-12 group-hover:block w-40 border bg-zinc-50 dark:bg-zinc-800/30 p-1 rounded-md cursor-pointer">
                                    <span className="text-sm font-semibold">Mencionar alguém</span>
                                </div>
                            </button>
                            <button
                                type="submit"
                                className="p-1.5 rounded-md bg-zinc-200 text-zinc-600 dark:bg-zinc-800/70 dark:text-zinc-400 hover:bg-green-600 hover:text-zinc-50 duration-200 cursor-pointer"
                            >
                                <MoveRight size={20} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    );
}
