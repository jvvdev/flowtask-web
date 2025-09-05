'use client'

import { Inbox, KeyRound, Pencil, Trash2, User } from "lucide-react";
import { useState } from "react";

export function AccountSettings() {
    const [isEdited, setIsEdited] = useState(false);

    return (
        <div className="w-full py-2">
            <div className="text-2xl font-semibold flex justify-center">Configurações da Conta</div>

            <p className="mt-4 text-lg font-semibold text-muted-foreground">Informações confidenciais</p>
            <div className="flex flex-col gap-3">
                <div className={`w-full mt-2 p-2 flex justify-between items-center gap-2 rounded-lg border bg-zinc-200/40 dark:bg-zinc-800/70 dark:border-zinc-200/5 duration-200`}>
                    <div className="flex items-center gap-2 w-full">
                        <User className="p-[5px] text-zinc-700 dark:text-zinc-50/80 rounded-md" size={32} />
                        <p className="text-md font-semibold text-zinc-700 dark:text-zinc-50/80">Nome exibido</p>
                    </div>

                    <div className="w-full flex justify-end items-center gap-2 pr-1 text-zinc-600 dark:text-zinc-400">
                        <p className="text-right font-semibold">Adriel Lucas</p>
                        <Pencil className="cursor-pointer text-zinc-700 hover:text-zinc-800 dark:text-zinc-50/80 dark:hover:text-zinc-50 duration-200" size={20} />
                    </div>
                </div>

                <div className={`w-full p-2 flex justify-between items-center gap-2 rounded-lg border bg-zinc-200/40 dark:bg-zinc-800/70 dark:border-zinc-200/5 duration-200`}>
                    <div className="flex items-center gap-2 w-full">
                        <Inbox className="p-[5px] text-zinc-700 dark:text-zinc-50/80 rounded-md" size={32} />
                        <p className="text-md font-semibold text-zinc-700 dark:text-zinc-50/80">Email cadastrado</p>
                    </div>

                    <div className="w-full flex justify-end items-center gap-2 pr-1 text-zinc-600 dark:text-zinc-400">
                        <p className="text-right font-semibold">a.lucas@example.com</p>
                        <Pencil className="cursor-pointer text-zinc-700 hover:text-zinc-800 dark:text-zinc-50/80 dark:hover:text-zinc-50 duration-200" size={20} />
                    </div>
                </div>

                <div className={`w-full p-2 flex justify-between items-center gap-2 rounded-lg border border-b-0 bg-zinc-200/40 dark:bg-zinc-800/70 dark:border-zinc-200/5 duration-200`}>
                    <div className="flex items-center gap-2 w-full">
                        <KeyRound className="p-[5px] text-zinc-700 dark:text-zinc-50/80 rounded-md" size={32} />
                        <p className="text-md font-semibold text-zinc-700 dark:text-zinc-50/80">Senha</p>
                    </div>

                    <div className="w-full flex justify-end items-center gap-2 pr-1 text-zinc-600 dark:text-zinc-400">
                        <p className="text-right font-semibold">**********</p>
                        <Pencil className="cursor-pointer text-zinc-700 hover:text-zinc-800 dark:text-zinc-50/80 dark:hover:text-zinc-50 duration-200" size={20} />
                    </div>
                </div>

                <div className="flex justify-between gap-2">
                    <button className="w-full p-2 flex items-center gap-1.5 rounded-lg border bg-red-500/15 dark:bg-red-500/20 hover:bg-red-500/20 dark:hover:bg-red-500/30 border-red-500/20 text-red-500 cursor-pointer duration-200">
                        <Trash2 className="p-[5px] rounded-md" size={32} />
                        <p className="text-md font-semibold">Excluir conta</p>
                    </button>

                    {
                        isEdited ? <button className="w-full p-2 flex items-center gap-2 rounded-lg border bg-zinc-200/70 hover:bg-zinc-200 text-zinc-700 cursor-pointer duration-200">
                            <p className="text-md font-semibold">Salvar alterações</p>
                        </button> : ""
                    }
                </div>
            </div>
        </div>
    );
}
