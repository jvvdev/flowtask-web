'use client'

import { RiSearch2Line } from "@remixicon/react";
import { Button } from "../button";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Input } from "../input";
import { AlignCenter, Bold, CaseSensitive, Italic, LogIn, NotebookPen, Trash2, Underline } from "lucide-react";
import { useState } from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"

const NotesList = [
    {
        id: 1,
        title: "Nota 1",
        content: "Conteúdo da nota 1",
        creator: "João Vinícius"
    },
    {
        id: 2,
        title: "Nota 2",
        content: "Conteúdo da nota 2",
        creator: "Maria Silva"
    },
    {
        id: 3,
        title: "Nota 3",
        content: "Conteúdo da nota 3",
        creator: "Pedro Souza"
    },
    {
        id: 4,
        title: "Nota 4",
        content: "Conteúdo da nota 4",
        creator: "Ana Oliveira"
    },
    {
        id: 5,
        title: "Nota 5",
        content: "Conteúdo da nota 5",
        creator: "Carlos Pereira"
    },
    {
        id: 6,
        title: "Nota 6",
        content: "Conteúdo da nota 6",
        creator: "Maria Oliveira"
    },
    {
        id: 7,
        title: "Nota 7",
        content: "Conteúdo da nota 7",
        creator: "Pedro Santos"
    },
    {
        id: 8,
        title: "Nota 8",
        content: "Conteúdo da nota 8",
        creator: "Maria Souza"
    },
    {
        id: 9,
        title: "Nota 9",
        content: "Conteúdo da nota 9",
        creator: "João Silva"
    },
    {
        id: 10,
        title: "Nota 10",
        content: "Conteúdo da nota 10",
        creator: "Ana Silva"
    },
    {
        id: 11,
        title: "Nota 11",
        content: "Conteúdo da nota 11",
        creator: "Carlos Silva"
    },
    {
        id: 12,
        title: "Nota 12",
        content: "Conteúdo da nota 12",
        creator: "Maria Silva"
    },
    {
        id: 13,
        title: "Nota 13",
        content: "Conteúdo da nota 13",
        creator: "Pedro Oliveira"
    },
    {
        id: 14,
        title: "Nota 14",
        content: "Conteúdo da nota 14",
        creator: "Ana Oliveira"
    },
    {
        id: 15,
        title: "Nota 15",
        content: "Conteúdo da nota 15",
        creator: "Carlos Oliveira"
    },
    {
        id: 16,
        title: "Nota 16",
        content: "Conteúdo da nota 16",
        creator: "Maria Oliveira"
    },
    {
        id: 17,
        title: "Nota 17",
        content: "Conteúdo da nota 17",
        creator: "Carlos Oliveira"
    },
    {
        id: 18,
        title: "Nota 18",
        content: "Conteúdo da nota 18",
        creator: "Maria Oliveira"
    },
    {
        id: 19,
        title: "Nota 19",
        content: "Conteúdo da nota 19",
        creator: "João Oliveira"
    },
    {
        id: 20,
        title: "Nota 20",
        content: "Conteúdo da nota 20",
        creator: "Ana Oliveira"
    }
]

