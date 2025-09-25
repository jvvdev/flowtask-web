'use client'

import { useForm } from "react-hook-form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../alert-dialog";
import { Input } from "../input";
import { ALargeSmall, MessageCircleMore, Pencil } from "lucide-react";
import { teamService } from "@/api/dashboard/team-service";

type ModifyTeamProps = {
    id: string;
};

type FormData = {
    modify_name: string;
    modify_description: string;
};

export function ModifyTeam({ id }: ModifyTeamProps) {
    const { register, handleSubmit } = useForm<FormData>();

    const onModifyTeam = (data: FormData) => {
        teamService.updateTeam(id, data);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger
                className="w-full py-1 px-1.5 flex items-center justify-center gap-2 rounded-md text-sm font-semibold hover:bg-yellow-600/15 cursor-pointer"
            >
                <Pencil className="opacity-60" size={16} aria-hidden="true" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Modificar equipe</AlertDialogTitle>
                    <AlertDialogDescription>
                        Aqui você pode modificar as informações da equipe selecionada.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <form onSubmit={handleSubmit(onModifyTeam)}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="flex items-center gap-2 dark:text-zinc-200/80"><ALargeSmall size={20} />Nome da equipe</p>
                            <Input
                                placeholder="Digite aqui"
                                className="mb-2"
                                {...register("modify_name", { required: true })}
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="flex items-center gap-2 dark:text-zinc-200/80"><MessageCircleMore size={20} />Descrição da equipe</p>
                            <Input
                                placeholder="Digite aqui"
                                className="mb-2"
                                {...register("modify_description", { required: true })}
                            />
                        </div>
                    </div>

                    <AlertDialogFooter className="mt-6">
                        <AlertDialogCancel className="font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-red-500/30 border border-zinc-500/30 dark:hover:border-red-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200">Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            type="submit"
                            className="font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-green-500/30 border border-zinc-500/30 dark:hover:border-green-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200"
                        >
                            Modificar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}