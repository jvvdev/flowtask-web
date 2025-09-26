import { authService } from "@/api/auth-service";
import { commentsService } from "@/api/dashboard/comments-service";
import { routes } from "@/api/routes";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/alert-dialog";
import { Button } from "@/components/button";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import axios from "axios";
import { format, formatDate } from "date-fns";
import { ta } from "date-fns/locale";
import { ArchiveRestore, BookAlert, Check, ChevronDown, ChevronUp, SendHorizonal, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CommentViewProps {
    id_kanban?: string;
    id_comment: string;
    comment: string;
    commentBy: string;
    createdAt: string;
}

interface userDataProps {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

export function CommentView({ taskID, taskData }: { taskID: string; taskData: any }) {
    const [data, setData] = useState<CommentViewProps[]>([]);
    const [userData, setUserData] = useState<userDataProps | null>(null);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        async function getData() {
            const sessionId = await authService.getToken()
            let userData = await authService.getUserData()
            userData = JSON.parse(userData as string)
            setUserData(userData)

            await axios.get(routes.getCommentsByTask + taskID + "/comments", {
                headers: {
                    authToken: sessionId
                }
            }).then(res => {
                setData(res.data.data)
            }).catch(err => {
                console.error(err)
                console.log(taskData ? taskData : "não tem")
            });
        }

        getData()
    }, [])

    function formatRelativeTime(date: Date) {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);

        if (diffSec < 10) return "agora";
        if (diffSec < 60) return `${diffSec} segundos atrás`;
        if (diffMin < 60) return `${diffMin} ${diffMin == 1 ? "minuto" : "minutos"} atrás`;
        if (diffHour < 24) return `${diffHour} ${diffHour == 1 ? "hora" : "horas"} atrás`;
        if (diffDay === 1) return "ontem";
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString().slice(0, 5)}`;
    }

    async function onSubmit(formData: any) {
        if (formData.content === "") {
            return toast.error("O comentário não pode estar vazio")
        }

        if (!userData) {
            toast("Você precisa estar logado para comentar", {
                description: "Atualize a página e tente novamente.",
            });
            return
        }

        try {
            const result = await commentsService.createComment(formData, taskID)

            toast(`O comentário foi adicionado com sucesso`, {
                description: format(new Date(), "d 'de' MMM, yyyy"),
            });

            const commentId = crypto.randomUUID();

            setData([...data, {
                id_comment: commentId,
                comment: formData.content,
                commentBy: userData.email,
                avatar: userData.avatar,
                createdAt: new Date().toISOString(),
            }]);

            reset()
        } catch (err) {

            toast("Erro ao adicionar o comentário", {
                description: "Tente novamente mais tarde.",
            });

        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger
                className="px-2 flex items-center justify-center gap-2 rounded-md text-sm group font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-green-500/30 border border-zinc-500/30 dark:hover:border-green-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200"
            >
                <ArchiveRestore className="size-5 text-green-500" />
                <span className="hidden sm:block">Abrir tarefa</span>
            </AlertDialogTrigger>
            <AlertDialogContent className="p-4 gap-2 sm:max-w-[80%] 2xl:max-w-[50%]">
                <AlertDialogHeader className="hidden">asd</AlertDialogHeader>
                <div className="flex justify-between items-center border-b pb-3">
                    <div className="flex gap-2">
                        <Button variant="outline" className="w-8 h-8 cursor-pointer">
                            <ChevronUp />
                        </Button>
                        <Button variant="outline" className="w-8 h-8 cursor-pointer">
                            <ChevronDown />
                        </Button>
                    </div>
                    <AlertDialogCancel className="w-8 h-8"><X /></AlertDialogCancel>
                </div>

                <div>
                    <div className="space-y-1">
                        <AlertDialogTitle className="text-xl">{taskData?.title}</AlertDialogTitle>
                        <p className="text-muted-foreground">{taskData?.description}</p>
                    </div>

                    <div className="mt-4 space-y-2 text-muted-foreground dark:text-muted-foreground/80 font-semibold">
                        <div className="flex items-center">
                            <p className="w-40 font-normal">Criado por</p>
                            <span className="font-semibold">{taskData?.createdBy}</span>
                        </div>
                        <div className="flex items-center">
                            <p className="w-40 font-normal">Status</p>
                            {
                                taskData?.status == "Concluída" ?
                                    <span className={`flex items-center gap-0.5 text-sm font-medium p-1 text-green-500/70 border border-green-400/10 dark:border-green-500/10 bg-green-200/40 dark:bg-green-600/20 rounded-sm`}>
                                        <Check size={16} /> Concluída
                                    </span> : taskData?.status == "Pendente" ?
                                        <span className={`flex items-center gap-0.5 text-sm font-medium p-1 text-purple-500/70 border border-purple-400/10 dark:border-purple-500/10 bg-purple-200/40 dark:bg-purple-600/20 rounded-sm`}>
                                            <Check size={16} /> A fazer
                                        </span> : taskData?.status == "Em progresso" ?
                                            <span className={`flex items-center gap-0.5 text-sm font-medium p-1 text-yellow-500/70 border border-yellow-400/10 dark:border-yellow-500/10 bg-yellow-200/40 dark:bg-yellow-600/20 rounded-sm`}>
                                                <Check size={16} /> Em progresso
                                            </span> : null
                            }
                        </div>
                        <div className="flex items-center">
                            <p className="w-40 font-normal">Prioridade</p>
                            {
                                taskData?.priority == "2" ?
                                    <span className={`flex items-center gap-1 text-sm font-medium p-1 text-red-500/70 border border-red-400/10 dark:border-red-500/10 bg-red-200/40 dark:bg-red-600/20 rounded-sm`}>
                                        <BookAlert size={16} /> Alta
                                    </span> : taskData?.priority == "1" ?
                                        <span className={`flex items-center gap-1 text-sm font-medium p-1 text-yellow-500/70 border border-yellow-400/10 dark:border-yellow-500/10 bg-yellow-200/40 dark:bg-yellow-600/20 rounded-sm`}>
                                            <BookAlert size={16} /> Média
                                        </span> : taskData?.priority == "0" ?
                                            <span className={`flex items-center gap-1 text-sm font-medium p-1 text-green-500/70 border border-green-400/10 dark:border-green-500/10 bg-green-200/40 dark:bg-green-600/20 rounded-sm`}>
                                                <BookAlert size={16} /> Baixa
                                            </span> : null
                            }
                        </div>
                        <div className="flex items-center border-b pb-3">
                            <p className="w-40 font-normal">Data de criação</p>
                            <span className="font-semibold">{formatDate(new Date(taskData?.createdAt), "dd/MM/yyyy 'às' HH:mm")}</span>
                        </div>
                    </div>

                    <div className="mt-3">
                        <h1 className="text-lg font-semibold">Comentários</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-2 flex gap-2 items-center">
                            <img src={userData?.avatar} alt="" className="h-10 w-10 rounded-full" />
                            <input type="text" placeholder="Escreva um comentário..." className="w-full h-9 px-2 border rounded-md placeholder:text-sm outline-none" {...register("content")} />
                            <Button type="submit" variant="default" className="h-9 w-10 cursor-pointer">
                                <SendHorizonal />
                            </Button>
                        </form>

                        <div className="space-y-2 mt-2">
                            {
                                data.map((item) => (
                                    <ContextMenu key={item.id_comment}>
                                        <ContextMenuTrigger className="w-full" key={item.id_comment}>
                                            <div
                                                className="p-3 mt-2 rounded-md bg-zinc-200/20 dark:bg-muted-foreground/10"
                                            >
                                                <p>{item.comment}</p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1.5 mt-2">
                                                        <img src={item.avatar} alt="" className="h-7 w-7 rounded-full" />
                                                        <span className="font-semibold">{item.commentBy}</span>
                                                    </div>
                                                    <p className="mt-1 text-muted-foreground text-sm">
                                                        {formatRelativeTime(new Date(item.createdAt))}
                                                    </p>
                                                </div>
                                            </div>
                                        </ContextMenuTrigger>
                                        <ContextMenuContent className="p-0 border-0">
                                            <ContextMenuItem
                                                onClick={() => commentsService.deleteComment(item.id_comment)}
                                                className="px-2 flex items-center justify-center gap-2 rounded-md text-sm font-semibold bg-red-500/15 dark:bg-red-500/20 hover:bg-red-500/20 dark:hover:bg-red-500/30 border border-red-500/20 text-red-500 cursor-pointer duration-200"
                                            >
                                                <Trash2 className="size-5 text-red-500" />
                                                <p className="text-red-500">Deletar</p>
                                            </ContextMenuItem>
                                        </ContextMenuContent>
                                    </ContextMenu>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}