export function NotesComponent() {
    const [currentNote, setCurrentNote] = useState(0)
    const [fontWeight, setFontWeight] = useState("normal")
    const [fontType, setFontType] = useState("normal")

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
                            <div key={item.id}>
                                <ContextMenu>
                                    <ContextMenuTrigger className="w-full" onClick={() => setCurrentNote(item.id)}>
                                        <div
                                            className={`flex flex-col justify-start items-start p-2 ${currentNote === item.id ? 'bg-gradient-to-l from-green-700 to-green-600' : 'dark:bg-zinc-800/30 dark:hover:bg-zinc-800/70 cursor-pointer'} rounded-md border duration-200`}>
                                            <div className="flex items-center justify-between w-full">
                                                <h3
                                                    className={`font-semibold w-full text-left overflow-hidden whitespace-nowrap text-ellipsis text-lg truncate ${currentNote === item.id ? 'text-zinc-100' : ''}`}>
                                                    {item.title}
                                                </h3>
                                                <h3
                                                    className={`font-semibold w-full text-right text-sm overflow-hidden whitespace-nowrap text-ellipsis truncate ${currentNote === item.id ? 'text-zinc-100/90' : 'text-zinc-600 dark:text-zinc-400'}`}>
                                                    {item.creator}
                                                </h3>
                                            </div>
                                            <p
                                                className={`text-sm w-full text-left overflow-hidden whitespace-nowrap text-ellipsis truncate ${currentNote === item.id ? 'text-zinc-100' : 'text-muted-foreground'}`}>
                                                {item.content}
                                            </p>
                                        </div>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent className="p-0 border-0">
                                        <ContextMenuItem
                                        className="px-2 flex items-center justify-center gap-2 rounded-md text-sm font-semibold bg-red-500/15 dark:bg-red-500/20 hover:bg-red-500/20 dark:hover:bg-red-500/30 border border-red-500/20 text-red-500 cursor-pointer duration-200"
                                    >
                                        <Trash2 className="size-5 text-red-500"/>
                                       <p className="text-red-500">Deletar</p>
                                    </ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            </div>
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
                                            <Bold className={`p-1 rounded-md ${fontWeight == "bold" ? "bg-green-400 text-zinc-950" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50"} duration-200 cursor-pointer`} size={34} onClick={() => setFontWeight("bold")} />
                                            <Italic className={`p-1 rounded-md ${fontWeight == "italic" ? "bg-green-400 text-zinc-950" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50"} duration-200 cursor-pointer`} size={34} onClick={() => setFontWeight("italic")} />
                                            <Underline className={`p-1 rounded-md ${fontWeight == "underline" ? "bg-green-400 text-zinc-950" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50"} duration-200 cursor-pointer`} size={34} onClick={() => setFontWeight("underline")} />
                                            <button className={`px-2 text-2xl rounded-md ${fontWeight == "through" ? "bg-green-400 text-zinc-950" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50"} duration-200 cursor-pointer line-through`} onClick={() => setFontWeight("through")}>S</button>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <div className="flex flex-col space-y-1">
                                            <button className={`p-1 text-left rounded-sm text-2xl font-semibold ${fontType == "title" ? "bg-green-400 text-zinc-950" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50 cursor-pointer"} duration-200`} onClick={() => setFontType("title")}>
                                                Título
                                            </button>
                                            <button className={`p-1 text-left rounded-sm text-xl font-semibold ${fontType == "header" ? "bg-green-400 text-zinc-950" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50 cursor-pointer"} duration-200`} onClick={() => setFontType("header")}>
                                                Cabeçalho
                                            </button>
                                            <button className={`p-1 text-left rounded-sm text-lg font-semibold ${fontType == "subheader" ? "bg-green-400 text-zinc-950" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50 cursor-pointer"} duration-200`} onClick={() => setFontType("subheader")}>
                                                Subtítulo
                                            </button>
                                            <button className={`p-1 text-left rounded-sm text-base font-semibold ${fontType == "normal" ? "bg-green-400 text-zinc-950" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50 cursor-pointer"} duration-200`} onClick={() => setFontType("normal")}>
                                                Normal
                                            </button>
                                            <button className={`p-1 text-left rounded-sm font-light ${fontType == "thin" ? "bg-green-400 text-zinc-950" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50 cursor-pointer"} duration-200`} onClick={() => setFontType("thin")}>
                                                Fino
                                            </button>
                                        </div>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <div className="flex items-center gap-2">
                                    <p className="px-2 font-semibold text-zinc-400 duration-200">Salvo</p>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <LogIn className="rotate-90 p-1 rounded-md hover:bg-zinc-800 text-green-600 hover:text-green-400 duration-200 cursor-pointer" size={30} />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel className="flex items-center justify-center font-semibold gap-2">
                                                Upload de arquivo
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />

                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <NotebookPen className="p-1 rounded-md hover:bg-zinc-800 text-green-600 hover:text-green-400 duration-200 cursor-pointer" size={30} />
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
}
