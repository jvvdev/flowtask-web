import { relatoryService } from "@/api/dashboard/relatory-service";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/alert-dialog";
import { Input } from "@/components/input";
import { ALargeSmall, MessageCircle, Plus } from "lucide-react";
import { useForm } from "react-hook-form";

interface NoteForm {
    name: string;
    content: string;
};

export function CreateForm() {
    const { register, handleSubmit } = useForm<NoteForm>();

    function handleCreateNote(data: NoteForm) {
        relatoryService.createRelatory(data);
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger
                className="absolute bottom-0 w-full px-2 py-4 flex items-center justify-center gap-2 rounded-md text-sm font-semibold bg-zinc-500/15 dark:bg-zinc-200 hover:bg-zinc-500/20 dark:hover:bg-zinc-300/90 border border-zinc-500/20 text-zinc-600 dark:text-zinc-900/90 duration-200 cursor-pointer"
            >
                <Plus className="size-5" />
                <span className="">Adicionar documento</span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Adicionar nota</AlertDialogTitle>
                    <AlertDialogDescription>
                        Aqui você pode adicionar novas notas para gerenciar.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <form onSubmit={handleSubmit(handleCreateNote)}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="flex text-sm items-center gap-2 dark:text-zinc-200/80">Nome</p>
                            <Input
                                placeholder="Digite aqui"
                                className="mb-2"
                                {...register("name")}
                            />
                        </div>
                        <div className="space-y-2">
                            <p className="flex text-sm items-center gap-2 dark:text-zinc-200/80">Conteúdo</p>
                            <Input
                                placeholder="Digite aqui"
                                className="mb-2"
                                {...register("content")}
                            />
                        </div>
                    </div>

                    <AlertDialogFooter className="mt-6">
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            type="submit"
                            className="font-semibold bg-green-500/15 dark:bg-green-500/20 hover:bg-green-500/20 dark:hover:bg-green-500/30 border border-green-500/20 text-green-500 cursor-pointer"
                        >
                            Confirmar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}