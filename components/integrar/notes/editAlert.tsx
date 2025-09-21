import { relatoryService } from "@/api/dashboard/relatory-service";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/alert-dialog";
import { Input } from "@/components/input";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { ALargeSmall, MessageCircle, Pencil, Plus } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditAlertProps {
    data: {
        title: string;
        // outros campos se necessário
    };
}

interface FormData {
    title: string;
}

export function EditAlert(data?: EditAlertProps) {
    const { register, handleSubmit } = useForm<FormData>();

    function onSubmit(formData: FormData) {
        relatoryService.updateRelatoryTitle(data?.data, formData.title);
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger
                className="px-2 py-1.5 flex items-center justify-center gap-2 rounded-md rounded-b-none text-sm font-semibold bg-yellow-500/15 dark:bg-yellow-500/20 hover:bg-yellow-500/20 dark:hover:bg-yellow-500/30 border border-yellow-500/20 text-yellow-500 cursor-pointer duration-200"
            >
                <Pencil className="size-5 text-yellow-500" />
                <p className="text-yellow-500">Editar informações</p>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Editar informações</AlertDialogTitle>
                    <AlertDialogDescription>
                        Aqui você pode editar as informações do projeto.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="flex items-center gap-2 dark:text-zinc-200/80"><ALargeSmall size={20} />Título</p>
                            <Input
                                placeholder="Digite aqui"
                                className="mb-2"
                                defaultValue={data?.data?.title || ''}
                                {...register("title")}
                            />
                        </div>
                    </div>

                    <AlertDialogFooter className="mt-6">
                        <AlertDialogCancel className="font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-red-500/30 border border-zinc-500/30 dark:hover:border-red-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200">Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            type="submit"
                            className="font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-green-500/30 border border-zinc-500/30 dark:hover:border-green-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200"
                        >
                            Confirmar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}