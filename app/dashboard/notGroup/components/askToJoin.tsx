'use client'
import { teamService } from "@/api/dashboard/team-service";
import { AlertDialogHeader, AlertDialogFooter, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@/components/alert-dialog";
import { Input } from "@/components/input";
import { RiAddLine } from "@remixicon/react";
import { ALargeSmall, IdCard, Mail, MessageCircleMore, UserRoundPlus } from "lucide-react";
import { useForm } from "react-hook-form";

interface JoinForm {
    id_group: string;
    email: string;
}

export function AskToJoinGroup() {
const {register, handleSubmit} = useForm<JoinForm>();

const onSubmit = (data: JoinForm) => {
        teamService.requestJoin(data);
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger
                className="w-full md:w-full 2xl:w-[30%] py-[9px] md:py-2 px-4 flex items-center justify-center gap-2 rounded-md text-sm font-semibold border bg-zinc-200/70 hover:bg-zinc-200 dark:bg-zinc-800/30 dark:hover:bg-zinc-800/70 duration-200 cursor-pointer"
            >
                <UserRoundPlus className="opacity-60" size={16} aria-hidden="true" />
                <div className="font-medium flex sm:hidden md:flex">Pedir para entrar</div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Pedir para entrar</AlertDialogTitle>
                    <AlertDialogDescription>
                        Aqui você pode mandar uma solicitação para entrar em um grupo.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="flex items-center gap-2 dark:text-zinc-200/80"><IdCard size={20} />ID do grupo</p>
                            <Input
                                placeholder="Digite aqui"
                                className="mb-2"
                                {...register("id_group", { required: true })}
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="flex items-center gap-2 dark:text-zinc-200/80"><Mail size={20} />Email</p>
                            <Input
                                placeholder="Digite aqui"
                                className="mb-2"
                                {...register("email", { required: true })}
                            />
                        </div>
                    </div>

                    <AlertDialogFooter className="mt-6">
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            type="submit"
                            className="font-semibold bg-green-500/15 dark:bg-green-500/20 hover:bg-green-500/20 dark:hover:bg-green-500/30 border border-green-500/20 text-green-500 cursor-pointer"
                        >
                            Criar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}