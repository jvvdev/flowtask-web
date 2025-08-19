'use client'

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { ALargeSmall, ArchiveRestore, CalendarPlus, ChartPie, Check, ClipboardCheck, ClipboardClock, ClipboardList, Ellipsis, Loader2, LoaderCircle, MailSearch, MessageCircleMore, Trash2, TriangleAlert } from "lucide-react";
import { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/popover";
import { Button } from "../button";
import { RiFilter3Line, RiSearch2Line } from "@remixicon/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/table";
import { CircularProgress } from "../circularProgress";
import { Input } from "../input";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../alert-dialog";
import { useRouter } from "next/navigation";
import { DndContext, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import {
    SortableContext,
    useSortable,
    arrayMove,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { set } from "date-fns";

const ITEMS_PER_PAGE = 10;

export function KanbanProject() {
    const [filter, setFilter] = useState("kanban");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<typeof kanbanList>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTask, setSelectedTask] = useState(0);
    const [kanbanList, setKanbanList] = useState([
        {
            id: 1,
            title: "Planejar Sprint",
            priority: "high",
            description: "Definir objetivos e tarefas para a próxima sprint.",
            status: "to do",
            comments: [],
            createdAt: new Date()
        },
        {
            id: 2,
            title: "Reunião com cliente",
            priority: "medium",
            description: "Agendar e realizar reunião de alinhamento de requisitos.",
            status: "in progress",
            comments: [],
            createdAt: new Date()
        },
        {
            id: 3,
            title: "Deploy em produção",
            priority: "low",
            description: "Publicar nova versão do sistema no ambiente de produção.",
            status: "done",
            comments: [],
            createdAt: new Date()
        },
        {
            id: 4,
            title: "Revisar Pull Requests",
            priority: "medium",
            description: "Analisar e aprovar PRs pendentes no repositório.",
            status: "to do",
            comments: [],
            createdAt: new Date()
        },
        {
            id: 5,
            title: "Implementar autenticação",
            priority: "high",
            description: "Adicionar login e registro de usuários usando OAuth.",
            status: "in progress",
            comments: [],
            createdAt: new Date()
        },
        {
            id: 6,
            title: "Documentar API",
            priority: "medium",
            description: "Atualizar documentação da API REST no Swagger.",
            status: "done",
            comments: [],
            createdAt: new Date()
        },
        {
            id: 7,
            title: "Testes automatizados",
            priority: "low",
            description: "Criar testes unitários para os principais módulos.",
            status: "to do",
            comments: [],
            createdAt: new Date()
        },
        {
            id: 8,
            title: "Ajustar layout mobile",
            priority: "low",
            description: "Corrigir responsividade das telas no mobile.",
            status: "in progress",
            comments: [],
            createdAt: new Date()
        },
        {
            id: 9,
            title: "Corrigir bug de login",
            priority: "high",
            description: "Resolver erro que impede usuários de acessar o sistema.",
            status: "done",
            comments: [],
            createdAt: new Date()
        },
        {
            id: 10,
            title: "Configurar CI/CD",
            priority: "high",
            description: "Automatizar deploy com pipeline no GitHub Actions.",
            status: "to do",
            comments: [],
            createdAt: new Date()
        },
        {
            id: 11,
            title: "Atualizar dependências",
            priority: "medium",
            description: "Verificar e atualizar pacotes npm desatualizados.",
            status: "in progress",
            comments: [],
            createdAt: new Date()
        },
        {
            id: 13,
            title: "Configurar CI/CD",
            priority: "high",
            description: "Automatizar deploy com pipeline no GitHub Actions.",
            status: "to do",
            comments: [],
            createdAt: new Date()
        },

    ])

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor)
    );

    const totalPages = Math.ceil(kanbanList.length / ITEMS_PER_PAGE);
    const paginatedData = kanbanList.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const router = useRouter();

    const handleOpenTask = (taskID: number) => {
        if (taskID) {
            router.push(`/dashboard/project/1/${taskID}`);
        }
    };

    const dragEndList = (event: DragEndEvent) => {
        if (!event.over) return;
        if (event.active.id == event.over.id) return;

        const lastID = event.active.id;
        const newID = event.over.id;

        setKanbanList((items) => {
            const lastIndex = items.findIndex((i) => i.id === lastID);
            const newIndex = items.findIndex((i) => i.id === newID);
            return arrayMove(items, lastIndex, newIndex);
        });

        // fazer uma logica que, pega o id do active e do over, e quando mover troca do id do active pelo do over e o do over pelo active
    };

    return (
        <div className="relative">
            <div className={`flex w-full items-center ${filter == "list" ? "justify-between" : "justify-end"}`}>
                {
                    filter == "list" ?
                        <div className="relative">
                            <Input
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Pesquisar pelo nome"
                                className="peer min-w-40 ps-9 bg-background bg-gradient-to-br from-accent/60 to-accent"
                            />
                            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/60 peer-disabled:opacity-50">
                                <RiSearch2Line size={20} aria-hidden="true" />
                            </div>
                        </div> : ""
                }
                <div className="flex gap-2 items-center">
                    {
                        selectedTask > 0 && (
                            <div className="flex gap-2">
                                <AlertDialog>
                                    <AlertDialogTrigger
                                        className="px-2 flex items-center justify-center gap-2 rounded-md text-sm font-semibold bg-green-500/15 dark:bg-green-500/20 hover:bg-green-500/20 dark:hover:bg-green-500/30 border border-green-500/20 text-green-500 cursor-pointer"
                                    >
                                        <ArchiveRestore className="size-5" />
                                        <span className="hidden sm:block">Abrir tarefa</span>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Confirmar</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Você tem certeza de que deseja abrir este projeto?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleOpenTask(selectedTask)}>Abrir tarefa</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                                <Button className="bg-red-500/15 dark:bg-red-500/20 hover:bg-red-500/20 dark:hover:bg-red-500/30 border border-red-500/20 text-red-500 cursor-pointer"
                                    onClick={() => {
                                        // Handle delete project
                                    }}
                                >
                                    <Trash2 className="size-5" />
                                    <span className="hidden sm:block">Deletar</span>
                                </Button>
                            </div>
                        )
                    }
                    <Popover >
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="">
                                <RiFilter3Line
                                    className="size-5 -ms-1.5 text-muted-foreground/60"
                                    size={20}
                                    aria-hidden="true"
                                />
                                <span className="hidden sm:block">Exibição  </span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto min-w-36 p-0" align="end">
                            <div className="space-y-1">
                                <div className="text-xs px-3 pt-3 font-medium uppercase text-muted-foreground/60">
                                    Exibição
                                </div>
                                <div className="space-y-1 px-1 pb-1">
                                    <button className={`px-2 py-1 bg-zinc-200/0 w-full text-left ${filter == "kanban" ? "bg-zinc-400/5" : "hover:bg-zinc-200/5 cursor-pointer"} rounded-md duration-200`} onClick={() => setFilter("kanban")}>Kanban</button>
                                    <button className={`px-2 py-1 bg-zinc-200/0 w-full text-left ${filter == "list" ? "bg-zinc-400/5" : "hover:bg-zinc-200/5 cursor-pointer"} rounded-md duration-200`} onClick={() => setFilter("list")}>Lista</button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            {
                loading ?
                    <div className="flex justify-center mt-50">
                        <Loader2 className="animate-spin" />
                    </div>
                    : filter == "kanban" ?
                        <div className="flex flex-col md:flex-row items-start gap-4 mt-4">
                            <div className="w-full bg-zinc-200/40 dark:bg-zinc-800/30 dark:border dark:border-zinc-700/20 rounded-xl p-4 space-y-4">
                                <div className="flex flex-col items-center gap-2 text-lg font-semibold">
                                    <div className="flex items-center w-full gap-1.5">
                                        <div className="h-3 w-3 bg-purple-700/80 dark:bg-purple-800 rounded-full"></div>
                                        <h1>A fazer</h1>
                                        <div className="text-sm h-5 w-5 flex items-center justify-center bg-zinc-400/40 dark:bg-zinc-700/70 text-zinc-800 dark:text-zinc-200/70 rounded-full">{kanbanList.filter(task => task.status === "to do").length}</div>
                                    </div>
                                    <div className="w-full h-1 bg-purple-700/80 dark:bg-purple-800 rounded-full"></div>
                                </div>

                                <div className="flex flex-col items-center gap-3">
                                    {
                                        kanbanList.filter(task => task.status === "to do").map(task => (
                                            <div key={task.id} className="w-full p-2 bg-zinc-50 border dark:bg-zinc-900/60 dark:border-zinc-700/40 rounded-lg">
                                                <div className="flex justify-between">
                                                    <div className="flex flex-col items-start w-full">
                                                        <span className={`text-sm font-medium p-1 ${task.priority === "high" ? "text-red-500/70 border border-red-400/10 dark:border-red-500/15 bg-red-200/40 dark:bg-red-600/20 rounded-sm" : task.priority === "medium" ? "text-yellow-500/70 border border-yellow-400/10 dark:border-yellow-500/10 bg-yellow-200/20 dark:bg-yellow-600/20 rounded-sm" : "text-green-500/70 border border-green-400/10 dark:border-green-500/10 bg-green-200/40 dark:bg-green-600/20 rounded-sm"}`}>
                                                            {
                                                                task.priority == "high" ? "Alta" : task.priority == "medium" ? "Média" : "Baixa"
                                                            }
                                                        </span>
                                                        <h1 className="text-xl font-semibold mt-1">{task.title}</h1>
                                                    </div>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger>
                                                            <Ellipsis className="p-1 rounded-md hover:bg-zinc-200/50 dark:hover:bg-zinc-800 duration-200 cursor-pointer" size={30} />                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent className="bg-zinc-200 dark:bg-zinc-800 border rounded-lg p-1">
                                                            <DropdownMenuLabel className="flex items-center justify-center gap-2">
                                                                <button className="hover:bg-zinc-900/40 py-1 px-2 font-semibold dark:font-normal duration-200 rounded-md" onClick={() => setSelectedTask(task.id)}>Selecionar tarefa</button>
                                                            </DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <div className="flex flex-col space-y-1">

                                                            </div>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{task.description}</p>
                                                <div className="flex items-center justify-between mt-1.5">
                                                    <div className="text-muted-foreground">
                                                        Criador: <span className="font-semibold text-zinc-950/90 dark:text-zinc-200/90">Jordana Lima</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-muted-foreground">
                                                        <MessageCircleMore size={18} />
                                                        <p className="text-sm"><span className="font-semibold text-zinc-950/90 dark:text-zinc-200/90">{task.comments.length}</span> comentários</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))

                                    }
                                </div>
                            </div>

                            <div className="w-full bg-zinc-200/40 dark:bg-zinc-800/30 dark:border dark:border-zinc-700/20 rounded-xl p-4 space-y-4">
                                <div className="flex flex-col items-center gap-2 text-lg font-semibold">
                                    <div className="flex items-center w-full gap-1.5">
                                        <div className="h-3 w-3 bg-yellow-400/80 rounded-full"></div>
                                        <h1>Em progresso</h1>
                                        <div className="text-sm h-5 w-5 flex items-center justify-center bg-zinc-400/40 dark:bg-zinc-700/70 text-zinc-800 dark:text-zinc-200/70 rounded-full">{kanbanList.filter(task => task.status === "in progress").length}</div>
                                    </div>
                                    <div className="w-full h-1 bg-yellow-400/80 rounded-full"></div>
                                </div>

                                <div className="flex flex-col items-center gap-3">
                                    {
                                        kanbanList.filter(task => task.status === "in progress").map(task => (
                                            <div key={task.id} className="w-full p-2 bg-zinc-50 border dark:bg-zinc-900/60 dark:border-zinc-700/40 rounded-lg">
                                                <div className="flex justify-between">
                                                    <div className="flex flex-col items-start w-full">
                                                        <span className={`text-sm font-medium p-1 ${task.priority === "high" ? "text-red-500/70 border border-red-400/10 dark:border-red-500/15 bg-red-200/40 dark:bg-red-600/20 rounded-sm" : task.priority === "medium" ? "text-yellow-500/70 border border-yellow-400/10 dark:border-yellow-500/10 bg-yellow-200/20 dark:bg-yellow-600/20 rounded-sm" : "text-green-500/70 border border-green-400/10 dark:border-green-500/10 bg-green-200/40 dark:bg-green-600/20 rounded-sm"}`}>
                                                            {
                                                                task.priority == "high" ? "Alta" : task.priority == "medium" ? "Média" : "Baixa"
                                                            }
                                                        </span>
                                                        <h1 className="text-xl font-semibold mt-1">{task.title}</h1>
                                                    </div>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger>
                                                            <Ellipsis className="p-1 rounded-md hover:bg-zinc-200/50 dark:hover:bg-zinc-800 duration-200 cursor-pointer" size={30} />                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent className="bg-zinc-200 dark:bg-zinc-800 border rounded-lg p-1">
                                                            <DropdownMenuLabel className="flex items-center justify-center gap-2">
                                                                <button className="hover:bg-zinc-900/40 py-1 px-2 font-semibold dark:font-normal duration-200 rounded-md" onClick={() => setSelectedTask(task.id)}>Selecionar tarefa</button>
                                                            </DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <div className="flex flex-col space-y-1">

                                                            </div>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{task.description}</p>
                                                <div className="flex items-center justify-between mt-1.5">
                                                    <div className="text-muted-foreground">
                                                        Criador: <span className="font-semibold text-zinc-950/90 dark:text-zinc-200/90">Jordana Lima</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-muted-foreground">
                                                        <MessageCircleMore size={18} />
                                                        <p className="text-sm"><span className="font-semibold text-zinc-950/90 dark:text-zinc-200/90">{task.comments.length}</span> comentários</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="w-full bg-zinc-200/40 dark:bg-zinc-800/30 dark:border dark:border-zinc-700/20 rounded-xl p-4 space-y-4">
                                <div className="flex flex-col items-center gap-2 text-lg font-semibold">
                                    <div className="flex items-center w-full gap-1.5">
                                        <div className="h-3 w-3 bg-green-600/80 rounded-full"></div>
                                        <h1>Concluído</h1>
                                        <div className="text-sm h-5 w-5 flex items-center justify-center bg-zinc-400/40 dark:bg-zinc-700/70 text-zinc-800 dark:text-zinc-200/70 rounded-full">{kanbanList.filter(task => task.status === "done").length}</div>
                                    </div>
                                    <div className="w-full h-1 bg-green-600/80 rounded-full"></div>
                                </div>

                                <div className="flex flex-col items-center gap-3">
                                    {
                                        kanbanList.filter(task => task.status === "done").map(task => (
                                            <div key={task.id} className="w-full p-2 bg-zinc-50 border dark:bg-zinc-900/60 dark:border-zinc-700/40 rounded-lg">
                                                <div className="flex justify-between">
                                                    <div className="flex flex-col items-start w-full">
                                                        <span className={`text-sm font-medium p-1 text-green-500/70 border border-green-400/10 dark:border-green-500/10 bg-green-200/40 dark:bg-green-600/20 rounded-sm`}>
                                                            Concluído
                                                        </span>
                                                        <h1 className="text-xl font-semibold mt-1">{task.title}</h1>
                                                    </div>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger>
                                                            <Ellipsis className="p-1 rounded-md hover:bg-zinc-200/50 dark:hover:bg-zinc-800 duration-200 cursor-pointer" size={30} />                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            <DropdownMenuLabel className="flex items-center justify-center gap-2">
                                                                <button>Abrir tarefa</button>
                                                            </DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <div className="flex flex-col space-y-1">

                                                            </div>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{task.description}</p>
                                                <div className="flex items-center justify-between mt-1.5">
                                                    <div className="text-muted-foreground">
                                                        Criador: <span className="font-semibold text-zinc-950/90 dark:text-zinc-200/90">Jordana Lima</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-muted-foreground">
                                                        <MessageCircleMore size={18} />
                                                        <p className="text-sm"><span className="font-semibold text-zinc-950/90 dark:text-zinc-200/90">{task.comments.length}</span> comentários</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div> :
                        filter == "list" ?
                            <div className="mt-4">
                                <DndContext
                                    onDragEnd={dragEndList}
                                    sensors={sensors}
                                >
                                    <SortableContext
                                        items={kanbanList.map(task => task.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        <div className="overflow-x-auto">
                                            <Table className="min-w-[1510px] table-fixed border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b">
                                                <TableHeader>
                                                    <TableRow className="hover:bg-transparent">
                                                        <TableHead className="relative h-9 w-55 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                                            <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><ALargeSmall size={18} /> Título</p>
                                                        </TableHead>
                                                        <TableHead className="relative h-9 w-100 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                                            <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><ClipboardList size={18} /> Descrição</p>
                                                        </TableHead>
                                                        <TableHead className="relative h-9 w-25 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                                            <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><TriangleAlert size={18} /> Prioridade</p>
                                                        </TableHead>
                                                        <TableHead className="relative h-9 w-40 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                                            <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><ChartPie size={18} /> Status</p>
                                                        </TableHead>
                                                        <TableHead className="relative h-9 w-35 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                                            <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><MessageCircleMore size={18} /> Comentários</p>
                                                        </TableHead>
                                                        <TableHead className="relative h-9 w-50 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                                            <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><CalendarPlus size={18} /> Criado em</p>
                                                        </TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {loading ? null : paginatedData.length > 0 ? (
                                                        paginatedData.map(item => (
                                                            <KanbanTaskRow
                                                                key={item.id}
                                                                item={item}
                                                                selectedTask={selectedTask}
                                                                setSelectedTask={setSelectedTask}
                                                            />
                                                        ))
                                                    ) : null}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </SortableContext>
                                </DndContext>

                                {
                                    loading ? <div className="w-full flex justify-center items-center mt-5">
                                        <p className="text-center text-zinc-500 font-semibold dark:text-zinc-400">Carregando...</p>
                                    </div> : kanbanList.length > 0 ?
                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
                                            <p
                                                className="flex-1 whitespace-nowrap text-sm text-muted-foreground"
                                                aria-live="polite"
                                            >
                                                Página{" "}
                                                <span className="text-foreground">{currentPage}</span> de{" "}
                                                <span className="text-foreground">{totalPages}</span>
                                            </p>
                                            <div className="flex gap-3">
                                                <Button
                                                    variant="outline"
                                                    disabled={currentPage === 1}
                                                    aria-label="Página anterior"
                                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                                    className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                                                >
                                                    Anterior
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    disabled={currentPage === totalPages}
                                                    aria-label="Próxima página"
                                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                                    className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                                                >
                                                    Próxima
                                                </Button>
                                            </div>
                                        </div> : <div className="w-full flex justify-center items-center mt-5">
                                            <p className="text-center font-semibold">Nenhum projeto encontrado</p>
                                        </div>
                                }
                            </div> :
                            ""
            }
        </div>
    );
}

type KanbanTask = {
    id: number;
    title: string;
    priority: string;
    description: string;
    status: string;
    comments: Array<{ id: number; content: string; createdAt: Date }>;
    createdAt: Date;
};

interface KanbanTaskRowProps {
    item: KanbanTask;
    selectedTask: number;
    setSelectedTask: (id: number) => void;
}

function KanbanTaskRow({ item, selectedTask, setSelectedTask }: KanbanTaskRowProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <TableRow
            key={item.id}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="border-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg h-px hover:bg-accent/50"
        >
            <TableCell className="flex gap-2 py-[17px]">
                <button
                    className={`z-20 border rounded-sm ${selectedTask === item.id ? "bg-green-400 dark:bg-green-600 p-[3px]" : "w-5.5"}`}
                    onPointerDown={e => e.stopPropagation()}
                    onClick={() => {
                        if (selectedTask === item.id) setSelectedTask(0);
                        else setSelectedTask(item.id);
                    }}
                >
                    <Check className={`${selectedTask === item.id ? "block" : "hidden"}`} size={12} />
                </button>
                <p className="w-full overflow-hidden whitespace-nowrap text-ellipsis font-semibold">{item.title}</p>
            </TableCell>
            <TableCell>
                <p className="overflow-hidden whitespace-nowrap text-ellipsis">{item.description}</p>
            </TableCell>
            <TableCell>
                {item.priority === "high" ? (
                    <div className="flex items-center gap-2 relative">
                        <div className="relative flex h-2 w-2">
                            <div className="absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75 animate-ping"></div>
                            <div className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></div>
                        </div>
                        <span className="text-red-500 overflow-hidden whitespace-nowrap text-ellipsis">Alta</span>
                    </div>
                ) : item.priority === "medium" ? (
                    <div className="flex items-center gap-2 relative">
                        <div className="relative flex h-2 w-2">
                            <div className="absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75 animate-ping"></div>
                            <div className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></div>
                        </div>
                        <span className="text-yellow-500 overflow-hidden whitespace-nowrap text-ellipsis">Média</span>
                    </div>
                ) : item.priority === "low" ? (
                    <div className="flex items-center gap-2 relative">
                        <div className="relative flex h-2 w-2">
                            <div className="absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75 animate-ping"></div>
                            <div className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></div>
                        </div>
                        <span className="text-green-500 overflow-hidden whitespace-nowrap text-ellipsis">Baixa</span>
                    </div>
                ) : (
                    <span>{item.priority}</span> // Caso não seja nenhum dos 3, só mostra o texto
                )}
            </TableCell>
            <TableCell>
                {item.status === "to do" ? (
                    <div className="flex items-center gap-2 relative">
                        <div className="relative flex h-2 w-2">
                            <div className="absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75 animate-ping"></div>
                            <div className="relative inline-flex rounded-full h-2 w-2 bg-purple-400"></div>
                        </div>
                        <span className="text-purple-400 overflow-hidden whitespace-nowrap text-ellipsis">A fazer</span>
                    </div>
                ) : item.status === "in progress" ? (
                    <div className="flex items-center gap-2 relative">
                        <div className="relative flex h-2 w-2">
                            <div className="absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75 animate-ping"></div>
                            <div className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></div>
                        </div>
                        <span className="text-yellow-400 overflow-hidden whitespace-nowrap text-ellipsis">Em progresso</span>
                    </div>
                ) : item.status === "done" ? (
                    <div className="flex items-center gap-2 relative">
                        <div className="relative flex h-2 w-2">
                            <div className="absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75 animate-ping"></div>
                            <div className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></div>
                        </div>
                        <span className="text-green-500 overflow-hidden whitespace-nowrap text-ellipsis">Concluído</span>
                    </div>
                ) : (
                    <span className="overflow-hidden whitespace-nowrap text-ellipsis">{item.status}</span>
                )}
            </TableCell>
            <TableCell>
                <p>{item.comments.length == 0 ? "Sem comentários" : item.comments + " Comentários"}</p>
            </TableCell>
            <TableCell>
                <p className="overflow-hidden whitespace-nowrap text-ellipsis">{item.createdAt.toLocaleString()}</p>
            </TableCell>
        </TableRow>
    );
}
