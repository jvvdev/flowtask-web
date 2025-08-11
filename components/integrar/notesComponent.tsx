'use client'

import { RiSearch2Line } from "@remixicon/react";
import { Button } from "../button";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Input } from "../input";
import { AlignCenter, Baseline, Bold, CaseSensitive, Italic, NotebookPen, Trash2, Underline } from "lucide-react";
import { useState } from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const NotesList = [
    {
        id: 1,
        title: "Nota 1",
        content: "Conteúdo da nota 1"
    },
    {
        id: 2,
        title: "Nota 2",
        content: "Conteúdo da nota 2"
    },
    {
        id: 3,
        title: "Nota 3",
        content: "Conteúdo da nota 3"
    },
    {
        id: 4,
        title: "Nota 4",
        content: "Conteúdo da nota 4"
    },
    {
        id: 5,
        title: "Nota 5",
        content: "Conteúdo da nota 5"
    },
    {
        id: 6,
        title: "Nota 6",
        content: "Conteúdo da nota 6"
    },
    {
        id: 7,
        title: "Nota 7",
        content: "Conteúdo da nota 7"
    },
    {
        id: 8,
        title: "Nota 8",
        content: "Conteúdo da nota 8"
    },
    {
        id: 9,
        title: "Nota 9",
        content: "Conteúdo da nota 9"
    },
    {
        id: 10,
        title: "Nota 10",
        content: "Conteúdo da nota 10"
    },
    {
        id: 11,
        title: "Nota 11",
        content: "Conteúdo da nota 11"
    },
    {
        id: 12,
        title: "Nota 12",
        content: "Conteúdo da nota 12"
    },
    {
        id: 13,
        title: "Nota 13",
        content: "Conteúdo da nota 13"
    },
    {
        id: 14,
        title: "Nota 14",
        content: "Conteúdo da nota 14"
    },
    {
        id: 15,
        title: "Nota 15",
        content: "Conteúdo da nota 15"
    },
    {
        id: 16,
        title: "Nota 16",
        content: "Conteúdo da nota 16"
    },
    {
        id: 17,
        title: "Nota 17",
        content: "Conteúdo da nota 17"
    },
    {
        id: 18,
        title: "Nota 18",
        content: "Conteúdo da nota 18"
    },
    {
        id: 19,
        title: "Nota 19",
        content: "Conteúdo da nota 19"
    },
    {
        id: 20,
        title: "Nota 20",
        content: "Conteúdo da nota 20"
    }
]

export function NotesComponent() {
    const [currentNote, setCurrentNote] = useState(0)

    return (
        <div className="flex justify-between">
            <div className="w-[20%]">
                <div className="flex justify-between items-center gap-2">
                    <div className="relative w-full">
                        <Input
                            placeholder="Pesquisar pelo nome"
                            className="peer min-w-60 ps-9 dark:bg-background dark:bg-gradient-to-br dark:from-accent/60 dark:to-accent"
                        />
                        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/60 peer-disabled:opacity-50">
                            <RiSearch2Line size={20} aria-hidden="true" />
                        </div>
                    </div>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="cursor-pointer">
                                <AlignCenter className="opacity-50" />
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

                <div className="space-y-2 mt-2 flex flex-col max-h-[76vh] overflow-y-auto pr-1.5
                        [&::-webkit-scrollbar]:w-1.5
                        [&::-webkit-scrollbar-track]:rounded-md
                        [&::-webkit-scrollbar-thumb]:rounded-md
                        [&::-webkit-scrollbar-track]:bg-zinc-200/50
                        dark:[&::-webkit-scrollbar-track]:bg-zinc-800/30
                        [&::-webkit-scrollbar-thumb]:bg-zinc-400
                        dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700">
                    {
                        NotesList.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setCurrentNote(item.id)}
                                className={`flex flex-col justify-start items-start p-2 border ${currentNote === item.id ? 'bg-gradient-to-l from-green-700 to-green-600' : 'dark:bg-zinc-800/30 dark:hover:bg-zinc-800/70 cursor-pointer'} rounded-md duration-200`}
                            >
                                <h3
                                    className={`font-semibold w-full text-left overflow-hidden whitespace-nowrap text-ellipsis text-lg truncate ${currentNote === item.id ? 'text-zinc-100' : ''}`}
                                >
                                    {item.title}
                                </h3>
                                <p
                                    className={`text-sm w-full text-left overflow-hidden whitespace-nowrap text-ellipsis truncate ${currentNote === item.id ? 'text-zinc-100' : 'text-muted-foreground'}`}
                                >
                                    {item.content}
                                </p>
                            </button>
                        ))
                    }
                </div>
            </div>

            <div className="w-[80%]">
                {
                    currentNote == 0 ?
                        <div className="flex w-full h-full justify-center py-60">
                            <h2 className="text-xl font-semibold">Selecione um relatório para visualizar</h2>
                        </div> : <div className="pl-3 py-0.5">
                            <div className="flex justify-between items-center w-full">
                                <Trash2 className="p-1 rounded-md hover:bg-zinc-800 text-green-600 hover:text-green-400 duration-200 cursor-pointer" size={30} />
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <CaseSensitive className="p-1 rounded-md hover:bg-zinc-800 text-green-600 hover:text-green-400 duration-200 cursor-pointer" size={30} />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel className="flex items-center justify-center gap-2">
                                            <Bold className="p-1 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-50 duration-200 cursor-pointer" size={34} />
                                            <Italic className="p-1 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-50 duration-200 cursor-pointer" size={34} />
                                            <Underline className="p-1 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-50 duration-200 cursor-pointer" size={34} />
                                            <p className="px-2 text-2xl rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-50 duration-200 cursor-pointer line-through">S</p>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <DropdownMenuShortcut>⌘+Shift+C</DropdownMenuShortcut>
                                            Enable
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <DropdownMenuShortcut>⌘+Shift+C</DropdownMenuShortcut>
                                            Disable
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <div className="flex items-center gap-2">
                                    <p className="px-2 font-semibold text-zinc-400 duration-200 cursor-pointer">Salvo</p>
                                    <NotebookPen className="p-1 rounded-md hover:bg-zinc-800 text-green-600 hover:text-green-400 duration-200 cursor-pointer" size={30} />
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
}
