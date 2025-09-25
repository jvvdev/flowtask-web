'use client'

import { authService } from "@/api/auth-service";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/alert-dialog";
import { Inbox, KeyRound, Pencil, Trash2, User, UserMinus } from "lucide-react";
import { useState } from "react";

export function AccountSettings({ name, email }: { name: string, email: string }) {
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
                        <p className="text-right font-semibold">{name}</p>
                    </div>
                </div>

                <div className={`w-full p-2 flex justify-between items-center gap-2 rounded-lg border bg-zinc-200/40 dark:bg-zinc-800/70 dark:border-zinc-200/5 duration-200`}>
                    <div className="flex items-center gap-2 w-full">
                        <Inbox className="p-[5px] text-zinc-700 dark:text-zinc-50/80 rounded-md" size={32} />
                        <p className="text-md font-semibold text-zinc-700 dark:text-zinc-50/80">Email cadastrado</p>
                    </div>

                    <div className="w-full flex justify-end items-center gap-2 pr-1 text-zinc-600 dark:text-zinc-400">
                        <p className="text-right font-semibold">{email}</p>
                    </div>
                </div>

                <AlertDialog>
                    <AlertDialogTrigger className="w-full p-2 flex items-center gap-1.5 rounded-lg border bg-red-500/15 dark:bg-red-500/20 hover:bg-red-500/20 dark:hover:bg-red-500/30 border-red-500/20 text-red-500 cursor-pointer duration-200">
                        <UserMinus className="p-[5px] rounded-md" size={32} />
                        <p className="text-md font-semibold">Fazer logout da conta</p>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar</AlertDialogTitle>
                            <AlertDialogDescription>Você tem certeza de que deseja sair da sua conta?</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-red-500/30 border border-zinc-500/30 dark:hover:border-red-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200">Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                                className="font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-green-500/30 border border-zinc-500/30 dark:hover:border-green-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200"
                                onClick={() => authService.logout()}
                            >
                                Sair
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}
