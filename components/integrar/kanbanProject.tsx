'use client'

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { ALargeSmall, ArchiveRestore, CalendarPlus, ChartPie, Check, ClipboardCheck, ClipboardClock, ClipboardList, Ellipsis, Loader2, LoaderCircle, MailSearch, MessageCircle, MessageCircleMore, Pencil, Plus, Trash2, TriangleAlert } from "lucide-react";
import { use, useState, useEffect } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/popover";
import { Button } from "../button";
import { RiFilter3Line, RiSearch2Line } from "@remixicon/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/table";
import { CircularProgress } from "../circularProgress";
import { Input } from "../input";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../alert-dialog";
import { useRouter, useParams } from "next/navigation";
import { DndContext, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
    SortableContext,
    useSortable,
    arrayMove,
    verticalListSortingStrategy,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CommentView } from "./projectKanban/commentView";
import { kanbanService } from "@/api/dashboard/kanban-service";
import axios from "axios";
import { routes } from "@/api/routes";
import { authService } from "@/api/auth-service";
import { teamService } from "@/api/dashboard/team-service";
import { register } from "module";
import { useForm } from "react-hook-form";
import { se } from "date-fns/locale";
import { Truculenta } from "next/font/google";

const ITEMS_PER_PAGE = 10;

interface KanbanComment {
    id: string;
    content: string;
    createdAt: string;
    // outros campos se necessário
}

interface KanbanTask {
    id_kanban: string;
    id_project: string;
    title: string;
    priority: number;
    description: string;
    status: string;
    comments: KanbanComment[] | null;
    createdBy: string;
    createdAt: string;
};

interface ListTaskRowProps {
    item: KanbanTask;
    selectedTask: string;
    setSelectedTask: (id: string) => void;
    listHeader: Array<{ id: number; name: string }>;
}

interface KanbanProjectProps {
    kanbanList: KanbanTask[];
    setKanbanList: React.Dispatch<React.SetStateAction<KanbanTask[]>>;
}

interface ProjectInfo {
    title: string;
    // Adicione outros campos conforme necessário
}

