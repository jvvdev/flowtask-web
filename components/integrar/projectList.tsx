'use client'

import { useState, useEffect, use } from "react";
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
import { ALargeSmall, ArchiveRestore, CalendarCheck2, ChartPie, Check, LoaderCircle, MessageCircle, Trash2, TriangleAlert, UserCog } from "lucide-react";
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
import axios from "axios";
import { projectService } from "@/api/dashboard/project-service";
import { authService } from "@/api/auth-service";
import { teamService } from "@/api/dashboard/team-service";
import { routes } from "@/api/routes";

export type Project = {
    project_id: string;
    project_title: string;
    project_resume: string;
    project_owner: string;
    completion_percentage: null | number;
    completed_kanbans: number;
    total_kanbans: number;
};

export type ProjectListProps = {
    data: Project[];
    setData: React.Dispatch<React.SetStateAction<Project[]>>;
};

const ITEMS_PER_PAGE = 10;

export function ProjectList({ data, setData }: ProjectListProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState("0");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("");

    const router = useRouter();

    useEffect(() => {
        setIsLoading(false);
    }, [data]);

    let filteredData = Array.isArray(data) ? data.filter((item) => item.project_title.toLowerCase().includes(searchQuery.toLowerCase())) : [];
    // filteredData = filteredData.filter((item) => item.Status.toLowerCase().includes(filter.toLowerCase()));
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleOpenProject = (projectId: string) => {
        if (projectId) {
            router.push(`/dashboard/project/${projectId}`);
        }
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4 gap-2">
                <div className="relative">
                    <Input
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Pesquisar pelo nome"
                        className="peer min-w-40 ps-9 bg-background bg-gradient-to-br from-accent/60 to-accent"
                    />
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/60 peer-disabled:opacity-50">
                        <RiSearch2Line size={20} aria-hidden="true" />
                    </div>
                </div>

                <div className="flex gap-2">
                    {
                        selectedProject != "0" && (
                            <div className="flex gap-2">
                                <AlertDialog>
                                    <AlertDialogTrigger
                                        className="px-2 flex items-center justify-center gap-2 rounded-md text-sm font-semibold bg-green-500/15 dark:bg-green-500/20 hover:bg-green-500/20 dark:hover:bg-green-500/30 border border-green-500/20 text-green-500 cursor-pointer"
                                    >
                                        <ArchiveRestore className="size-5" />
                                        <span className="hidden sm:block">Abrir projeto</span>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Confirmar</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Você tem certeza de que deseja abrir este projeto?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                                            <AlertDialogAction className="cursor-pointer" onClick={() => handleOpenProject(selectedProject)}>Abrir</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                                <AlertDialog>
                                    <AlertDialogTrigger
                                        className="px-2 flex items-center justify-center gap-2 rounded-md text-sm font-semibold bg-red-500/15 dark:bg-red-500/20 hover:bg-red-500/20 dark:hover:bg-red-500/30 border border-red-500/20 text-red-500 cursor-pointer"
                                    >
                                        <Trash2 className="size-5" />
                                        <span className="hidden sm:block">Deletar</span>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Confirmar</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Você tem certeza de que deseja abrir este projeto?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                                            <AlertDialogAction className="bg-red-800 hover:bg-red-700 cursor-pointer" onClick={() => projectService.deleteProject(selectedProject)}>Deletar</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        )
                    }

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="cursor-pointer">
                                <RiFilter3Line
                                    className="size-5 -ms-1.5 text-muted-foreground/60"
                                    size={20}
                                    aria-hidden="true"
                                />
                                Filtrar
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto min-w-36 p-0" align="end">
                            <p className="p-1 border-b font-semibold flex justify-center items-center">Status</p>
                            <div className="flex flex-col">
                                <button className={`text-sm font-medium hover:bg-muted p-2 ${filter === "Não iniciado" ? "bg-muted font-semibold" : "cursor-pointer"}`} onClick={() => { filter != "Não iniciado" ? setFilter("Não iniciado") : setFilter("") }}>Não iniciado</button>
                                <button className={`text-sm font-medium hover:bg-muted p-2 ${filter === "Em andamento" ? "bg-muted font-semibold" : "cursor-pointer"}`} onClick={() => { filter != "Em andamento" ? setFilter("Em andamento") : setFilter("") }}>Em andamento</button>
                                <button className={`text-sm font-medium hover:bg-muted p-2 ${filter === "Finalizado" ? "bg-muted font-semibold" : "cursor-pointer"}`} onClick={() => { filter != "Finalizado" ? setFilter("Finalizado") : setFilter("") }}>Finalizado</button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table className="min-w-[1565px] table-fixed border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b">
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><ALargeSmall size={18} /> Nome</p>
                            </TableHead>
                            <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><MessageCircle size={18} /> Resumo</p>
                            </TableHead>
                            <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><ChartPie size={18} /> Status</p>
                            </TableHead>
                            <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><LoaderCircle size={18} /> Progresso</p>
                            </TableHead>
                            <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><UserCog size={18} /> Responsável</p>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? null : paginatedData.length > 0 ? (
                            paginatedData.map((item) => {
                                return (
                                    <TableRow
                                        key={item.project_id}
                                        className="border-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg h-px hover:bg-accent/50"
                                    >
                                        <TableCell className="flex gap-2">
                                            <button className={`border rounded-sm ${selectedProject === item.project_id ? "bg-green-400 dark:bg-green-600 p-[3px]" : "w-5.5"}`} onClick={() => { if (selectedProject === item.project_id) setSelectedProject("0"); else setSelectedProject(item.project_id); }}><Check className={`${selectedProject === item.project_id ? "block" : "hidden"}`} size={12} /></button>
                                            <p className="w-full overflow-hidden whitespace-nowrap text-ellipsis font-semibold">{item.project_title}</p>
                                        </TableCell>
                                        <TableCell>
                                            {item.project_resume}
                                        </TableCell>
                                        <TableCell>
                                            {item.completion_percentage === null || item.completion_percentage === 0 ? (
                                                <div className="flex items-center gap-2 relative">
                                                    <div className="relative flex h-2 w-2">
                                                        <div className="absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75 animate-ping"></div>
                                                        <div className="relative inline-flex rounded-full h-2 w-2 bg-gray-400"></div>
                                                    </div>
                                                    <span className="opacity-80 overflow-hidden whitespace-nowrap text-ellipsis">Não iniciado</span>
                                                </div>
                                            ) : item.completion_percentage >= 0 ? (
                                                <div className="flex items-center gap-2 relative">
                                                    <div className="relative flex h-2 w-2">
                                                        <div className="absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75 animate-ping"></div>
                                                        <div className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></div>
                                                    </div>
                                                    <span className="text-purple-400 overflow-hidden whitespace-nowrap text-ellipsis">Em progresso</span>
                                                </div>
                                            ) : item.completion_percentage === 100 ? (
                                                <div className="flex items-center gap-2 relative">
                                                    <div className="relative flex h-2 w-2">
                                                        <div className="absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75 animate-ping"></div>
                                                        <div className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></div>
                                                    </div>
                                                    <span className="text-green-400 overflow-hidden whitespace-nowrap text-ellipsis">Finalizado</span>
                                                </div>
                                            ) : (
                                                <span className="overflow-hidden whitespace-nowrap text-ellipsis">{status}</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="flex items-center justify-start gap-2">
                                            <CircularProgress progress={item.completion_percentage == null ? 0 : item.completion_percentage} />
                                            <span className="text-sm flex overflow-hidden whitespace-nowrap text-ellipsis">
                                                {item.completion_percentage}
                                                <span className="text-zinc-600 dark:text-zinc-400 ms-1">%</span>
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <strong className="overflow-hidden whitespace-nowrap text-ellipsis">{item.project_owner}</strong>
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
        </div>
    );
}
