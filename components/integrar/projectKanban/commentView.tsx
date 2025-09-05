import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/alert-dialog";
import { Button } from "@/components/button";
import { ArchiveRestore, BookAlert, Check, ChevronDown, ChevronUp, SendHorizonal, X } from "lucide-react";
import { useState } from "react";

export function CommentView() {
    const [data, setData] = useState([
        {
            id: 1,
            author: "José Belmiro",
            content: "Esta é uma tarefa de exemplo. Gostaria de ressaltar que o planejamento inicial foi seguido à risca, mas tivemos alguns desafios inesperados durante a execução. Recomendo revisarmos os pontos críticos antes de avançar para a próxima etapa.",
            createdAt: new Date(),
        },
        {
            id: 2,
            author: "Josiane Soraia",
            content: "Essa tarefa é boa em demonstrar como podemos integrar diferentes módulos do sistema. Achei interessante a abordagem utilizada, porém acredito que podemos melhorar a documentação para facilitar o entendimento dos novos membros da equipe.",
            createdAt: new Date(),
        },
        {
            id: 3,
            author: "Carlos Eduardo",
            content: "Podemos revisar o prazo dessa tarefa? Notei que algumas dependências externas podem atrasar a entrega. Seria interessante discutirmos alternativas para garantir que o cronograma geral do projeto não seja comprometido.",
            createdAt: new Date(),
        },
        {
            id: 4,
            author: "Mariana Silva",
            content: "Ótimo trabalho até agora! Fiquei impressionada com a qualidade do código e a organização dos arquivos. Apenas sugiro que façamos uma revisão final para garantir que todos os requisitos foram atendidos conforme solicitado pelo cliente.",
            createdAt: new Date(),
        },
        {
            id: 5,
            author: "Lucas Pereira",
            content: "Fiquei com dúvida na etapa 2, especialmente na parte de integração com o serviço externo. Alguém poderia explicar melhor como funciona o fluxo de autenticação? Acho que isso pode impactar diretamente na segurança do sistema.",
            createdAt: new Date(),
        },
        {
            id: 6,
            author: "Fernanda Souza",
            content: "A documentação está atualizada? Vi que algumas funções novas foram adicionadas recentemente e não encontrei informações sobre elas no manual do projeto. Seria importante mantermos tudo registrado para evitar confusões futuras.",
            createdAt: new Date(),
        },
        {
            id: 7,
            author: "Rafael Costa",
            content: "Posso ajudar com os testes. Tenho experiência em testes automatizados e acredito que podemos aumentar a cobertura dos casos de uso principais. Se alguém tiver sugestões de cenários específicos, por favor me envie.",
            createdAt: new Date(),
        },
        {
            id: 8,
            author: "Ana Paula",
            content: "Precisamos alinhar com o cliente sobre as mudanças recentes. Algumas funcionalidades foram alteradas e é fundamental garantir que estão de acordo com as expectativas. Sugiro agendarmos uma reunião para apresentar o progresso.",
            createdAt: new Date(),
        },
        {
            id: 9,
            author: "Bruno Oliveira",
            content: "Encontrei um bug na tela inicial ao tentar acessar o menu de configurações. O erro parece estar relacionado ao componente de navegação. Já estou investigando e pretendo enviar uma correção até o final do dia.",
            createdAt: new Date(),
        },
        {
            id: 10,
            author: "Juliana Martins",
            content: "Sugiro adicionar mais exemplos na documentação, principalmente para os métodos de integração. Isso pode ajudar bastante quem está começando no projeto e facilitar o onboarding de novos desenvolvedores.",
            createdAt: new Date(),
        },
        {
            id: 11,
            author: "Felipe Ramos",
            content: "A tarefa está quase pronta. Finalizei a implementação principal e agora estou revisando os detalhes finais. Se alguém puder revisar o código e apontar possíveis melhorias, ficarei agradecido.",
            createdAt: new Date(),
        },
        {
            id: 12,
            author: "Patrícia Lima",
            content: "O design ficou excelente! Parabéns a todos envolvidos. A interface está intuitiva e agradável, o que certamente vai melhorar a experiência dos usuários. Só recomendo ajustar o contraste de alguns botões.",
            createdAt: new Date(),
        },
        {
            id: 13,
            author: "Gabriel Almeida",
            content: "Faltam só os ajustes finais para concluirmos essa tarefa. Estou revisando os testes unitários e garantindo que todas as funcionalidades estejam cobertas. Assim que terminar, aviso por aqui.",
            createdAt: new Date(),
        },
        {
            id: 14,
            author: "Camila Rocha",
            content: "Já enviei o relatório de progresso para o gestor do projeto. Incluí todas as etapas realizadas, dificuldades encontradas e sugestões para as próximas fases. Caso alguém queira complementar, me avise.",
            createdAt: new Date(),
        },
        {
            id: 15,
            author: "Rodrigo Santos",
            content: "Qual o status da revisão? Vi que alguns comentários foram feitos no último commit, mas não ficou claro se todos os pontos foram resolvidos. Podemos marcar uma reunião rápida para alinhar?",
            createdAt: new Date(),
        },
        {
            id: 16,
            author: "Larissa Melo",
            content: "Podemos marcar uma call amanhã para discutir os próximos passos? Acho importante alinharmos as prioridades e definir quem ficará responsável por cada tarefa na próxima sprint.",
            createdAt: new Date(),
        },
        {
            id: 17,
            author: "Vinícius Teixeira",
            content: "Acho que podemos otimizar esse código, especialmente na função de busca. Vi que há algumas operações repetidas que podem ser simplificadas, melhorando a performance geral do sistema.",
            createdAt: new Date(),
        },
        {
            id: 18,
            author: "Isabela Duarte",
            content: "O cliente aprovou a proposta e está animado com os resultados apresentados até agora. Parabéns pelo empenho de todos! Agora precisamos focar na entrega dos últimos requisitos.",
            createdAt: new Date(),
        },
        {
            id: 19,
            author: "Thiago Moreira",
            content: "Fiz um commit com as correções solicitadas. Ajustei os pontos levantados na revisão e melhorei a estrutura dos arquivos para facilitar futuras manutenções. Por favor, revisem e me avisem se está tudo ok.",
            createdAt: new Date(),
        },
        {
            id: 20,
            author: "Renata Carvalho",
            content: "A tarefa está bloqueada por dependências de outro módulo que ainda não foi finalizado. Sugiro priorizarmos essa integração para evitar atrasos no cronograma geral do projeto.",
            createdAt: new Date(),
        },
        {
            id: 21,
            author: "Eduardo Nunes",
            content: "Podemos liberar para produção? Todos os testes passaram e o cliente já aprovou as funcionalidades. Só falta o ok final da equipe para seguirmos com o deploy.",
            createdAt: new Date(),
        },
        {
            id: 22,
            author: "Sabrina Torres",
            content: "A reunião foi reagendada para sexta-feira às 15h. Por favor, confirmem presença e preparem os tópicos que desejam discutir para aproveitarmos melhor o tempo.",
            createdAt: new Date(),
        }
    ]);

    function formatRelativeTime(date: Date) {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);

        if (diffSec < 10) return "agora";
        if (diffSec < 60) return `${diffSec} segundos atrás`;
        if (diffMin < 60) return `${diffMin} ${diffMin == 1 ? "minuto" : "minutos"} atrás`;
        if (diffHour < 24) return `${diffHour} ${diffHour == 1 ? "hora" : "horas"} atrás`;
        if (diffDay === 1) return "ontem";
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString().slice(0, 5)}`;
    }

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
                        <Button variant="outline" className="w-8 h-8 cursor-pointer">
                            <ChevronUp />
                        </Button>
                        <Button variant="outline" className="w-8 h-8 cursor-pointer">
                            <ChevronDown />
                        </Button>
                    </div>
                    <AlertDialogCancel className="w-8 h-8"><X /></AlertDialogCancel>
                </div>

                <div>
                    <div className="space-y-1">
                        <AlertDialogTitle className="text-xl">Título da Tarefa</AlertDialogTitle>
                        <p className="text-muted-foreground">Descrição da tarefa tal</p>
                    </div>

                    <div className="mt-4 space-y-2 text-muted-foreground dark:text-muted-foreground/80 font-semibold">
                        <div className="flex items-center">
                            <p className="w-40 font-normal">Criado por</p>
                            <span className="font-semibold">José Belmiro</span>
                        </div>
                        <div className="flex items-center">
                            <p className="w-40 font-normal">Status</p>
                            <span className={`flex items-center gap-0.5 text-sm font-medium p-1 text-green-500/70 border border-green-400/10 dark:border-green-500/10 bg-green-200/40 dark:bg-green-600/20 rounded-sm`}>
                                <Check size={16} /> Concluído
                            </span>
                        </div>
                        <div className="flex items-center">
                            <p className="w-40 font-normal">Dificuldade</p>
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
                        <div className="mt-2 flex gap-2 items-center">
                            <img src="https://i.pravatar.cc/150?img=15" alt="" className="h-10 w-10 rounded-full" />
                            <input type="text" placeholder="Escreva um comentário..." className="w-full h-9 px-2 border rounded-md placeholder:text-sm outline-none" />
                            <Button variant="default" className="h-9 w-10 cursor-pointer">
                                <SendHorizonal />
                            </Button>
                        </div>

                        <div className="space-y-2 mt-2">
                            {
                                data.map((item) => (
                                    <div
                                        key={item.id}
                                        className="p-3 rounded-md bg-zinc-200/20 dark:bg-muted-foreground/10"
                                    >
                                        <p>{item.content}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1.5 mt-2">
                                                <img src={`https://i.pravatar.cc/150?img=${item.id}`} alt="" className="h-7 w-7 rounded-full" />
                                                <span className="font-semibold">{item.author}</span>
                                            </div>
                                            <p className="mt-1 text-muted-foreground text-sm">
                                                {formatRelativeTime(item.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}