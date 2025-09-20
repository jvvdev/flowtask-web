'use client'

import { Button } from "@/components/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/table";
import { ALargeSmall, ClipboardCheck, Clock, LoaderCircle, ShieldAlert } from "lucide-react";
import { useState } from "react";

const actionData = [
    { id:1, action: "Criar novo projeto", date: new Date() },
    { id:2, action: "Atualizar tarefa", date: new Date() },
    { id:3, action: "Excluir membro", date: new Date() },
    { id:4, action: "Adicionar cliente", date: new Date() },
    { id:5, action: "Editar projeto", date: new Date() },
    { id:6, action: "Remover tarefa", date: new Date() },
    { id:7, action: "Concluir tarefa", date: new Date() },
    { id:8, action: "Alterar prioridade", date: new Date() },
    { id:9, action: "Enviar mensagem", date: new Date() },
    { id:10, action: "Atualizar perfil", date: new Date() },
    { id:11, action: "Visualizar relatório", date: new Date() },
    { id:12, action: "Exportar dados", date: new Date() },
    { id:13, action: "Adicionar comentário", date: new Date() },
    { id:14, action: "Remover cliente", date: new Date() },
    { id:15, action: "Reabrir tarefa", date: new Date() },
]

export function ListLogs() {
    const [isLoading, setIsLoading] = useState(false);

    // paginação
    const pageSize = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(actionData.length / pageSize);

    const paginatedData = actionData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="p-4 w-full space-y-2 h-82 border border-border bg-gradient-to-br from-sidebar/60 to-sidebar rounded-lg">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-semibold">Atividades Recentes</h2>
                    <p className="text-muted-foreground text-md">Visualize aqui as atividades recentes.</p>
                </div>
            </div>

            <div className="flex flex-col justify-between">
                {
                    isLoading ?
                        <div className="flex justify-center items-center h-full">
                            <LoaderCircle className="animate-spin" />
                        </div>
                        : <Table className="table-fixed min-w-223 border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b">
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="relative h-9 w-[80%] select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                        <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><ShieldAlert size={18} /> Atividade</p>
                                    </TableHead>
                                    <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                        <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><Clock size={18} /> Horário</p>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>


                            <TableBody>
                                {
                                    paginatedData.map((item) => (
                                        <TableRow
                                            key={item.id}
                                            className="border-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg h-px hover:bg-accent/50"
                                        >
                                            <TableCell className="font-semibold">
                                                {item.action}
                                            </TableCell>
                                            <TableCell>
                                                {item.date.toLocaleString()} 
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                }
                {
                    isLoading ? "" :
                        <div className="flex items-center justify-between mt-2">
                            <p className="text-sm text-muted-foreground">
                                Página <span className="font-semibold">{currentPage}</span> de <span className="font-semibold">{totalPages}</span>
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    className={`${currentPage === 1 ? '' : 'cursor-pointer'}`}
                                >
                                    Anterior
                                </Button>
                                <Button
                                    variant="outline"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    className={`${currentPage === totalPages ? '' : 'cursor-pointer'}`}
                                >
                                    Próxima
                                </Button>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}