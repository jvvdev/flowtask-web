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
import { ALargeSmall, CalendarCheck2, ChartPie, LoaderCircle, TriangleAlert, UserCog } from "lucide-react";

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

interface CircularProgressProps {
  progress: number
  size?: number
  strokeWidth?: number
}

function CircularProgress({ progress, size = 20, strokeWidth = 2 }: CircularProgressProps) {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (progress / 100) * circumference

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="rgb(75 85 99)" // gray-600
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    className="opacity-30"
                />
                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="rgb(34 197 94)" // green-500
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-300 ease-in-out"
                />
            </svg>
        </div>
    )
}

export function ProjectList() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<typeof Projects>([]);

    useEffect(() => {
        setTimeout(() => {
            setData(Projects);
            setIsLoading(false);
        }, 0);
    }, []);

    const currentPage = 1;
    const totalPages = 1;

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div className="relative">
                    <Input
                        placeholder="Pesquisar pelo nome"
                        className="peer min-w-60 ps-9 bg-background bg-gradient-to-br from-accent/60 to-accent"
                    />
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/60 peer-disabled:opacity-50">
                        <RiSearch2Line size={20} aria-hidden="true" />
                    </div>
                </div>

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

            <Table className="table-fixed border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b">
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                            <p className="flex items-center gap-2"><ALargeSmall size={18}/> Nome</p>
                        </TableHead>
                        <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                            <p className="flex items-center gap-2"><ChartPie size={18}/> Status</p>
                        </TableHead>
                        <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                            <p className="flex items-center gap-2"><TriangleAlert size={18}/> Prioridade</p>
                        </TableHead>
                        <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                            <p className="flex items-center gap-2"><LoaderCircle size={18}/> Progresso</p>
                        </TableHead>
                        <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                            <p className="flex items-center gap-2"><CalendarCheck2 size={18}/> Data de entrega</p>
                        </TableHead>
                        <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                            <p className="flex items-center gap-2"><UserCog size={18}/> Responsável</p>
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {isLoading ? (
                        <TableRow className="hover:bg-transparent [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                            <TableCell colSpan={2} className="h-24 text-center">
                                Carregando...
                            </TableCell>
                        </TableRow>
                    ) : data.length > 0 ? (
                        data.map((item, index) => (
                            <TableRow
                                key={item.id}
                                className="border-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg h-px hover:bg-accent/50"
                            >
                                <TableCell>
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
                                    <span className="text-sm">{item.Progress} %</span>
                                </TableCell>
                                <TableCell>{item.Date}</TableCell>
                                <TableCell><strong>{item.Owner}</strong></TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow className="hover:bg-transparent [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                            <TableCell colSpan={2} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Paginação básica */}
            {data.length > 0 && (
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
                </div>
            )}
        </div>
    );
}
