'use client'

import { id } from "date-fns/locale";
import { MoveRight, Timer } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export function IASection() {
    const [message, setMessage] = useState("");
    const [mode, setMode] = useState(1);
    const [onFocus, setOnFocus] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height =
                textareaRef.current.scrollHeight + "px";
        }
    };

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="flex items-center gap-2">
                <Image
                    src="/iaManager.png"
                    alt="Chat AI"
                    width={60}
                    height={60}
                    className="rounded-full"
                />
                <h1 className="text-2xl font-bold">
                    Como posso te ajudar hoje?
                </h1>
            </div>

            <div className="w-full flex flex-col justify-center items-center">
                <div className={`w-[40%] flex flex-col mt-6 p-2 bg-zinc-800/30 border ${onFocus ? "rounded-t-xl" : "rounded-xl"} duration-100`}>
                    <textarea
                        ref={textareaRef}
                        className="p-2 outline-none w-full resize-none overflow-auto"
                        placeholder="Digite sua mensagem..."
                        onFocus={() => setOnFocus(true)}
                        onBlur={() => setOnFocus(false)}
                        value={message}
                        onInput={handleInput}
                        rows={1}
                    />
                    <div className="flex justify-between">
                        <div className="flex gap-0.5 p-0.5 bg-zinc-900 rounded-lg text-sm text-zinc-400">
                            <button
                                className={`relative group ${mode == 1 ? "bg-zinc-800/70 text-zinc-200" : "hover:bg-zinc-800/30 cursor-pointer"} p-1 px-2 rounded-md duration-200`}
                                onClick={() => setMode(1)}
                            >
                                Perguntar
                                <div className="absolute hidden -left-15 top-12 group-hover:block w-50 border bg-zinc-800/30 p-1 rounded-md">
                                    <span className="text-sm font-semibold">Responder suas perguntas</span>
                                </div>
                            </button>
                            <button
                                className={`relative group ${mode == 2 ? "bg-zinc-800/70 text-zinc-200" : "hover:bg-zinc-800/30 cursor-pointer"} p-1 px-2 rounded-md duration-200`}
                                onClick={() => setMode(2)}
                            >
                                Pesquisa
                                <div className="absolute hidden -left-15 top-12 group-hover:block w-50 border bg-zinc-800/30 p-1 rounded-md">
                                    <span className="text-sm font-semibold">Pesquisar sobre um assunto</span>
                                </div>
                            </button>
                            <button
                                className={`relative group ${mode == 3 ? "bg-zinc-800/70 text-zinc-200" : "hover:bg-zinc-800/30 cursor-pointer"} p-1 px-2 rounded-md duration-200`}
                                onClick={() => setMode(3)}
                            >
                                Criar
                                <div className="absolute hidden -left-7 top-12 group-hover:block w-26 border bg-zinc-800/30 p-1 rounded-md">
                                    <span className="text-sm font-semibold">Criar dados</span>
                                </div>
                            </button>
                        </div>

                        <div className="flex items-center justify-center gap-2">
                            <button className="group relative p-1 px-2 rounded-md text-zinc-400 hover:bg-zinc-800 duration-200">
                                @
                                <div className="absolute hidden -left-16 top-12 group-hover:block w-40 border bg-zinc-800/30 p-1 rounded-md">
                                    <span className="text-sm font-semibold">Mencionar alguem</span>
                                </div>
                            </button>
                            <button className="p-1.5 rounded-md bg-zinc-800/70 text-zinc-400 hover:bg-green-600 hover:text-zinc-50 duration-200">
                                <MoveRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
                {
                    onFocus ?
                        <div className="w-[40%] p-2 bg-zinc-800/30 border border-t-0 rounded-b-xl">
                            <p className="text-zinc-400 text-sm">Aguardando você digitar uma mensagem...</p>
                        </div> : ""
                }
            </div>
        </div>
    );
}

const List = [
    {
        id: 1,
        title: "Criar lista para vemency",
    },
    {
        id: 2,
        title: "Adicionar larissa com sócia",
    },
    {
        id: 3,
        title: "Adicionar Carlos como financeiro",
    },
];

export function IAPastActivities() {
    return (
        <div className="w-[40%] space-y-4">
            <div className="flex gap-1 items-center justify-center text-zinc-400">
                <Timer />
                <span className="text-sm font-semibold">Atividades recentes</span>
            </div>

            <div className="grid grid-cols-1">
                {
                    List.map((item) => (
                        <div key={item.id} className={`relative h-18 flex flex-col justify-between border overflow-hidden bg-zinc-800/30 space-y-1 rounded-xl ${item.id !== 1 ? "mt-4" : ""}`}>
                            <div className="w-full bg-zinc-400 h-[40%] px-2 flex items-center">
                                <div className="bg-red-700/60 rounded-sm text-sm font-semibold px-2">Excluir</div>
                            </div>
                            <h1 className="px-2 text-lg font-semibold mb-2">{item.title}</h1>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