export function KanbanProject({ kanbanList, setKanbanList }: KanbanProjectProps) {
    const [filter, setFilter] = useState("kanban");
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTask, setSelectedTask] = useState<string>("0");
    const [selectedTaskData, setSelectedTaskData] = useState<KanbanTask | null>(null);
    const [projectInfo, setProjectInfo] = useState<ProjectInfo>({ title: "" });
    const [listHeader, setListHeader] = useState([
        { id: 1, name: "Título" },
        { id: 2, name: "Descrição" },
        { id: 3, name: "Prioridade" },
        { id: 4, name: "Status" },
        { id: 5, name: "Comentários" },
        { id: 6, name: "Criado em" }
    ]);
    const [debounce, setDebounce] = useState(false)
    const params = useParams();
    const router = useRouter();

    const { register, handleSubmit } = useForm<UpdateTaskForm>()

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor)
    );

    useEffect(() => {
        setLoading(false);
    }, [kanbanList]);

    function handleCreateTask() {
        console.log("taskID: " + window.location.href.split('/dashboard/project/')[1])
    }

    interface UpdateTaskForm {
        title: string;
        description: string;
        priority: string;
        status: string;
    }

    function handleUpdateTask(data: UpdateTaskForm) {
        console.log(data)
        console.log(selectedTaskData)

        kanbanService.updateTask(selectedTaskData, data);
    }

    function handleSelectTask(data: KanbanTask | null) {
        if (!data) {
            setSelectedTask("0");
            setSelectedTaskData(null);
            return;
        }
        setSelectedTask(data.id_kanban);
        setSelectedTaskData(data);
    }

    // Filtra as tarefas pelo título usando searchQuery
    const filteredKanbanList = kanbanList.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredKanbanList.length / ITEMS_PER_PAGE);
    const paginatedData = filteredKanbanList.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    function dragEndList(event: DragEndEvent) {
        if (!debounce) {
            if (!event.over) return;
            if (event.active.id == event.over.id) return;

            const lastID = event.active.id as string;
            const newID = event.over.id as string;

            setSelectedTask("0");

            setKanbanList((items) => {
                const lastIndex = items.findIndex((i) => i.id_kanban === lastID);
                const newIndex = items.findIndex((i) => i.id_kanban === newID);
                return arrayMove(items, lastIndex, newIndex);
            });

            setTimeout(() => {
                setDebounce(false);
            }, 5000);
        } else {
            console.warn("Você deve aguardar para fazer essa ação novamente")
        }
    };

    function dragEndKanban(event: DragEndEvent) {
        if (!debounce) {
            if (!event.over) return;
            if (event.active.id == event.over.id) return;

            const lastID = event.active.id as string;
            const newID = event.over.id as string;

            setDebounce(true);

            setKanbanList((items) => {
                const lastTask = items.find((i) => i.id_kanban === lastID);
                const newTask = items.find((i) => i.id_kanban === newID);

                const lastIndex = items.findIndex((i) => i.id_kanban === lastID);
                const newIndex = items.findIndex((i) => i.id_kanban === newID);

                setSelectedTask("0");

                const updateEmptyItems = items.map((item) => {
                    if (newID == "1050") {
                        if (item.id_kanban === lastID) {
                            kanbanService.updateTaskDragAndDrop(item, "Pendente");
                            return { ...item, status: "Pendente" };
                        }
                    } else if (newID == "1150") {
                        if (item.id_kanban === lastID) {
                            kanbanService.updateTaskDragAndDrop(item, "Em progresso");
                            return { ...item, status: "Em progresso" };
                        }
                    } else if (newID == "1250") {
                        if (item.id_kanban === lastID) {
                            kanbanService.updateTaskDragAndDrop(item, "Concluída");
                            return { ...item, status: "Concluída" };
                        }
                    }
                    return item;
                });

                if (newID == "1050" || newID == "1150" || newID == "1250") {
                    if (lastIndex === -1 || newIndex === -1) return updateEmptyItems;
                    return arrayMove(updateEmptyItems, lastIndex, newIndex);
                }

                if (!lastTask || !newTask) return items;

                const updatedItems = items.map((item) => {
                    if (item.id_kanban === lastID) {
                        return { ...item, status: newTask.status };
                    }
                    return item;
                });

                if (lastIndex === -1 || newIndex === -1) return updatedItems;
                return arrayMove(updatedItems, lastIndex, newIndex);
            });

            setTimeout(() => {
                setDebounce(false);
            }, 5000);
        } else {
            console.warn("Você deve aguardar para fazer essa ação novamente")
        }
    }

    function dragEndListHeader(event: DragEndEvent) {
        if (!event.over) return;
        if (event.active.id == event.over.id) return;

        const lastID = event.active.id as number;
        const newID = event.over.id as number;

        setListHeader((items) => {
            const lastIndex = items.findIndex((i) => i.id === lastID);
            const newIndex = items.findIndex((i) => i.id === newID);
            return arrayMove(items, lastIndex, newIndex);
        });
    }

    return (
        <div className="relative">
            <div className={`flex w-full items-center ${filter == "list" ? "justify-between" : "justify-end"}`}>
                {
                    filter == "list" ?
                        paginatedData.length > 0 ? <div className="relative">
                            <Input
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                                value={searchQuery}
                                placeholder="Pesquisar pelo nome"
                                className="peer min-w-40 ps-9 bg-background bg-gradient-to-br from-accent/60 to-accent"
                            />
                            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/60 peer-disabled:opacity-50">
                                <RiSearch2Line size={20} aria-hidden="true" />
                            </div>
                        </div> : "" : ""
                }
                <div className="flex gap-2 items-center">
                    {
                        selectedTask != "0" && (
                            <div className="flex gap-2">
                                <CommentView />

                                <AlertDialog>
                                    <AlertDialogTrigger
                                        className="p-2 flex items-center justify-center gap-2 rounded-md text-sm font-semibold bg-yellow-500/15 dark:bg-yellow-500/20 hover:bg-yellow-500/20 dark:hover:bg-yellow-500/30 border border-yellow-500/20 text-yellow-500 cursor-pointer"
                                    >
                                        <Pencil className="size-5" />
                                        <span className="hidden sm:block">Modificar tarefa</span>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Modificar tarefa</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Aqui você pode modificar suas tarefas.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>

                                        <form onSubmit={handleSubmit(handleUpdateTask)}>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <p className="flex items-center gap-2 dark:text-zinc-200/80"><ALargeSmall size={20} />Nome</p>
                                                    <Input
                                                        placeholder="Digite aqui"
                                                        className="mb-2"
                                                        defaultValue={selectedTaskData?.title}
                                                        {...register("title")}
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <p className="flex items-center gap-2 dark:text-zinc-200/80"><MessageCircle size={20} />Descrição</p>
                                                    <Input
                                                        placeholder="Digite aqui"
                                                        className="mb-2"
                                                        defaultValue={selectedTaskData?.description}
                                                        {...register("description")}
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <p className="flex items-center gap-2 dark:text-zinc-200/80"><TriangleAlert size={20} />Prioridade</p>
                                                    <select
                                                        className="mb-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none"
                                                        defaultValue={selectedTaskData?.priority}
                                                        {...register("priority")}
                                                    >
                                                        <option value="" disabled>Selecione a prioridade</option>
                                                        <option value="0">Baixa</option>
                                                        <option value="1">Média</option>
                                                        <option value="2">Alta</option>
                                                    </select>
                                                </div>

                                                <div className="space-y-2">
                                                    <p className="flex items-center gap-2 dark:text-zinc-200/80"><TriangleAlert size={20} />Status</p>
                                                    <select
                                                        className="mb-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none"
                                                        defaultValue={selectedTaskData?.status}
                                                        {...register("status")}
                                                    >
                                                        <option value="" disabled>Selecione a prioridade</option>
                                                        <option value="Pendente">Pendente</option>
                                                        <option value="Em progresso">Em progresso</option>
                                                        <option value="Concluída">Concluída</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <AlertDialogFooter className="mt-6">
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction
                                                    type="submit"
                                                    className="font-semibold bg-green-500/15 dark:bg-green-500/20 hover:bg-green-500/20 dark:hover:bg-green-500/30 border border-green-500/20 text-green-500 cursor-pointer"
                                                >
                                                    Confirmar
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </form>
                                    </AlertDialogContent>
                                </AlertDialog>

                                <AlertDialog>
                                    <AlertDialogTrigger
                                        className="p-2 flex items-center justify-center gap-2 rounded-md text-sm font-semibold bg-red-500/15 dark:bg-red-500/20 hover:bg-red-500/20 dark:hover:bg-red-500/30 border border-red-500/20 text-red-500 cursor-pointer"
                                    >
                                        <Trash2 className="size-5" />
                                        <span className="hidden sm:block">Deletar</span>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Confirmar</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Você tem certeza de que deseja deletar essa tarefa?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction className="bg-red-800 hover:bg-red-700" onClick={() => kanbanService.deleteTask(selectedTask)}>Deletar tarefa</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        )
                    }
                    {
                        paginatedData.length > 0 && (<Popover >
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="cursor-pointer">
                                    <RiFilter3Line
                                        className="size-5 -ms-1.5 text-muted-foreground/60"
                                        size={20}
                                        aria-hidden="true"
                                    />
                                    <span className="hidden sm:block">Exibição  </span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto min-w-36 p-0" align="end">
                                <div className="space-y-1">
                                    <div className="text-xs px-3 pt-3 font-medium uppercase text-muted-foreground/60">
                                        Exibição
                                    </div>
                                    <div className="space-y-1 px-1 pb-1">
                                        <button className={`px-2 py-1 bg-zinc-200/0 w-full text-left ${filter == "kanban" ? "bg-zinc-400/5" : "hover:bg-zinc-200/5 cursor-pointer"} rounded-md duration-200`} onClick={() => setFilter("kanban")}>Kanban</button>
                                        <button className={`px-2 py-1 bg-zinc-200/0 w-full text-left ${filter == "list" ? "bg-zinc-400/5" : "hover:bg-zinc-200/5 cursor-pointer"} rounded-md duration-200`} onClick={() => setFilter("list")}>Lista</button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>)
                    }
                </div>
            </div>
            {
                loading ?
                    <div className="flex justify-center mt-50">
                        <Loader2 className="animate-spin" />
                    </div>
                    : filter == "kanban" ?
                        paginatedData.length > 0 ? <div className="flex flex-col md:flex-row items-start gap-4 mt-4">
                            <DndContext
                                onDragEnd={dragEndKanban}
                                sensors={sensors}
                                collisionDetection={closestCenter}
                            >
                                <SortableContext
                                    items={kanbanList.map(task => task.id_kanban)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="duration-200 w-full bg-zinc-200/40 dark:bg-zinc-800/30 dark:border dark:border-zinc-700/20 rounded-xl p-4 space-y-4">
                                        <div className="flex flex-col items-center gap-2 text-lg font-semibold">
                                            <div className="flex items-center w-full gap-1.5">
                                                <div className="h-3 w-3 bg-purple-700/80 dark:bg-purple-800 rounded-full"></div>
                                                <h1>A fazer</h1>
                                                <div className="text-sm h-5 w-5 flex items-center justify-center bg-zinc-400/40 dark:bg-zinc-700/70 text-zinc-800 dark:text-zinc-200/70 rounded-full">{kanbanList.filter(task => task.status === "Pendente").length}</div>
                                            </div>
                                            <div className="w-full h-1 bg-purple-700/80 dark:bg-purple-800 rounded-full"></div>
                                        </div>

                                        <div className="flex flex-col items-center gap-3">
                                            {
                                                kanbanList.filter(task => task.status === "Pendente").length === 0 ?
                                                    <KanbanEmptyState taskID={1050} />
                                                    :
                                                    kanbanList.filter(task => task.status === "Pendente").map(task => (
                                                        <KanbanTaskView
                                                            key={task.id_kanban}
                                                            item={task}
                                                            selectedTask={selectedTask}
                                                            setSelectedTask={setSelectedTask}
                                                            listHeader={listHeader}
                                                            handleSelectTask={handleSelectTask}
                                                        />
                                                    ))
                                            }
                                        </div>
                                    </div>
                                </SortableContext>

                                <SortableContext
                                    items={kanbanList.map(task => task.id_kanban)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="duration-200 w-full bg-zinc-200/40 dark:bg-zinc-800/30 dark:border dark:border-zinc-700/20 rounded-xl p-4 space-y-4">
                                        <div className="flex flex-col items-center gap-2 text-lg font-semibold">
                                            <div className="flex items-center w-full gap-1.5">
                                                <div className="h-3 w-3 bg-yellow-400/80 rounded-full"></div>
                                                <h1>Em progresso</h1>
                                                <div className="text-sm h-5 w-5 flex items-center justify-center bg-zinc-400/40 dark:bg-zinc-700/70 text-zinc-800 dark:text-zinc-200/70 rounded-full">{kanbanList.filter(task => task.status === "Em progresso").length}</div>
                                            </div>
                                            <div className="w-full h-1 bg-yellow-400/80 rounded-full"></div>
                                        </div>

                                        <div className="flex flex-col items-center gap-3">
                                            {
                                                kanbanList.filter(task => task.status === "Em progresso").length === 0 ?
                                                    <KanbanEmptyState taskID={1150} />
                                                    :
                                                    kanbanList.filter(task => task.status === "Em progresso").map(task => (
                                                        <KanbanTaskView
                                                            key={task.id_kanban}
                                                            item={task}
                                                            selectedTask={selectedTask}
                                                            setSelectedTask={setSelectedTask}
                                                            listHeader={listHeader}
                                                            handleSelectTask={handleSelectTask}
                                                        />
                                                    ))
                                            }
                                        </div>
                                    </div>
                                </SortableContext>

                                <SortableContext
                                    items={kanbanList.map(task => task.id_kanban)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="duration-200 w-full bg-zinc-200/40 dark:bg-zinc-800/30 dark:border dark:border-zinc-700/20 rounded-xl p-4 space-y-4">
                                        <div className="flex flex-col items-center gap-2 text-lg font-semibold">
                                            <div className="flex items-center w-full gap-1.5">
                                                <div className="h-3 w-3 bg-green-600/80 rounded-full"></div>
                                                <h1>Concluído</h1>
                                                <div className="text-sm h-5 w-5 flex items-center justify-center bg-zinc-400/40 dark:bg-zinc-700/70 text-zinc-800 dark:text-zinc-200/70 rounded-full">{kanbanList.filter(task => task.status === "Concluída").length}</div>
                                            </div>
                                            <div className="w-full h-1 bg-green-600/80 rounded-full"></div>
                                        </div>
                                        <div className="flex flex-col items-center gap-3">
                                            {
                                                kanbanList.filter(task => task.status === "Concluída").length === 0 ?
                                                    <KanbanEmptyState taskID={1250} />
                                                    :
                                                    kanbanList.filter(task => task.status === "Concluída").map(task => (
                                                        <KanbanTaskView
                                                            key={task.id_kanban}
                                                            item={task}
                                                            selectedTask={selectedTask}
                                                            setSelectedTask={setSelectedTask}
                                                            listHeader={listHeader}
                                                            handleSelectTask={handleSelectTask}
                                                        />
                                                    ))
                                            }
                                        </div>
                                    </div>
                                </SortableContext>
                            </DndContext>
                        </div > : <div className="w-full flex items-center justify-center mt-10 font-semibold">
                            Não foi encontrado nenhum kanban neste projeto.
                        </div> :
                        filter == "list" ?
                            <div className="mt-4">
                                <DndContext
                                    onDragEnd={dragEndList}
                                    sensors={sensors}
                                >
                                    <SortableContext
                                        items={paginatedData.map(task => task.id_kanban)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        <div className="overflow-x-auto">
                                            <Table className="min-w-[1510px] table-fixed border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b">
                                                <TableHeader>
                                                    <DndContext
                                                        onDragEnd={dragEndListHeader}
                                                        sensors={sensors}
                                                    >
                                                        <TableRow className="hover:bg-transparent">
                                                            <SortableContext
                                                                items={listHeader.map(task => task.id)}
                                                                strategy={verticalListSortingStrategy}
                                                            >
                                                                {loading ? null : paginatedData.length > 0 ? listHeader.map(item => (
                                                                    <ListHeader
                                                                        key={item.id}
                                                                        taskID={item.id}
                                                                        name={item.name}
                                                                    />
                                                                )) : ""}
                                                            </SortableContext>
                                                        </TableRow>
                                                    </DndContext>
                                                </TableHeader>
                                                <TableBody>
                                                    {loading ? null : paginatedData.length > 0 ? (
                                                        paginatedData.map(item => (
                                                            <ListTaskRow
                                                                key={item.id_kanban}
                                                                item={item}
                                                                selectedTask={selectedTask}
                                                                setSelectedTask={setSelectedTask}
                                                                listHeader={listHeader}
                                                                handleSelectTask={handleSelectTask}
                                                            />
                                                        ))
                                                    ) : ""}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </SortableContext>
                                </DndContext>

                                {
                                    loading ? <div className="w-full flex justify-center items-center mt-5">
                                        <p className="text-center text-zinc-500 font-semibold dark:text-zinc-400">Carregando...</p>
                                    </div> : kanbanList.length > 0 ?
                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
                                            <p
                                                className="flex-1 whitespace-nowrap text-sm text-muted-foreground"
                                                aria-live="polite"
                                            >
                                                Página{" "}
                                                <span className="text-foreground">{currentPage}</span> de{" "}
                                                <span className="text-foreground">{totalPages}</span>
                                            </p>
                                            <div className="flex gap-3">
                                                <Button
                                                    variant="outline"
                                                    disabled={currentPage === 1}
                                                    aria-label="Página anterior"
                                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                                    className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                                                >
                                                    Anterior
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    disabled={currentPage === totalPages}
                                                    aria-label="Próxima página"
                                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                                    className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                                                >
                                                    Próxima
                                                </Button>
                                            </div>
                                        </div> : <div className="w-full flex justify-center items-center mt-5">
                                            <p className="text-center font-semibold">Nenhum projeto encontrado</p>
                                        </div>
                                }
                            </div> :
                            ""
            }
        </div >
    );
}

function ListTaskRow({ item, selectedTask, setSelectedTask, listHeader, handleSelectTask }: ListTaskRowProps & { handleSelectTask: (data: KanbanTask | null) => void }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: item.id_kanban });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    function TitleCollumn() {
        return (
            <TableCell className="flex gap-2 py-[17px]">
                <button
                    className={`z-20 border rounded-sm ${selectedTask === item.id_kanban ? "bg-green-400 dark:bg-green-600 p-[3px]" : "w-5.5"}`}
                    tabIndex={0}
                    role="button"
                    onMouseDown={e => e.stopPropagation()}
                    onClick={() => {
                        if (selectedTask === item.id_kanban) handleSelectTask(null);
                        else handleSelectTask(item);
                    }}
                >
                    <Check className={`${selectedTask === item.id_kanban ? "block" : "hidden"}`} size={12} />
                </button>
                <p className="w-full overflow-hidden whitespace-nowrap text-ellipsis font-semibold">{item.title}</p>
            </TableCell>
        )
    }

    function DescriptionCollumn() {
        return (
            <TableCell>
                <p className="overflow-hidden whitespace-nowrap text-ellipsis">{item.description}</p>
            </TableCell>
        )
    }

    function PriorityCollumn() {
        return (
            <TableCell>
                {item.priority === 0 ? (
                    <div className="flex items-center gap-2 relative">
                        <div className="relative flex h-2 w-2">
                            <div className="absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75 animate-ping"></div>
                            <div className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></div>
                        </div>
                        <span className="text-red-500 overflow-hidden whitespace-nowrap text-ellipsis">Alta</span>
                    </div>
                ) : item.priority === 1 ? (
                    <div className="flex items-center gap-2 relative">
                        <div className="relative flex h-2 w-2">
                            <div className="absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75 animate-ping"></div>
                            <div className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></div>
                        </div>
                        <span className="text-yellow-500 overflow-hidden whitespace-nowrap text-ellipsis">Média</span>
                    </div>
                ) : item.priority === 2 ? (
                    <div className="flex items-center gap-2 relative">
                        <div className="relative flex h-2 w-2">
                            <div className="absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75 animate-ping"></div>
                            <div className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></div>
                        </div>
                        <span className="text-green-500 overflow-hidden whitespace-nowrap text-ellipsis">Baixa</span>
                    </div>
                ) : (
                    <span>{item.priority}</span>
                )}
            </TableCell>
        )
    }

    function StatusCollumn() {
        return (
            <TableCell>
                {item.status === "Pendente" ? (
                    <div className="flex items-center gap-2 relative">
                        <div className="relative flex h-2 w-2">
                            <div className="absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75 animate-ping"></div>
                            <div className="relative inline-flex rounded-full h-2 w-2 bg-purple-400"></div>
                        </div>
                        <span className="text-purple-400 overflow-hidden whitespace-nowrap text-ellipsis">A fazer</span>
                    </div>
                ) : item.status === "Em progresso" ? (
                    <div className="flex items-center gap-2 relative">
                        <div className="relative flex h-2 w-2">
                            <div className="absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75 animate-ping"></div>
                            <div className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></div>
                        </div>
                        <span className="text-yellow-400 overflow-hidden whitespace-nowrap text-ellipsis">Em progresso</span>
                    </div>
                ) : item.status === "Concluída" ? (
                    <div className="flex items-center gap-2 relative">
                        <div className="relative flex h-2 w-2">
                            <div className="absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75 animate-ping"></div>
                            <div className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></div>
                        </div>
                        <span className="text-green-500 overflow-hidden whitespace-nowrap text-ellipsis">Concluído</span>
                    </div>
                ) : (
                    <span className="overflow-hidden whitespace-nowrap text-ellipsis">{item.status}</span>
                )}
            </TableCell>
        )
    }

    function CommentsCollumn() {
        return (
            <TableCell>
                <p>{item.comments == null || item.comments.length == 0 ? "Sem comentários" : item.comments + " Comentários"}</p>
            </TableCell>
        )
    }

    function CreatedCollumn() {
        return (
            <TableCell>
                <p className="overflow-hidden whitespace-nowrap text-ellipsis">{item.createdAt.toLocaleString().slice(8, 10) + "/" + item.createdAt.toLocaleString().slice(5, 7) + "/" + item.createdAt.toLocaleString().slice(0, 4) + " às " + item.createdAt.toLocaleString().slice(11, 16)}</p>
            </TableCell>
        )
    }

    return (
        <TableRow
            key={item.id_kanban}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="border-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg h-px hover:bg-accent/50"
        >
            {
                listHeader.map(header => {
                    switch (header.name) {
                        case "Título":
                            return <TitleCollumn key={header.id} />
                        case "Descrição":
                            return <DescriptionCollumn key={header.id} />
                        case "Prioridade":
                            return <PriorityCollumn key={header.id} />
                        case "Status":
                            return <StatusCollumn key={header.id} />
                        case "Comentários":
                            return <CommentsCollumn key={header.id} />
                        case "Criado em":
                            return <CreatedCollumn key={header.id} />
                        default:
                            return null;
                    }
                })
            }
        </TableRow>
    );
}

function ListHeader({ taskID, name }: { taskID: number; name: string }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: taskID });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <TableHead
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`relative h-9 ${name == "Descrição" ? "w-105" : name == "Status" ? "w-25" : name == "Prioridade" ? "w-25" : name == "Comentários" ? "w-28" : name == "Criado em" ? "w-35" : "w-40"} select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg`}
        >
            <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500">
                {
                    name == "Título" ? <ALargeSmall size={18} /> : name == "Descrição" ? <ClipboardList size={18} /> : name == "Prioridade" ? <TriangleAlert size={18} /> : name == "Status" ? <ChartPie size={18} /> : name == "Comentários" ? <MessageCircleMore size={18} /> : name == "Criado em" ? <CalendarPlus size={18} /> : null
                }
                {name}
            </p>
        </TableHead>
    );
}

