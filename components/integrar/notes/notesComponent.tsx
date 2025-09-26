'use client'

import { RiSearch2Line } from "@remixicon/react";
import { Button } from "../../button";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover";
import { Input } from "../../input";
import { AlignCenter, Bold, CaseSensitive, Check, Info, Italic, Loader2, LogIn, NotebookPen, Pencil, Trash2, Underline, Undo2, Users } from "lucide-react";
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
import { EditAlert } from "./editAlert";
import { CreateForm } from "./createAlert";
import { RichTextEditor } from "./components/RichTextEditor";
import EditorJsToHtml from "editorjs-html";
const editorJsParser = EditorJsToHtml();

interface Note {
    id_relatory: string;
    title: string;
    content: string;
    relatory_owner: string;
}

export function NotesComponent() {
    const [currentNote, setCurrentNote] = useState(null as null | Note)
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [noteText, setNoteText] = useState("");
    const [data, setData] = useState<Note[]>([])
    const [notActiveGroup, setNotActiveGroup] = useState(false)

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
            } else {
                setNotActiveGroup(true);
            }
            if (!actualGroup) return;

            axios.get(routes.getRelatoryByGroup + actualGroup.id_group, {
                headers: {
                    authToken: sessionId
                }
            }).then(res => {
                setData(res.data.data)
                setIsLoading(false)
            }).catch(err => {
                console.error(err)

            });
        }

        getData()
    }, []);

