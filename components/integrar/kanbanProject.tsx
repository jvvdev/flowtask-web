import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Ellipsis, MessageCircleMore } from "lucide-react";
import { Button } from "../button";

const kanbanList = [
    {
        id: 1,
        title: "Planejar Sprint",
        priority: "high",
        description: "Definir objetivos e tarefas para a próxima sprint.",
        status: "to do",
        comments: [],
        createdAt: new Date()
    },
    {
        id: 2,
        title: "Reunião com cliente",
        priority: "medium",
        description: "Agendar e realizar reunião de alinhamento de requisitos.",
        status: "in progress",
        comments: [],
        createdAt: new Date()
    },
    {
        id: 3,
        title: "Deploy em produção",
        priority: "low",
        description: "Publicar nova versão do sistema no ambiente de produção.",
        status: "done",
        comments: [],
        createdAt: new Date()
    },
    {
        id: 4,
        title: "Revisar Pull Requests",
        priority: "medium",
        description: "Analisar e aprovar PRs pendentes no repositório.",
        status: "to do",
        comments: [],
        createdAt: new Date()
    },
    {
        id: 5,
        title: "Implementar autenticação",
        priority: "high",
        description: "Adicionar login e registro de usuários usando OAuth.",
        status: "in progress",
        comments: [],
        createdAt: new Date()
    },
    {
        id: 6,
        title: "Documentar API",
        priority: "medium",
        description: "Atualizar documentação da API REST no Swagger.",
        status: "done",
        comments: [],
        createdAt: new Date()
    },
    {
        id: 7,
        title: "Testes automatizados",
        priority: "low",
        description: "Criar testes unitários para os principais módulos.",
        status: "to do",
        comments: [],
        createdAt: new Date()
    },
    {
        id: 8,
        title: "Ajustar layout mobile",
        priority: "low",
        description: "Corrigir responsividade das telas no mobile.",
        status: "in progress",
        comments: [],
        createdAt: new Date()
    },
    {
        id: 9,
        title: "Corrigir bug de login",
        priority: "high",
        description: "Resolver erro que impede usuários de acessar o sistema.",
        status: "done",
        comments: [],
        createdAt: new Date()
    },
    {
        id: 10,
        title: "Configurar CI/CD",
        priority: "high",
        description: "Automatizar deploy com pipeline no GitHub Actions.",
        status: "to do",
        comments: [],
        createdAt: new Date()
    },
    {
        id: 11,
        title: "Atualizar dependências",
        priority: "medium",
        description: "Verificar e atualizar pacotes npm desatualizados.",
        status: "in progress",
        comments: [],
        createdAt: new Date()
    },
    {
        id: 13,
        title: "Configurar CI/CD",
        priority: "high",
        description: "Automatizar deploy com pipeline no GitHub Actions.",
        status: "to do",
        comments: [],
        createdAt: new Date()
    },

]

