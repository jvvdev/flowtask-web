'use client'

import { Button } from "@/components/button";
import { ListProductivityMembers } from "@/components/integrar/productivityLists/memberList";
import { ListProductivityProjects } from "@/components/integrar/productivityLists/projectList";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/table";
import { RiFilter3Line } from "@remixicon/react";
import { ALargeSmall, ClipboardCheck, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { metricsProp } from "../page";

export type returnMetricProps = {
    data: metricsProp;
    // setData: React.Dispatch<React.SetStateAction<Project[]>>;
};

export function ListProductivity({ data }: returnMetricProps) {
    const [filter, setFilter] = useState("Membro");
    const [isLoading, setIsLoading] = useState(false);
    const [paginatedData, setPaginatedData] = useState([]);

    useEffect(() => {
        console.log(data)

        function setData() {
            setPaginatedData(data.members_and_tasks)
        }

        if (data.length === 0) {
        } else {
            setData()
        }
    }, [data])

    return (
        <div className="p-4 w-full space-y-2 border border-border bg-gradient-to-br from-sidebar/60 to-sidebar rounded-lg">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-semibold">Produtividade</h2>
                    <p className="text-muted-foreground">Mostrando por: <span className="font-semibold">{filter}</span></p>
                </div>

                {/* <Popover>
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
                        <div className="flex flex-col">
                            <button className={`text-sm font-medium hover:bg-muted p-2 ${filter === "Membro" ? "bg-muted font-semibold" : "cursor-pointer"}`} onClick={() => setFilter("Membro")}>Membro</button>
                            <button className={`text-sm font-medium hover:bg-muted p-2 ${filter === "Projeto" ? "bg-muted font-semibold" : "cursor-pointer"}`} onClick={() => setFilter("Projeto")}>Projeto</button>
                        </div>
                    </PopoverContent>
                </Popover> */}
            </div>

            <div className="flex flex-col justify-between h-100 sm:h-321 md:h-195 lg:h-177.5 xl:h-[447px] 2xl:h-87">
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
                                paginatedData.map((item, index) => (
                                    <TableRow
                                        key={index}
                                        className="border-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg h-px hover:bg-accent/50"
                                    >
                                        <TableCell className="font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
                                            {item.memberId}
                                        </TableCell>
                                        <TableCell className="font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
                                            {item.completedTasks} <span className="font-medium text-muted-foreground">/ {item.totalTasks}</span>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}