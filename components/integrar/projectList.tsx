'use client'

import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/table";
import { Button } from "../button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/popover";
import { Input } from "../input";
import { RiFilter3Line, RiSearch2Line } from "@remixicon/react";
import { ALargeSmall, ArchiveRestore, CalendarCheck2, ChartPie, Check, LoaderCircle, Trash2, TriangleAlert, UserCog } from "lucide-react";
import { CircularProgress } from "../circularProgress";
import { useRouter } from "next/navigation";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const Projects = [
    { id: 1, Name: "Vila Roleplay", Status: "Não iniciado", Priority: "Alta", Progress: 20, Date: "22 Março, 2025", Owner: "Lucas" },
    { id: 2, Name: "Sistema de Inventário", Status: "Em andamento", Priority: "Media", Progress: 55, Date: "15 Abril, 2025", Owner: "Ana" },
    { id: 3, Name: "Site Oficial", Status: "Finalizado", Priority: "Baixa", Progress: 100, Date: "05 Março, 2025", Owner: "Carla" },
    { id: 4, Name: "App Mobile", Status: "Em andamento", Priority: "Alta", Progress: 40, Date: "10 Maio, 2025", Owner: "Pedro" },
    { id: 5, Name: "Chat Online", Status: "Não iniciado", Priority: "Media", Progress: 0, Date: "01 Junho, 2025", Owner: "Julia" },
    { id: 6, Name: "Dashboard Admin", Status: "Finalizado", Priority: "Alta", Progress: 100, Date: "28 Fevereiro, 2025", Owner: "Mateus" },
    { id: 7, Name: "Sistema de Pagamento", Status: "Em andamento", Priority: "Alta", Progress: 65, Date: "18 Abril, 2025", Owner: "Fernanda" },
    { id: 8, Name: "Integração API", Status: "Não iniciado", Priority: "Baixa", Progress: 10, Date: "30 Março, 2025", Owner: "Rafael" },
    { id: 9, Name: "Sistema de Notificações", Status: "Finalizado", Priority: "Media", Progress: 100, Date: "12 Março, 2025", Owner: "Bruna" },
    { id: 10, Name: "Configuração Servidor", Status: "Em andamento", Priority: "Alta", Progress: 75, Date: "25 Abril, 2025", Owner: "Gustavo" },
];