export function KanbanProject() {
    return (
        <div className="flex items-start gap-4">
            <div className="w-full bg-zinc-200/50 rounded-xl p-4 space-y-4">
                <div className="flex flex-col items-center gap-2 text-lg font-semibold">
                    <div className="flex items-center w-full gap-1.5">
                        <div className="h-3 w-3 bg-purple-700/80 rounded-full"></div>
                        <h1>A fazer</h1>
                        <div className="text-sm h-5 w-5 flex items-center justify-center bg-zinc-400/40 text-zinc-800 rounded-full">{kanbanList.filter(task => task.status === "to do").length}</div>
                    </div>
                    <div className="w-full h-1 bg-purple-700/80 rounded-full"></div>
                </div>

                <div className="flex flex-col items-center gap-3">
                    {
                        kanbanList.filter(task => task.status === "to do").map(task => (
                            <div key={task.id} className="w-full p-2 bg-zinc-50 rounded-lg">
                                <div className="flex justify-between">
                                    <div className="flex flex-col items-start w-full">
                                        <span className={`text-sm font-medium p-1 ${task.priority === "high" ? "text-red-500 border border-red-400/10 bg-red-200/40 rounded-sm" : task.priority === "medium" ? "text-yellow-500 border border-yellow-400/10 bg-yellow-200/20 rounded-sm" : "text-green-500 border border-green-400/10 bg-green-200/30 rounded-sm"}`}>
                                            {
                                                task.priority == "high" ? "Alta" : task.priority == "medium" ? "Média" : "Baixa"
                                            }
                                        </span>
                                        <h1 className="text-xl font-semibold">{task.title}</h1>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Ellipsis className="p-1 rounded-md hover:bg-zinc-200/50 duration-200 cursor-pointer" size={30} />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel className="flex items-center justify-center gap-2">

                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <div className="flex flex-col space-y-1">

                                            </div>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1.5">{task.description}</p>
                                <div className="flex items-center justify-between mt-1.5">
                                    <div className="bg-muted flex items-center rounded-full p-0.5">
                                        <div className="flex -space-x-3">
                                            <p className="ring-muted bg-zinc-200 py-1 px-1.5 rounded-full ring-2">AA</p>
                                            <p className="ring-muted bg-zinc-200 py-1 px-1.5 rounded-full ring-2">AB</p>
                                        </div>
                                        <Button
                                            variant="secondary"
                                            className="text-muted-foreground hover:text-foreground flex items-center justify-center rounded-full bg-transparent px-3 text-xs shadow-none hover:bg-transparent"
                                        >
                                            +3
                                        </Button>
                                    </div>
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <MessageCircleMore size={18} />
                                        <span className="text-sm">{task.comments.length} comentários</span>
                                    </div>
                                </div>
                            </div>
                        ))

                    }
                </div>
            </div>

            <div className="w-full bg-zinc-200/50 rounded-xl p-4 space-y-4">
                <div className="flex flex-col items-center gap-2 text-lg font-semibold">
                    <div className="flex items-center w-full gap-1.5">
                        <div className="h-3 w-3 bg-yellow-400/80 rounded-full"></div>
                        <h1>Em progresso</h1>
                        <div className="text-sm h-5 w-5 flex items-center justify-center bg-zinc-400/40 text-zinc-800 rounded-full">{kanbanList.filter(task => task.status === "in progress").length}</div>
                    </div>
                    <div className="w-full h-1 bg-yellow-400/80 rounded-full"></div>
                </div>

                <div className="flex flex-col items-center gap-3">
                    {
                        kanbanList.filter(task => task.status === "in progress").map(task => (
                            <div key={task.id} className="w-full p-2 bg-zinc-50 rounded-lg">
                                <div className="flex justify-between">
                                    <div className="flex flex-col items-start w-full">
                                        <span className={`text-sm font-medium p-1 ${task.priority === "high" ? "text-red-500 border border-red-400/10 bg-red-200/40 rounded-sm" : task.priority === "medium" ? "text-yellow-500 border border-yellow-400/10 bg-yellow-200/20 rounded-sm" : "text-green-500 border border-green-400/10 bg-green-200/30 rounded-sm"}`}>
                                            {
                                                task.priority == "high" ? "Alta" : task.priority == "medium" ? "Média" : "Baixa"
                                            }
                                        </span>
                                        <h1 className="text-xl font-semibold">{task.title}</h1>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Ellipsis className="p-1 rounded-md hover:bg-zinc-200/50 duration-200 cursor-pointer" size={30} />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel className="flex items-center justify-center gap-2">

                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <div className="flex flex-col space-y-1">

                                            </div>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1.5">{task.description}</p>
                                <div className="flex items-center justify-between mt-1.5">
                                    <div className="bg-muted flex items-center rounded-full p-0.5">
                                        <div className="flex -space-x-3">
                                            <p className="ring-muted bg-zinc-200 py-1 px-1.5 rounded-full ring-2">AA</p>
                                            <p className="ring-muted bg-zinc-200 py-1 px-1.5 rounded-full ring-2">AB</p>
                                        </div>
                                        <Button
                                            variant="secondary"
                                            className="text-muted-foreground hover:text-foreground flex items-center justify-center rounded-full bg-transparent px-3 text-xs shadow-none hover:bg-transparent"
                                        >
                                            +3
                                        </Button>
                                    </div>
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <MessageCircleMore size={18} />
                                        <span className="text-sm">{task.comments.length} comentários</span>
                                    </div>
                                </div>
                            </div>
                        ))

                    }
                </div>
            </div>

            <div className="w-full bg-zinc-200/50 rounded-xl p-4 space-y-4">
                <div className="flex flex-col items-center gap-2 text-lg font-semibold">
                    <div className="flex items-center w-full gap-1.5">
                        <div className="h-3 w-3 bg-green-600/80 rounded-full"></div>
                        <h1>Concluído</h1>
                        <div className="text-sm h-5 w-5 flex items-center justify-center bg-zinc-400/40 text-zinc-800 rounded-full">{kanbanList.filter(task => task.status === "done").length}</div>
                    </div>
                    <div className="w-full h-1 bg-green-600/80 rounded-full"></div>
                </div>

                <div className="flex flex-col items-center gap-3">
                    {
                        kanbanList.filter(task => task.status === "done").map(task => (
                            <div key={task.id} className="w-full p-2 bg-zinc-50 rounded-lg">
                                <div className="flex justify-between">
                                    <div className="flex flex-col items-start w-full">
                                        <span className={`text-sm font-medium p-1 text-green-500 border border-green-400/10 bg-green-200/30 rounded-sm`}>
                                            Pronta
                                        </span>
                                        <h1 className="text-xl font-semibold">{task.title}</h1>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Ellipsis className="p-1 rounded-md hover:bg-zinc-200/50 duration-200 cursor-pointer" size={30} />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel className="flex items-center justify-center gap-2">

                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <div className="flex flex-col space-y-1">

                                            </div>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1.5">{task.description}</p>
                                <div className="flex items-center justify-between mt-1.5">
                                    <div className="bg-muted flex items-center rounded-full p-0.5">
                                        <div className="flex -space-x-3">
                                            <p className="ring-muted bg-zinc-200 py-1 px-1.5 rounded-full ring-2">AA</p>
                                            <p className="ring-muted bg-zinc-200 py-1 px-1.5 rounded-full ring-2">AB</p>
                                        </div>
                                        <Button
                                            variant="secondary"
                                            className="text-muted-foreground hover:text-foreground flex items-center justify-center rounded-full bg-transparent px-3 text-xs shadow-none hover:bg-transparent"
                                        >
                                            +3
                                        </Button>
                                    </div>
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <MessageCircleMore size={18} />
                                        <span className="text-sm">{task.comments.length} comentários</span>
                                    </div>
                                </div>
                            </div>
                        ))

                    }
                </div>
            </div>
        </div>
    );
}
