'use client'

import { is } from "date-fns/locale";
import { MoveRight, Timer, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function IASection() {
    const [message, setMessage] = useState("");
    const [mode, setMode] = useState(1);
    const [onFocus, setOnFocus] = useState(false);
    const [isChatting, setIsChatting] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // aumentar tamanho do textarea
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height =
                textareaRef.current.scrollHeight + "px";
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsChatting(true);
        // Aqui você pode adicionar a lógica para enviar a mensagem para a IA
    };

    useEffect(() => {
        if (!onFocus) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onFocus]);

    return (
        <div className={`w-full h-full flex flex-col ${isChatting ? "justify-end items-center pb-12" : "items-center py-50"}`}>
            {
                !isChatting ? <div className="flex items-center sm:gap-2">
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
                </div> :
                    <div className="flex flex-col justify-end w-[95%] sm:w-120 2xl:w-[40%] h-full relative">
                        <div className="absolute right-0 flex p-2 w-fit rounded-md border dark:bg-zinc-800/30 dark:border-zinc-200/5 dark:text-zinc-50/90">
                            <p>{message}</p>
                        </div>
                    </div>
            }

            <div className={`w-full flex flex-col justify-center items-center`}>
                <div className={`${isChatting ? "w-[95%] sm:w-120 2xl:w-[40%]" : "w-[95%] sm:w-120 2xl:w-[40%]"} flex mt-6 p-2 bg-zinc-50 dark:bg-zinc-800/30 border ${onFocus ? "rounded-t-xl" : "rounded-xl"} duration-100`}>
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
                    <div className="flex items-center justify-center gap-2">
                        <button className="group relative p-1 px-2 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-400 hover:bg-zinc-300 dark:hover:bg-zinc-800 duration-200">
                            @
                            <div className="absolute hidden -left-16 top-12 group-hover:block w-40 border bg-zinc-50 dark:bg-zinc-800/30 p-1 rounded-md cursor-pointer">
                                <span className="text-sm font-semibold">Mencionar alguem</span>
                            </div>
                        </button>
                        <button className="p-1.5 rounded-md bg-zinc-200 text-zinc-600 dark:bg-zinc-800/70 dark:text-zinc-400 hover:bg-green-600 hover:text-zinc-50 duration-200 cursor-pointer">
                            <MoveRight size={20} />
                        </button>
                    </div>
                </div>
                {
                    onFocus ?
                        <div className={`${isChatting ? "w-[95%] sm:w-120 2xl:w-[40%]" : "w-[95%] sm:w-120 2xl:w-[40%]"} p-2 bg-zinc-50 dark:bg-zinc-800/30 border border-t-0 rounded-b-xl`}>
                            <p className="text-zinc-400 text-sm">Aguardando você digitar uma mensagem...</p>
                        </div> : ""
                }
            </div>
        </div>
    );
}

// const List = [
//     {
//         id: 1,
//         title: "Criar lista para vemency",
//     },
//     {
//         id: 2,
//         title: "Adicionar larissa com sócia",
//     },
//     {
//         id: 3,
//         title: "Adicionar Carlos como financeiro",
//     },
// ];

// export function IAPastActivities() {
//     return (
//         <div className="w-[40%] space-y-4">
//             <div className="flex gap-1 items-center justify-center text-zinc-400">
//                 <Timer />
//                 <span className="text-sm font-semibold">Atividades recentes</span>
//             </div>

//             <div className="grid grid-cols-1">
//                 {
//                     List.map((item) => (
//                         <div key={item.id} className={`relative h-18 flex flex-col justify-between border overflow-hidden bg-zinc-800/30 space-y-1 rounded-xl ${item.id !== 1 ? "mt-4" : ""}`}>
//                             <div className="w-full bg-zinc-400 h-[40%] px-1.5 flex items-center">
//                                 <div className="bg-red-700/60 hover:bg-red-700/80 rounded-full font-semibold text-zinc-200/80 p-0.5 cursor-pointer duration-200"><X size={15} /></div>
//                             </div>
//                             <h1 className="px-2 text-lg font-semibold mb-2">{item.title}</h1>
//                         </div>
//                     ))
//                 }
//             </div>
//         </div>
//     );
// }
