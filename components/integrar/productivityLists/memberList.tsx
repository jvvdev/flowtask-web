'use client'

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
    { id: 16, name: "John Doe", tasksCompleted: 5, totalTasks: 10 },
    { id: 17, name: "Jane Smith", tasksCompleted: 8, totalTasks: 10 },
    { id: 18, name: "Alice Johnson", tasksCompleted: 12, totalTasks: 12 },
    { id: 19, name: "Bob Brown", tasksCompleted: 3, totalTasks: 10 },
    { id: 20, name: "Charlie Davis", tasksCompleted: 7, totalTasks: 10 },
    { id: 21, name: "Diana Prince", tasksCompleted: 9, totalTasks: 10 },
    { id: 22, name: "Evelyn Clark", tasksCompleted: 10, totalTasks: 10 },
    { id: 23, name: "Frank Miller", tasksCompleted: 6, totalTasks: 10 },
    { id: 24, name: "Grace Lee", tasksCompleted: 11, totalTasks: 12 },
    { id: 25, name: "Henry Wilson", tasksCompleted: 4, totalTasks: 10 },
    { id: 26, name: "Isabel Turner", tasksCompleted: 8, totalTasks: 10 },
    { id: 27, name: "Jack White", tasksCompleted: 9, totalTasks: 10 },
    { id: 28, name: "Karen Young", tasksCompleted: 12, totalTasks: 12 },
    { id: 29, name: "Leo King", tasksCompleted: 7, totalTasks: 10 },
    { id: 30, name: "Mia Scott", tasksCompleted: 10, totalTasks: 10 },
]

export function ListProductivityMembers() {
    const [isLoading, setIsLoading] = useState(false);

    // paginação
    const pageSize = 1000000000;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(memberData.length / pageSize);

    const paginatedData = memberData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="flex flex-col justify-between h-100 sm:h-321 md:h-195 lg:h-177.5 xl:h-[447px] 2xl:h-87">
            {
                isLoading ?
                    <div className="flex justify-center items-center h-full">
                        <LoaderCircle className="animate-spin" />
                    </div>
                    : (
                        <div
                            className="h-full overflow-y-auto pr-2
                                [&::-webkit-scrollbar]:w-1.5
                                [&::-webkit-scrollbar-track]:rounded-md
                                [&::-webkit-scrollbar-thumb]:rounded-md
                                [&::-webkit-scrollbar-track]:bg-zinc-200/50
                                dark:[&::-webkit-scrollbar-track]:bg-zinc-800/30
                                [&::-webkit-scrollbar-thumb]:bg-zinc-400
                                dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700"
                        >
                            <Table className="table-fixed border-separate min-w-106 border-spacing-0 [&_tr:not(:last-child)_td]:border-b">
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="relative w-[60%] h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                            <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500 overflow-hidden whitespace-nowrap text-ellipsis"><ALargeSmall size={18} /> Nome</p>
                                        </TableHead>
                                        <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                            <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500 overflow-hidden whitespace-nowrap text-ellipsis"><ClipboardCheck size={18} /> Tarefas concluídas</p>
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
                                                <TableCell className="font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
                                                    {item.name}
                                                </TableCell>
                                                <TableCell className="font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
                                                    {item.tasksCompleted} <span className="font-medium text-muted-foreground">/ {item.totalTasks}</span>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    )
            }
        </div>
    )
}