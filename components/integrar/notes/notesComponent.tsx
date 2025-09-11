'use client'

import { RiSearch2Line } from "@remixicon/react";
import { Button } from "../../button";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover";
import { Input } from "../../input";
import { AlignCenter, Bold, CaseSensitive, Check, Info, Italic, LogIn, NotebookPen, Pencil, Trash2, Underline, Undo2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ReactMarkdown, { Components } from "react-markdown";

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
import axios from "axios";
import { routes } from "@/api/routes";
import { authService } from "@/api/auth-service";
import { teamService } from "@/api/dashboard/team-service";
import { relatoryService } from "@/api/dashboard/relatory-service";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/alert-dialog";

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

interface Note {
  id_relatory: string;
  title: string;
  content: string;
  relatory_owner: string;
}

export function NotesComponent() {
    const [currentNote, setCurrentNote] = useState("0")
    const [isEditing, setIsEditing] = useState(false)
    const [noteText, setNoteText] = useState("");
    const [data, setData] = useState<Note[]>([])

    useEffect(() => {
        async function getData() {
            const sessionId = await authService.getToken();
            const actualGroupRaw = await teamService.getTeamByUser();
            let actualGroup: { id_group: string } | null = null;
            if (actualGroupRaw) {
                try {
                    actualGroup = JSON.parse(actualGroupRaw);
                } catch {
                    actualGroup = null;
                }
            }
            if (!actualGroup) return;

            console.log(actualGroup)

            axios.get(routes.getRelatoryByGroup + actualGroup.id_group, {
                headers: {
                    authToken: sessionId
                }
            }).then(res => {
                setData(res.data.data)
            }).catch(err => {
                console.error(err)
            });
        }

        getData()
    }, []);

    const markdownComponents: Components = {
        h1: ({ children }) => <h1 className="text-4xl font-bold  my-4">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl font-semibold my-3">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-semibold my-2">{children}</h3>,
        h4: ({ children }) => <h4 className="text-xl font-semibold my-2">{children}</h4>,
        h5: ({ children }) => <h5 className="text-lg font-semibold my-1">{children}</h5>,
        h6: ({ children }) => <h6 className="text-base font-semibold my-1">{children}</h6>,

        p: ({ children }) => <p className="text-base my-2">{children}</p>,

        strong: ({ children }) => <strong className="font-bold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        del: ({ children }) => <del className="line-through">{children}</del>,

        ul: ({ children }) => <ul className="list-disc pl-5 my-2">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-5 my-2">{children}</ol>,
        li: ({ children }) => <li className="my-1">{children}</li>,

        a: ({ href, children }) => (
            <a
                href={href}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </a>
        ),

        code: ({ className, children }) => (
            <code className={`bg-gray-100 text-black px-1 py-0.5 rounded ${className || ""}`}>
                {children}
            </code>
        ),
        pre: ({ children }) => (
            <pre className="bg-gray-200 text-black p-3 rounded overflow-x-auto my-2">{children}</pre>
        ),

        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-700 my-2">{children}</blockquote>
        ),

        img: ({ src, alt }) => <img src={src} alt={alt} className="rounded-md max-w-full my-2" />,

        table: ({ children }) => <table className="table-auto border-collapse border border-gray-400 my-2">{children}</table>,
        thead: ({ children }) => <thead className="bg-gray-200">{children}</thead>,
        tbody: ({ children }) => <tbody>{children}</tbody>,
        tr: ({ children }) => <tr className="border-b border-gray-300">{children}</tr>,
        th: ({ children }) => <th className="px-2 py-1 text-left bg-gray-200">{children}</th>,
        td: ({ children }) => <td className="px-2 py-1 text-gray-800">{children}</td>,
    };

    function editNote(noteName: string) {
        setIsEditing(false);
        console.log(noteText)
    }

    return (
        <div className="flex justify-between">
            <div className={`w-full md:max-w-80 ${currentNote === "0" ? 'block' : 'hidden md:block'}`}>
                <div className="flex justify-between items-center gap-2">
                    <div className="relative w-full">
                        <Input
                            placeholder="Pesquisar pelo nome"
                            className="peer min-w-40 ps-9 dark:bg-background dark:bg-gradient-to-br dark:from-accent/60 dark:to-accent"
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
                        data.map((item) => (
                            <div key={item.id_relatory}>
                                <ContextMenu>
                                    <ContextMenuTrigger className="w-full" onClick={() => { setCurrentNote(item.id_relatory), setNoteText("") }}>
                                        <div
                                            className={`flex flex-col justify-start items-start p-2 ${currentNote === item.id_relatory ? 'bg-gradient-to-l from-green-700 to-green-600' : 'dark:bg-zinc-800/30 dark:hover:bg-zinc-800/70 cursor-pointer'} rounded-md border duration-200`}>
                                            <div className="flex items-center justify-between w-full">
                                                <h3
                                                    className={`font-semibold w-full text-left overflow-hidden whitespace-nowrap text-ellipsis text-lg truncate ${currentNote === item.id_relatory ? 'text-zinc-100' : ''}`}>
                                                    {item.title}
                                                </h3>
                                                <h3
                                                    className={`font-semibold w-full text-right text-sm overflow-hidden whitespace-nowrap text-ellipsis truncate ${currentNote === item.id_relatory ? 'text-zinc-100/90' : 'text-zinc-600 dark:text-zinc-400'}`}>
                                                    {item.relatory_owner}
                                                </h3>
                                            </div>
                                            <p
                                                className={`text-sm w-full text-left overflow-hidden whitespace-nowrap text-ellipsis truncate ${currentNote === item.id_relatory ? 'text-zinc-100' : 'text-muted-foreground'}`}>
                                                {item.content}
                                            </p>
                                        </div>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent className="p-0 border-0">
                                        <ContextMenuItem
                                            className="px-2 flex items-center justify-center gap-2 rounded-md text-sm font-semibold bg-red-500/15 dark:bg-red-500/20 hover:bg-red-500/20 dark:hover:bg-red-500/30 border border-red-500/20 text-red-500 cursor-pointer duration-200"
                                        >
                                            <Trash2 className="size-5 text-red-500" />
                                            <p className="text-red-500">Deletar</p>
                                        </ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className={`md:w-[80%] ${currentNote !== "0" ? 'w-full' : ''} h-full`}>
                {
                    currentNote == "0" ?
                        <div className="hidden md:flex w-full h-full justify-center py-60">
                            <h2 className="text-xl font-semibold">Selecione um relatório para visualizar</h2>
                        </div> : <div className="md:pl-3 py-0.5 h-full pb-10">
                            <div className="flex justify-between items-center w-full">
                                <div className="flex">
                                    <AlertDialog>
                                        <AlertDialogTrigger
                                            className="p-1 flex items-center justify-center gap-2 rounded-md text-sm font-semibold hover:bg-zinc-800 text-green-600 hover:text-green-400 duration-200 cursor-pointer"
                                        >
                                            <Trash2 className="size-5.5" />
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Confirmar</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Você tem certeza de que deseja excluir este documento?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                                                <AlertDialogAction className="bg-red-800 hover:bg-red-700 cursor-pointer" onClick={() => relatoryService.deleteRelatory(currentNote)}>Deletar</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    <Undo2 className="md:hidden p-1 rounded-md hover:bg-zinc-800 text-green-600 hover:text-green-400 duration-200 cursor-pointer" size={30} onClick={() => setCurrentNote("0")} />
                                </div>
                                <div className="flex items-center gap-2">
                                    <p className="px-2 font-semibold text-zinc-400 duration-200">Salvo</p>
                                    {
                                        !isEditing ? <Pencil className="p-1 rounded-md hover:bg-zinc-800 text-green-600 hover:text-green-400 duration-200 cursor-pointer" size={30} onClick={() => setIsEditing(true)} /> :
                                            <div className="flex gap-2">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger>
                                                        <Info className="p-1 rounded-md hover:bg-zinc-800 text-green-600 hover:text-green-400 duration-200 cursor-pointer" size={30} />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent className="w-72 p-2">
                                                        <DropdownMenuLabel className="flex items-center justify-center font-semibold gap-2">
                                                            Ajuda
                                                        </DropdownMenuLabel>
                                                        <DropdownMenuSeparator />

                                                        <div className="text-sm space-y-2">
                                                            <p className="flex flex-col"><strong># Cabeçalhos:</strong> <span className="text-2xl"><strong>#</strong> Título 1</span><span className="text-xl"><strong>##</strong> Título 2</span><span className="text-lg"><strong>###</strong> Título 3</span></p>
                                                            <p className="flex flex-col"><strong>Ênfase:</strong> <span>*<span className="italic">itálico</span>*</span> <span>**<strong>negrito</strong>**</span> <span>~~<span className="line-through">tachado</span>~~</span></p>
                                                            <p className="flex flex-col"><strong>Listas:</strong> - item <span>1. item</span></p>
                                                            <p className="flex flex-col"><strong>Links:</strong> [texto] <span>(url)</span></p>
                                                            <p className="flex flex-col"><strong>Código:</strong> `inline` ou ```bloco```</p>
                                                            <p className="flex flex-col"><strong>Citações:</strong> &gt; texto</p>
                                                            <p className="flex flex-col"><strong>Linhas:</strong> --- ou ***</p>
                                                            <p className="flex flex-col"><strong>Checklists:</strong> - [ ] não feito, - [x] feito</p>
                                                        </div>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                                <Check className="p-1 rounded-md hover:bg-zinc-800 text-green-600 hover:text-green-400 duration-200 cursor-pointer" size={30} onClick={() => editNote(currentNote)} />
                                            </div>
                                    }
                                </div>
                            </div>
                            <div className="flex gap-4 h-full">
                                {
                                    isEditing ? <textarea
                                        className="w-full h-full p-2 outline-none placeholder:text-2xl"
                                        placeholder="Digite aqui..."
                                        value={noteText}
                                        onChange={(e) => setNoteText(e.target.value)}
                                    /> : <div className="w-full h-full p-2 overflow-auto">
                                        <ReactMarkdown components={markdownComponents} >
                                            {noteText === "" ? "Nenhuma nota salva, clique no icone de lápis para editar." : noteText}
                                        </ReactMarkdown>
                                    </div>
                                }
                            </div>
                        </div>
                }
            </div>
        </div>
    );
}
