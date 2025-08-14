'use client'

import { Button } from "@/components/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/table";
import { ALargeSmall, ClipboardCheck, LoaderCircle } from "lucide-react";
import { useState } from "react";

const projectData = [
    { id: 1, name: "Manager System", tasksCompleted: 5, totalTasks: 10 },
    { id: 2, name: "FlowTask App", tasksCompleted: 8, totalTasks: 10 },
    { id: 3, name: "E-commerce Platform", tasksCompleted: 12, totalTasks: 12 },
    { id: 4, name: "Website Redesign", tasksCompleted: 3, totalTasks: 10 },
    { id: 5, name: "API Gateway", tasksCompleted: 7, totalTasks: 10 },
    { id: 6, name: "Mobile CRM", tasksCompleted: 9, totalTasks: 10 },
    { id: 7, name: "Analytics Dashboard", tasksCompleted: 10, totalTasks: 10 },
    { id: 8, name: "Landing Page", tasksCompleted: 6, totalTasks: 10 },
    { id: 9, name: "Inventory Control", tasksCompleted: 11, totalTasks: 12 },
    { id: 10, name: "HR Portal", tasksCompleted: 4, totalTasks: 10 },
    { id: 11, name: "Finance Tracker", tasksCompleted: 8, totalTasks: 10 },
    { id: 12, name: "Marketing Automation", tasksCompleted: 9, totalTasks: 10 },
    { id: 13, name: "Customer Support", tasksCompleted: 12, totalTasks: 12 },
    { id: 14, name: "Document Manager", tasksCompleted: 7, totalTasks: 10 },
    { id: 15, name: "Task Scheduler", tasksCompleted: 10, totalTasks: 10 },
    { id: 16, name: "Manager System", tasksCompleted: 5, totalTasks: 10 },
    { id: 17, name: "FlowTask App", tasksCompleted: 8, totalTasks: 10 },
    { id: 18, name: "E-commerce Platform", tasksCompleted: 12, totalTasks: 12 },
    { id: 19, name: "Website Redesign", tasksCompleted: 3, totalTasks: 10 },
    { id: 20, name: "API Gateway", tasksCompleted: 7, totalTasks: 10 },
    { id: 21, name: "Mobile CRM", tasksCompleted: 9, totalTasks: 10 },
    { id: 22, name: "Analytics Dashboard", tasksCompleted: 10, totalTasks: 10 },
    { id: 23, name: "Landing Page", tasksCompleted: 6, totalTasks: 10 },
    { id: 24, name: "Inventory Control", tasksCompleted: 11, totalTasks: 12 },
    { id: 25, name: "HR Portal", tasksCompleted: 4, totalTasks: 10 },
    { id: 26, name: "Finance Tracker", tasksCompleted: 8, totalTasks: 10 },
    { id: 27, name: "Marketing Automation", tasksCompleted: 9, totalTasks: 10 },
    { id: 28, name: "Customer Support", tasksCompleted: 12, totalTasks: 12 },
    { id: 29, name: "Document Manager", tasksCompleted: 7, totalTasks: 10 },
    { id: 30, name: "Task Scheduler", tasksCompleted: 10, totalTasks: 10 },
]

export function ListProductivityProjects() {
    const [isLoading, setIsLoading] = useState(false);
    // paginação
    const pageSize = 11;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(projectData.length / pageSize);

    const paginatedData = projectData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="flex flex-col justify-between h-100 sm:h-321 md:h-320 lg:h-304 xl:h-237 2xl:h-153">
            {
                isLoading ?
                    <div className="flex justify-center items-center h-full">
                        <LoaderCircle className="animate-spin" />
                    </div>
                    :
                <Table className="table-fixed border-separate min-w-95 border-spacing-0 [&_tr:not(:last-child)_td]:border-b">
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
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
            }
        </div>
    )
}