type EditorJsHeaderData = { text?: string; level?: number };
    type EditorJsParagraphData = { text?: string };
    type EditorJsQuoteData = { text?: string; caption?: string };
    type EditorJsListItem = { content?: string; items?: Array<{ content?: string }> } | string;
    type EditorJsListData = { style?: 'ordered' | 'unordered'; items?: EditorJsListItem[] };
    type EditorJsChecklistItem = { text?: string; checked?: boolean };
    type EditorJsChecklistData = { items?: EditorJsChecklistItem[] };
    type EditorJsCodeData = { code?: string };
    type EditorJsTableData = { content?: string[][] };
    type EditorJsImageData = { file?: { url?: string }; caption?: string };
    type EditorJsBlock =
        | { type: 'paragraph'; data: EditorJsParagraphData }
        | { type: 'header'; data: EditorJsHeaderData }
        | { type: 'quote'; data: EditorJsQuoteData }
        | { type: 'list'; data: EditorJsListData }
        | { type: 'checklist'; data: EditorJsChecklistData }
        | { type: 'code'; data: EditorJsCodeData }
        | { type: 'table'; data: EditorJsTableData }
        | { type: 'delimiter'; data: Record<string, unknown> }
        | { type: 'image'; data: EditorJsImageData }
        | { type: string; data: Record<string, unknown> };

    function renderEditorJsContent(noteText: string): string {
        if (!noteText) return "Nenhuma nota salva, clique no ícone de lápis para editar.";

        try {
const parsedData = JSON.parse(noteText) as { blocks?: EditorJsBlock[] };
            if (!parsedData.blocks) return "";

const renderBlock = (block: EditorJsBlock): string => {
                const styleLinks = (text: string) =>
                    text.replace(/<a\s+href="(.*?)">(.*?)<\/a>/g, `<a href="$1" class="text-blue-600 underline">$2</a>`);

                switch (block.type) {
                    case "paragraph":
                        {
                            const pData = (block as Extract<EditorJsBlock, { type: 'paragraph' }>).data;
                            const pText = typeof pData.text === "string" ? pData.text : "";
                            return `<p class="mb-2">${styleLinks(pText)}</p>`;
                        }
                    case "header":
                        const headerClasses: Record<number, string> = {
                            1: "text-3xl font-bold mb-4",
                            2: "text-2xl font-semibold mb-3",
                            3: "text-xl font-medium mb-2",
                            4: "text-lg mb-2",
                            5: "text-base mb-2",
                            6: "text-sm mb-2",
                        };
                        {
                            const hData = (block as Extract<EditorJsBlock, { type: 'header' }>).data;
                            const level = typeof hData.level === "number" ? hData.level : 1;
                            const hText = typeof hData.text === "string" ? hData.text : "";
                            return `<h${level} class="${headerClasses[level]}">${styleLinks(hText)}</h${level}>`;
                        }
                    case "quote":
                        {
                            const qData = (block as Extract<EditorJsBlock, { type: 'quote' }>).data;
                            const qText = typeof qData.text === "string" ? qData.text : "";
                            const qCaption = typeof qData.caption === "string" ? qData.caption : "";
                            return `<blockquote class="mb-2">${styleLinks(qText)}${qCaption ? `<footer>${styleLinks(qCaption)}</footer>` : ""}</blockquote>`;
                        }
                    case "list":
                        const listTag = block.data.style === "ordered" ? "ol" : "ul";
const listItems = ((block.data as EditorJsListData).items || []).map((item) => {
const subItems = (typeof item !== 'string' && item.items && item.items.length)
                                ? `<ul>${(item.items as Array<{ content?: string }>).map((sub) => '<li class="mb-1">' + styleLinks(sub?.content || '') + '</li>').join('')}</ul>`
                                : "";
if (typeof item === 'string') {
                            return `<li class="mb-1">${styleLinks(item)}</li>`;
                        }
                        return `<li class="mb-1">${styleLinks(item.content || '')}${subItems}</li>`;
                        }).join("");
                        return `<${listTag} class="mb-2">${listItems}</${listTag}>`;
                    case "checklist":
const checkItems = ((block.data as EditorJsChecklistData).items || []).map((item: EditorJsChecklistItem) =>
                            `<li class="mb-1">${item.checked ? "✔️ " : "⬜ "} ${styleLinks(item.text || "")}</li>`
                        ).join("");
                        return `<ul class="mb-2">${checkItems}</ul>`;
                    case "code":
                        return `<pre class="mb-2"><code>${block.data.code || ""}</code></pre>`;
                    case "table":
const tableRows = (((block.data as EditorJsTableData).content) || []).map((row: string[]) =>
                            `<tr>${row.map(cell => `<td class="p-1 border">${styleLinks(cell || "")}</td>`).join("")}</tr>`
                        ).join("");
                        return `<table class="mb-2 border-collapse">${tableRows}</table>`;
                    case "delimiter":
                        return `<hr class="my-2" />`;
                    case "image":
                        {
                            const imgData = (block as Extract<EditorJsBlock, { type: 'image' }>).data;
                            const url = typeof imgData.file?.url === "string" ? imgData.file.url : "";
                            const caption = typeof imgData.caption === "string" ? imgData.caption : "";
                            return `<img src="${url}" alt="${caption}" class="mb-2" />`;
                        }
                    default:
                        {
                            const d = block.data as { text?: unknown };
                            const dText = typeof d.text === "string" ? d.text : "";
                            return `<p class="mb-2">${styleLinks(dText)}</p>`;
                        }
                }
            };

            return parsedData.blocks.map(renderBlock).join("");
        } catch (e) {
            console.error("Erro ao renderizar Editor.js:", e);
            return noteText;
        }
    }

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
        relatoryService.updateRelatoryText(currentNote, noteText)
    }

    return (
        notActiveGroup ?
            <div className="flex flex-col items-center justify-center h-full text-center">
                <Users size={40} className="text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">Nenhum grupo ativo encontrado</h3>
                <p className="text-muted-foreground">Selecione um grupo para acessar essa página.</p>
            </div> : <div className="flex justify-between max-h-[75vh] gap-5">
                <div className={`relative w-full ${currentNote === null as null | Note ? 'block h-screen max-h-[100%]' : 'hidden md:block md:max-w-80'}`}>
                    {
                        isLoading ? <div className="flex items-center justify-center h-full text-muted-foreground gap-1">
                            <Loader2 className="animate-spin" />
                            <p>Carregando...</p>
                        </div> : data.length === 0 ? <div className="flex flex-col items-center justify-center h-full text-center">
                            <NotebookPen size={40} className="text-muted-foreground mb-2" />
                            <h3 className="text-lg font-medium">Nenhum documento encontrado</h3>
                            <p className="text-muted-foreground">Crie um novo documento clicando no botão abaixo.</p>
                            <CreateForm bigButton={false} />
                        </div> :
                            <div>
                                <div className="flex justify-between items-center gap-2">
                                    <div className="relative w-full">
                                        <Input
                                            placeholder="Pesquisar pelo nome"
                                            className="peer min-w-40 max-w-78.5 ps-9 bg-zinc-200/70 hover:bg-zinc-200 dark:bg-zinc-800/30 dark:hover:bg-zinc-800/70 duration-200"
                                        />
                                        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/60 peer-disabled:opacity-50">
                                            <RiSearch2Line size={20} aria-hidden="true" />
                                        </div>
                                    </div>

                                    {/* <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="cursor-pointer bg-zinc-200/70 hover:bg-zinc-200 text-zinc-700">
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
                    </Popover> */}
                                </div>

                                <div className={`${currentNote === null as null | Note ? 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 max-h-[83%]' : 'hidden md:max-w-80 md:flex flex-col max-h-[85%] space-y-2'} mt-2 overflow-y-auto pr-1.5
                        [&::-webkit-scrollbar]:w-1.5
                        [&::-webkit-scrollbar-track]:rounded-md
                        [&::-webkit-scrollbar-thumb]:rounded-md
                        [&::-webkit-scrollbar-track]:bg-zinc-200/50
                        dark:[&::-webkit-scrollbar-track]:bg-zinc-800/30
                        [&::-webkit-scrollbar-thumb]:bg-zinc-400
                        dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700`}>
                                    {
                                        data.map((item) => (
                                            <div key={item.id_relatory}>
                                                <ContextMenu>
                                                    <ContextMenuTrigger className="w-full" onClick={() => { setCurrentNote(item), setNoteText(item.content) }}>
                                                        <div className={`flex flex-col justify-start items-start p-2 ${currentNote && currentNote.id_relatory === item.id_relatory ? 'bg-gradient-to-l from-green-700 to-green-600' : 'bg-zinc-200/70 hover:bg-zinc-200 dark:bg-zinc-800/30 dark:hover:bg-zinc-800/70 cursor-pointer'} rounded-md border duration-200`}>
                                                            <div className="flex items-center justify-between w-full">
                                                                <h3
                                                                    className={`font-semibold w-full text-left overflow-hidden whitespace-nowrap text-ellipsis text-lg truncate ${currentNote && currentNote.id_relatory === item.id_relatory ? 'text-zinc-100' : ''}`}>
                                                                    {item.title}
                                                                </h3>
                                                                <h3
                                                                    className={`font-semibold w-full text-right text-sm overflow-hidden whitespace-nowrap text-ellipsis truncate ${currentNote && currentNote.id_relatory === item.id_relatory ? 'text-zinc-100/90' : 'text-zinc-600 dark:text-zinc-400'}`}>
                                                                    {item.relatory_owner}
                                                                </h3>
                                                            </div>
                                                            <p
                                                                className={`text-sm w-full text-left overflow-hidden whitespace-nowrap text-ellipsis truncate ${currentNote?.id_relatory === item.id_relatory ? 'text-zinc-100' : 'text-muted-foreground'}`}>
                                                                {currentNote && currentNote.id_relatory === item.id_relatory ? "" : "Abra o documento para ver o conteúdo"}
                                                            </p>
                                                        </div>
                                                    </ContextMenuTrigger>
                                                    <ContextMenuContent className="p-0 border-0">
                                                        <EditAlert data={item} />
                                                        <ContextMenuItem
                                                            onClick={() => relatoryService.deleteRelatory(item.id_relatory)}
                                                            className="px-2 flex items-center justify-center gap-2 rounded-md rounded-t-none text-sm font-semibold bg-red-500/15 dark:bg-red-500/20 hover:bg-red-500/20 dark:hover:bg-red-500/30 border border-red-500/20 text-red-500 cursor-pointer duration-200"
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

                                <CreateForm bigButton={true} />
                            </div>
                    }
                </div>

                <div className={`md:w-[80%] bg-zinc-200/70 dark:bg-zinc-800/30 border rounded-md ${currentNote !== null as null | Note ? 'w-full' : 'hidden'}`}>
                    {
                        currentNote == null as null | Note ?
                            <div className="hidden md:flex w-full h-full justify-center py-60">
                                <h2 className="text-xl font-semibold">Selecione um relatório para visualizar</h2>
                            </div> : <div className="relative md:pl-3 py-0.5 h-[96vh] pb-10">

                                <div className={`absolute -top-[1px] ${!isEditing ? "right-[141px] md:right-36" : "right-[180px] md:right-[181px]"} w-4 h-4 bg-background z-10`}>
                                    <div className={`absolute top-0 right-0 w-4 h-4 bg-zinc-200/70 dark:bg-zinc-800/30 border-t border-r rounded-tr-md`}></div>
                                </div>

                                <div className={`absolute top-[14px] right-[0px] ${!isEditing ? "w-[142px] md:w-[145px]" : "w-[181px] md:w-[182px]"} h-5.5 bg-zinc-200/70 dark:bg-zinc-800/30 z-10`}>
                                    <div className={`absolute top-0 right-0 ${!isEditing ? "w-[142px] md:w-[145px] " : "w-[181px] md:w-[182px]"} h-5.5 bg-background border-l border-b rounded-bl-md`}></div>
                                </div>

                                <div className="absolute top-[35px] -right-[4.5px] w-5 h-4 bg-background z-10">
                                    <div className="absolute top-0 right-1 w-4 h-4 bg-zinc-200/70 dark:bg-zinc-800/30 border-t border-r rounded-tr-md"></div>
                                </div>

                                <Undo2 className="md:hidden absolute top-1 left-2 p-1 rounded-md hover:bg-zinc-800 text-green-600 hover:text-green-400 duration-200 cursor-pointer z-10" size={30} onClick={() => setCurrentNote(null as null | Note)} />

                                <div className="flex items-center justify-between w-full">
                                    <div></div>
                                    <div className="absolute -right-1 -top-1 flex items-center gap-2 bg-background py-1 px-3.5">
                                        <p className="font-semibold text-zinc-400 duration-200 z-10">Salvo</p>
                                        <div className="flex">
                                            <AlertDialog>
                                                <AlertDialogTrigger
                                                    className="p-1 flex items-center justify-center gap-2 rounded-md text-sm font-semibold hover:bg-zinc-800 text-green-600 hover:text-green-400 duration-200 cursor-pointer z-10"
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
                                                        <AlertDialogCancel className="font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-red-500/30 border border-zinc-500/30 dark:hover:border-red-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200">Cancelar</AlertDialogCancel>
                                                        <AlertDialogAction className="bg-red-800 hover:bg-red-700 cursor-pointer" onClick={() => currentNote && relatoryService.deleteRelatory(currentNote.id_relatory)}>Deletar</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {
                                                !isEditing ? <Pencil className="p-1 rounded-md hover:bg-zinc-800 text-green-600 hover:text-green-400 duration-200 cursor-pointer z-10" size={30} onClick={() => setIsEditing(true)} /> :
                                                    <div className="flex gap-2 z-10">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger>
                                                                <Info className="p-1 rounded-md hover:bg-zinc-800 text-green-600 hover:text-green-400 duration-200 cursor-pointer z-10" size={30} />
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
                                                        <Check className="p-1 rounded-md hover:bg-zinc-800 text-green-600 hover:text-green-400 duration-200 cursor-pointer" size={30} onClick={() => currentNote && editNote(currentNote.id_relatory)} />
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 h-full py-6">
                                    {isEditing ? (
                                        <RichTextEditor
                                            data={noteText ? JSON.parse(noteText) : undefined}
                                            onChange={(data) => setNoteText(JSON.stringify(data))}
                                        />
                                    ) : (
                                        <div dangerouslySetInnerHTML={{ __html: renderEditorJsContent(noteText) }} />
                                    )}
                                </div>
                            </div>
                    }
                </div>
            </div>
    );
}
