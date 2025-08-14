'use client'

import { Button } from "@/components/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/table";
import { ALargeSmall, ClipboardCheck, LoaderCircle } from "lucide-react";
import { useState } from "react";

const memberData = [
    { id: 1, name: "John Doe", tasksCompleted: 5, totalTasks: 10 },
    { id: 2, name: "Jane Smith", tasksCompleted: 8, totalTasks: 10 },
    { id: 3, name: "Alice Johnson", tasksCompleted: 12, totalTasks: 12 },
    { id: 4, name: "Bob Brown", tasksCompleted: 3, totalTasks: 10 },
    { id: 5, name: "Charlie Davis", tasksCompleted: 7, totalTasks: 10 },
    { id: 6, name: "Diana Prince", tasksCompleted: 9, totalTasks: 10 },
    { id: 7, name: "Evelyn Clark", tasksCompleted: 10, totalTasks: 10 },
    { id: 8, name: "Frank Miller", tasksCompleted: 6, totalTasks: 10 },
    { id: 9, name: "Grace Lee", tasksCompleted: 11, totalTasks: 12 },
    { id: 10, name: "Henry Wilson", tasksCompleted: 4, totalTasks: 10 },
    { id: 11, name: "Isabel Turner", tasksCompleted: 8, totalTasks: 10 },
    { id: 12, name: "Jack White", tasksCompleted: 9, totalTasks: 10 },
    { id: 13, name: "Karen Young", tasksCompleted: 12, totalTasks: 12 },
    { id: 14, name: "Leo King", tasksCompleted: 7, totalTasks: 10 },
    { id: 15, name: "Mia Scott", tasksCompleted: 10, totalTasks: 10 },
]

export function ListProductivityMembers() {
    const [isLoading, setIsLoading] = useState(false);

    // paginação
    const pageSize = 11;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(memberData.length / pageSize);

    const paginatedData = memberData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="flex flex-col justify-between h-[90%]">
            {
                isLoading ?
                    <div className="flex justify-center items-center h-full">
                        <LoaderCircle className="animate-spin" />
                    </div>
                    : <Table className="table-fixed border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b">
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                    <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><ALargeSmall size={18} /> Nome</p>
                                </TableHead>
                                <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                    <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><ClipboardCheck size={18} /> Tarefas concluídas</p>
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
                                            {item.name}
                                        </TableCell>
                                        <TableCell className="font-semibold">
                                            {item.tasksCompleted} <span className="font-medium text-muted-foreground">/ {item.totalTasks}</span>
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
                        >
                            Anterior
                        </Button>
                        <Button
                            variant="outline"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Próxima
                        </Button>
                    </div>
                </div>
            }
        </div>
    )
}