export function ProjectList() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<typeof Projects>([]);
    const [selectedProject, setSelectedProject] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const currentPage = 1;
    const totalPages = 1;
    
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            setData(Projects);
            setIsLoading(false);
        }, 0);
    }, []);

    const handleOpenProject = (projectId: number) => {
        if (projectId) {
            router.push(`/dashboard/project/${projectId}`);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div className="relative">
                    <Input
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Pesquisar pelo nome"
                        className="peer min-w-60 ps-9 bg-background bg-gradient-to-br from-accent/60 to-accent"
                    />
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/60 peer-disabled:opacity-50">
                        <RiSearch2Line size={20} aria-hidden="true" />
                    </div>
                </div>

                <div className="flex gap-2">
                    {
                        selectedProject > 0 && (
                            <div className="flex gap-2">
                                <AlertDialog>
                                    <AlertDialogTrigger
                                        className="px-2 flex items-center justify-center gap-2 rounded-md text-sm font-semibold bg-green-500/15 dark:bg-green-500/20 hover:bg-green-500/20 dark:hover:bg-green-500/30 border border-green-500/20 text-green-500 cursor-pointer"
                                    >
                                        <ArchiveRestore className="size-5" />
                                        Abrir projeto
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="w-[20%]">
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Confirmar</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Você tem certeza de que deseja abrir este projeto?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleOpenProject(selectedProject)}>Abrir</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                                <Button className="bg-red-500/15 dark:bg-red-500/20 hover:bg-red-500/20 dark:hover:bg-red-500/30 border border-red-500/20 text-red-500 cursor-pointer"
                                    onClick={() => {
                                        // Handle delete project
                                    }}
                                >
                                    <Trash2 className="size-5" />
                                    Deletar
                                </Button>
                            </div>
                        )
                    }

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">
                                <RiFilter3Line
                                    className="size-5 -ms-1.5 text-muted-foreground/60"
                                    size={20}
                                    aria-hidden="true"
                                />
                                Filtrar
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto min-w-36 p-3" align="end">
                            <div className="space-y-3">
                                <div className="text-xs font-medium uppercase text-muted-foreground/60">
                                    Status
                                </div>
                                <div className="space-y-3">

                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <Table className="table-fixed border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b">
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                            <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><ALargeSmall size={18} /> Nome</p>
                        </TableHead>
                        <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                            <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><ChartPie size={18} /> Status</p>
                        </TableHead>
                        <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                            <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><TriangleAlert size={18} /> Prioridade</p>
                        </TableHead>
                        <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                            <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><LoaderCircle size={18} /> Progresso</p>
                        </TableHead>
                        <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                            <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><CalendarCheck2 size={18} /> Data de entrega</p>
                        </TableHead>
                        <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                            <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><UserCog size={18} /> Responsável</p>
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {isLoading ? "" : data.length > 0 ? (
                        data.filter((item) => item.Name.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => (
                            <TableRow
                                key={item.id}
                                className="border-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg h-px hover:bg-accent/50"
                            >
                                <TableCell className="flex gap-2">
                                    <button className={`border rounded-sm ${selectedProject === item.id ? "bg-green-400 dark:bg-green-600 p-[3px]" : "w-5"}`} onClick={() => { if (selectedProject === item.id) setSelectedProject(0); else setSelectedProject(item.id); }}><Check className={`${selectedProject === item.id ? "block" : "hidden"}`} size={12} /></button>
                                    <p className="font-semibold">{item.Name}</p>
                                </TableCell>
                                <TableCell>
                                    {item.Status === "Não iniciado" ? (
                                        <div className="flex items-center gap-2 relative">
                                            <div className="relative flex h-2 w-2">
                                                <div className="absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75 animate-ping"></div>
                                                <div className="relative inline-flex rounded-full h-2 w-2 bg-gray-400"></div>
                                            </div>
                                            <span className="opacity-80">Não iniciado</span>
                                        </div>
                                    ) : item.Status === "Em andamento" ? (
                                        <div className="flex items-center gap-2 relative">
                                            <div className="relative flex h-2 w-2">
                                                <div className="absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75 animate-ping"></div>
                                                <div className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></div>
                                            </div>
                                            <span className="text-purple-400">Em progresso</span>
                                        </div>
                                    ) : item.Status === "Finalizado" ? (
                                        <div className="flex items-center gap-2 relative">
                                            <div className="relative flex h-2 w-2">
                                                <div className="absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75 animate-ping"></div>
                                                <div className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></div>
                                            </div>
                                            <span className="text-green-400">Finalizado</span>
                                        </div>
                                    ) : (
                                        <span>{item.Status}</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {item.Priority === "Alta" ? (
                                        <div className="flex items-center gap-2 relative">
                                            <div className="relative flex h-2 w-2">
                                                <div className="absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75 animate-ping"></div>
                                                <div className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></div>
                                            </div>
                                            <span className="text-red-500">Alta</span>
                                        </div>
                                    ) : item.Priority === "Media" ? (
                                        <div className="flex items-center gap-2 relative">
                                            <div className="relative flex h-2 w-2">
                                                <div className="absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75 animate-ping"></div>
                                                <div className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></div>
                                            </div>
                                            <span className="text-yellow-500">Média</span>
                                        </div>
                                    ) : item.Priority === "Baixa" ? (
                                        <div className="flex items-center gap-2 relative">
                                            <div className="relative flex h-2 w-2">
                                                <div className="absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75 animate-ping"></div>
                                                <div className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></div>
                                            </div>
                                            <span className="text-green-500">Baixa</span>
                                        </div>
                                    ) : (
                                        <span>{item.Priority}</span> // Caso não seja nenhum dos 3, só mostra o texto
                                    )}
                                </TableCell>
                                <TableCell key={item.id} className="flex items-center justify-start gap-2">
                                    <CircularProgress progress={item.Progress} />
                                    <span className="text-sm flex">{item.Progress} <p className="text-zinc-600 dark:text-zinc-400">%</p></span>
                                </TableCell>
                                <TableCell>{item.Date}</TableCell>
                                <TableCell><strong>{item.Owner}</strong></TableCell>
                            </TableRow>
                        ))
                    ) : ""}
                </TableBody>
            </Table>

            {
                isLoading ? <div className="w-full flex justify-center items-center mt-5">
                    <p className="text-center text-zinc-500 font-semibold dark:text-zinc-400">Carregando...</p>
                </div> : data.length > 0 ?
                    <div className="flex items-center justify-between gap-3 mt-4">
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
                                onClick={() => {

                                }}
                                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                            >
                                Anterior
                            </Button>
                            <Button
                                variant="outline"
                                disabled={currentPage === totalPages}
                                aria-label="Próxima página"
                                onClick={() => {

                                }}
                                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                            >
                                Próxima
                            </Button>
                        </div>
                    </div> : <div className="w-full flex justify-center items-center mt-5">
                        <p className="text-center font-semibold">Nenhum projeto encontrado</p>
                    </div>
            }
        </div>
    );
}
