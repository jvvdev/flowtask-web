'use client'

import { Button } from "@/components/button";
import { ListProductivityMembers } from "@/components/integrar/productivityLists/memberList";
import { ListProductivityProjects } from "@/components/integrar/productivityLists/projectList";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { RiFilter3Line } from "@remixicon/react";
import { useState } from "react";

export function ListProductivity() {
    const [filter, setFilter] = useState("Membro");

    return (
        <div className="p-4 w-full sm:w-[30%] space-y-2 h-full border border-border bg-gradient-to-br from-sidebar/60 to-sidebar rounded-lg">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-semibold">Produtividade</h2>
                    <p className="text-muted-foreground">Mostrando por: <span className="font-semibold">{filter}</span></p>
                </div>

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
                        <div className="flex flex-col">
                            <button className={`text-sm font-medium hover:bg-muted p-2 ${filter === "Membro" ? "bg-muted font-semibold" : "cursor-pointer"}`} onClick={() => setFilter("Membro")}>Membro</button>
                            <button className={`text-sm font-medium hover:bg-muted p-2 ${filter === "Projeto" ? "bg-muted font-semibold" : "cursor-pointer"}`} onClick={() => setFilter("Projeto")}>Projeto</button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            {
                filter === "Membro" ?
                    <ListProductivityMembers /> : filter == "Projeto" ?
                    <ListProductivityProjects /> : null
            }
        </div>
    )
}