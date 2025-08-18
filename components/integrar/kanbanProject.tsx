'use client'

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { ALargeSmall, Check, ClipboardCheck, ClipboardClock, Ellipsis, Loader2, LoaderCircle, MailSearch, MessageCircleMore } from "lucide-react";
import { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/popover";
import { Button } from "../button";
import { RiFilter3Line } from "@remixicon/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { CircularProgress } from "../circularProgress";

const kanbanList = [
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

]

const ITEMS_PER_PAGE = 10;

export function KanbanProject() {
    const [filter, setFilter] = useState("kanban");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<typeof kanbanList>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredData = data.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <div className="relative">
            <Popover >
                <PopoverTrigger asChild>
                    <Button variant="outline" className="absolute right-0">
                        <RiFilter3Line
                            className="size-5 -ms-1.5 text-muted-foreground/60"
                            size={20}
                            aria-hidden="true"
                        />
                        <span className="hidden sm:block">Filtrar</span>
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
            {
                loading ?
                    <div className="flex justify-center mt-50">
                        <Loader2 className="animate-spin" />
                    </div>
                    : filter == "kanban" ?
                        <div className="flex flex-col md:flex-row items-start gap-4 mt-13">
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
                                                        <DropdownMenuContent>
                                                            <DropdownMenuLabel className="flex items-center justify-center gap-2">

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
                                                        <DropdownMenuContent>
                                                            <DropdownMenuLabel className="flex items-center justify-center gap-2">

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
                            <div>
                                <div className="overflow-x-auto">
                                    <Table className="min-w-[1565px] table-fixed border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b">
                                        <TableHeader>
                                            <TableRow className="hover:bg-transparent">
                                                <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                                    <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><ALargeSmall size={18} /> Título</p>
                                                </TableHead>
                                                <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                                    <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><MailSearch size={18} /> Descrição</p>
                                                </TableHead>
                                                <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                                    <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><ClipboardClock size={18} /> Prioridade</p>
                                                </TableHead>
                                                <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                                    <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><ClipboardCheck size={18} /> Status</p>
                                                </TableHead>
                                                <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                                    <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><LoaderCircle size={18} /> Criado em</p>
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {loading ? null : paginatedData.length > 0 ? (
                                                paginatedData.map(item => {
                                                    // completed task calc
                                                    const completed = item.TotalTasks - item.PendingTasks;
                                                    const taskProgress = item.TotalTasks > 0 ? Math.round((completed / item.TotalTasks) * 100) : 0;
                                                    return (
                                                        <TableRow
                                                            key={item.id}
                                                            className="border-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg h-px hover:bg-accent/50"
                                                        >
                                                            <TableCell className="flex gap-2">
                                                                <button
                                                                    className={`border rounded-sm ${selectedMember === item.id ? "bg-green-400 dark:bg-green-600 p-[3px]" : "w-5.5"}`}
                                                                    onClick={() => {
                                                                        if (selectedMember === item.id) setSelectedMember(0);
                                                                        else setSelectedMember(item.id);
                                                                    }}
                                                                >
                                                                    <Check className={`${selectedMember === item.id ? "block" : "hidden"}`} size={12} />
                                                                </button>
                                                                <p className="w-full overflow-hidden whitespace-nowrap text-ellipsis font-semibold">{item.Name}</p>
                                                            </TableCell>
                                                            <TableCell>
                                                                <p className="overflow-hidden whitespace-nowrap text-ellipsis">{item.Email}</p>
                                                            </TableCell>
                                                            <TableCell>
                                                                <p className="font-semibold">{item.PendingTasks}</p>
                                                            </TableCell>
                                                            <TableCell>
                                                                <p className="font-semibold">{completed}</p>
                                                            </TableCell>
                                                            <TableCell className="flex items-center gap-2">
                                                                {/* Porcentagem de tarefas concluídas */}
                                                                <CircularProgress progress={taskProgress} />
                                                                <span className="text-sm flex">{taskProgress}<span className="text-zinc-600 dark:text-zinc-400 ms-0.5">%</span></span>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })
                                            ) : null}
                                        </TableBody>
                                    </Table>
                                </div>

                                {
                                    isLoading ? <div className="w-full flex justify-center items-center mt-5">
                                        <p className="text-center text-zinc-500 font-semibold dark:text-zinc-400">Carregando...</p>
                                    </div> : filteredData.length > 0 ?
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
