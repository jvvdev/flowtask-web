import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/alert-dialog";
import { Button } from "@/components/button";
import { ArchiveRestore, BookAlert, Check, ChevronDown, ChevronUp, SendHorizonal, X } from "lucide-react";
import { useState } from "react";

export function CommentView() {
    const [data, setData] = useState([
        {
            id: 1,
            author: "José Belmiro",
            content: "Esta é uma tarefa de exemplo.",
            createdAt: new Date(),
        },
        {
            id: 2,
            author: "Josiane Soraia",
            content: "Essa tarefa é boa em",
            createdAt: new Date(),
        },
        {
            id: 3,
            author: "Carlos Eduardo",
            content: "Podemos revisar o prazo dessa tarefa?",
            createdAt: new Date(),
        },
        {
            id: 4,
            author: "Mariana Silva",
            content: "Ótimo trabalho até agora!",
            createdAt: new Date(),
        },
        {
            id: 5,
            author: "Lucas Pereira",
            content: "Fiquei com dúvida na etapa 2.",
            createdAt: new Date(),
        },
        {
            id: 6,
            author: "Fernanda Souza",
            content: "A documentação está atualizada?",
            createdAt: new Date(),
        },
        {
            id: 7,
            author: "Rafael Costa",
            content: "Posso ajudar com os testes.",
            createdAt: new Date(),
        },
        {
            id: 8,
            author: "Ana Paula",
            content: "Precisamos alinhar com o cliente.",
            createdAt: new Date(),
        },
        {
            id: 9,
            author: "Bruno Oliveira",
            content: "Encontrei um bug na tela inicial.",
            createdAt: new Date(),
        },
        {
            id: 10,
            author: "Juliana Martins",
            content: "Sugiro adicionar mais exemplos.",
            createdAt: new Date(),
        },
        {
            id: 11,
            author: "Felipe Ramos",
            content: "A tarefa está quase pronta.",
            createdAt: new Date(),
        },
        {
            id: 12,
            author: "Patrícia Lima",
            content: "O design ficou excelente!",
            createdAt: new Date(),
        },
        {
            id: 13,
            author: "Gabriel Almeida",
            content: "Faltam só os ajustes finais.",
            createdAt: new Date(),
        },
        {
            id: 14,
            author: "Camila Rocha",
            content: "Já enviei o relatório.",
            createdAt: new Date(),
        },
        {
            id: 15,
            author: "Rodrigo Santos",
            content: "Qual o status da revisão?",
            createdAt: new Date(),
        },
        {
            id: 16,
            author: "Larissa Melo",
            content: "Podemos marcar uma call amanhã?",
            createdAt: new Date(),
        },
        {
            id: 17,
            author: "Vinícius Teixeira",
            content: "Acho que podemos otimizar esse código.",
            createdAt: new Date(),
        },
        {
            id: 18,
            author: "Isabela Duarte",
            content: "O cliente aprovou a proposta.",
            createdAt: new Date(),
        },
        {
            id: 19,
            author: "Thiago Moreira",
            content: "Fiz um commit com as correções.",
            createdAt: new Date(),
        },
        {
            id: 20,
            author: "Renata Carvalho",
            content: "A tarefa está bloqueada por dependências.",
            createdAt: new Date(),
        },
        {
            id: 21,
            author: "Eduardo Nunes",
            content: "Podemos liberar para produção?",
            createdAt: new Date(),
        },
        {
            id: 22,
            author: "Sabrina Torres",
            content: "A reunião foi reagendada.",
            createdAt: new Date(),
        }
    ]);

    return (
        <AlertDialog>
            <AlertDialogTrigger
                className="px-2 flex items-center justify-center gap-2 rounded-md text-sm font-semibold bg-green-500/15 dark:bg-green-500/20 hover:bg-green-500/20 dark:hover:bg-green-500/30 border border-green-500/20 text-green-500 cursor-pointer"
            >
                <ArchiveRestore className="size-5" />
                <span className="hidden sm:block">Abrir tarefa</span>
            </AlertDialogTrigger>
            <AlertDialogContent className="p-4 gap-2 sm:max-w-130">
                <AlertDialogHeader className="hidden">asd</AlertDialogHeader>
                <div className="flex justify-between items-center border-b pb-3">
                    <div className="flex gap-2">
                        <Button variant="outline" className="w-8 h-8">
                            <ChevronUp />
                        </Button>
                        <Button variant="outline" className="w-8 h-8">
                            <ChevronDown />
                        </Button>
                    </div>
                    <AlertDialogCancel className="w-8 h-8"><X /></AlertDialogCancel>
                </div>

                <div>
                    <div className="space-y-1">
                        <h1 className="text-xl font-semibold">Tarefa tal</h1>
                        <p className="text-muted-foreground">Descrição da tarefa tal</p>
                    </div>

                    <div className="mt-4 space-y-2 text-muted-foreground/80 font-semibold">
                        <div className="flex items-center">
                            <p className="w-40 font-normal">Criado por</p>
                            <span className="font-semibold">José Belmiro</span>
                        </div>
                        <div className="flex items-center">
                            <p className="w-40">Status</p>
                            <span className={`flex items-center gap-0.5 text-sm font-medium p-1 text-green-500/70 border border-green-400/10 dark:border-green-500/10 bg-green-200/40 dark:bg-green-600/20 rounded-sm`}>
                                <Check size={16} /> Concluído
                            </span>
                        </div>
                        <div className="flex items-center">
                            <p className="w-40">Dificuldade</p>
                            <span className={`flex items-center gap-1 text-sm font-medium p-1 text-red-500/70 border border-red-400/10 dark:border-red-500/10 bg-red-200/40 dark:bg-red-600/20 rounded-sm`}>
                                <BookAlert size={16} /> Alta
                            </span>
                        </div>
                        <div className="flex items-center border-b pb-3">
                            <p className="w-40 font-normal">Data de criação</p>
                            <span className="font-semibold">12/12/2025</span>
                        </div>
                    </div>

                    <div className="mt-3">
                        <h1 className="text-lg font-semibold">Comentários</h1>
                        <div className="mt-2 flex gap-2">
                            <img src="https://i.pravatar.cc/150?img=15" alt="" className="h-8 w-8 rounded-full"/>
                            <input type="text" placeholder="Escreva um comentário..." className="w-full px-2 border rounded-md placeholder:text-sm outline-none"/>
                            <Button variant="default" className="h-8 w-9 cursor-pointer">
                                <SendHorizonal />
                            </Button>
                        </div>

                        <div>
                            
                        </div>
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}