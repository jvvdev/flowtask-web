import { relatoryService } from "@/api/dashboard/relatory-service";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/alert-dialog";
import { Input } from "@/components/input";
import { ALargeSmall, MessageCircle, Plus } from "lucide-react";
import { useForm } from "react-hook-form";

interface NoteForm {
    name: string;
    content: string;
};

export function CreateForm({ bigButton }: { bigButton?: boolean }) {
    const { register, handleSubmit } = useForm<NoteForm>();

    function handleCreateNote(data: NoteForm) {
        relatoryService.createRelatory(data);
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger
                className={`${bigButton ? "absolute bottom-0 w-full px-2 py-4" : "py-2 px-4 mt-4"} flex items-center justify-center gap-2 rounded-md text-sm font-semibold bg-zinc-500/15 dark:bg-zinc-200 hover:bg-zinc-500/20 dark:hover:bg-zinc-300/90 border border-zinc-500/20 text-zinc-600 dark:text-zinc-900/90 duration-200 cursor-pointer`}
            >
                <Plus className="size-5" />
                <span className="">Adicionar documento</span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Adicionar documento</AlertDialogTitle>
                    <AlertDialogDescription>
                        Aqui você pode adicionar novos documentos para gerenciar.
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
                        <AlertDialogCancel
                            className="font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-red-500/30 border border-zinc-500/30 dark:hover:border-red-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200"
                        >
                            Cancelar
                        </AlertDialogCancel>
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