function KanbanTaskView({ item, selectedTask, setSelectedTask, listHeader, handleSelectTask }: ListTaskRowProps & { handleSelectTask: (data: KanbanTask | null) => void }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: item.id_kanban });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.9 : 1,
        boxShadow: isDragging
            ? "0px 12px 25px rgba(0,0,0,0.25)"
            : "none",
    };

    return (
        <div
            key={item.id_kanban}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="select-none w-full p-2 bg-zinc-50 border dark:bg-zinc-900/60 dark:border-zinc-700/40 rounded-lg">
            <div className="flex justify-between">
                <div className="flex flex-col items-start w-full">
                    <span className={`text-sm font-medium p-1 ${item.status === "Concluída" ? "text-green-500/70 border border-green-400/10 dark:border-green-500/10 bg-green-200/40 dark:bg-green-600/20 rounded-sm" : item.priority === 2 ? "text-red-500/70 border border-red-400/10 dark:border-red-500/15 bg-red-200/40 dark:bg-red-600/20 rounded-sm" : item.priority === 1 ? "text-yellow-500/70 border border-yellow-400/10 dark:border-yellow-500/10 bg-yellow-200/20 dark:bg-yellow-600/20 rounded-sm" : "text-green-500/70 border border-green-400/10 dark:border-green-500/10 bg-green-200/40 dark:bg-green-600/20 rounded-sm"}`}>
                        {
                            item.status === "Concluída" ? "Concluído" : item.priority === 2 ? "Alta" : item.priority === 1 ? "Média" : "Baixa"
                        }
                    </span>
                    <h1 className="text-xl font-semibold mt-1">{item.title}</h1>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Ellipsis className="p-1 rounded-md hover:bg-zinc-200/50 dark:hover:bg-zinc-800 duration-200 cursor-pointer" size={30} />                                        </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-zinc-200 dark:bg-zinc-800 border rounded-lg p-1">
                        <DropdownMenuLabel className="flex items-center justify-center gap-2">
                            <button
                                className="z-20 hover:bg-zinc-900/40 py-2 px-4 font-semibold dark:font-normal duration-200 rounded-md w-full"
                                tabIndex={0}
                                role="button"
                                onMouseDown={e => e.stopPropagation()}
                                onClick={() => {
                                    if (selectedTask === item.id_kanban) handleSelectTask(null);
                                    else handleSelectTask(item);
                                }}
                            >
                                Selecionar tarefa
                            </button>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="flex flex-col space-y-1">

                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <p className="text-sm text-muted-foreground">{item.description}</p>
            <div className="flex flex-col gap-1 2xl:gap-0 2xl:flex-row 2xl:items-center justify-between mt-1.5">
                <div className="text-muted-foreground 2xl:w-[80%]">
                    Criador: <span className="font-semibold text-zinc-950/90 dark:text-zinc-200/90">{item.createdBy}</span>
                </div>
                <div className="flex items-center gap-1 2xl:w-[40%] text-muted-foreground">
                    <MessageCircleMore size={18} />
                    <p className="text-sm"><span className="font-semibold text-zinc-950/90 dark:text-zinc-200/90">{item.comments ? item.comments.length : 0}</span> comentários</p>
                </div>
            </div>
        </div>
    )
}

function KanbanEmptyState({ taskID }: { taskID: number }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: taskID });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="w-full h-20 flex items-center justify-center"
        >

        </div>
    );
}
