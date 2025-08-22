'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/breadcrumb";
import { Separator } from "@/components/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/popover";
import UserDropdown from "@/components/user-dropdown";
import { SiderBarDefault } from "@/components/sidebarDefault";
import { Button } from "@/components/button";
import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";
import { Input } from "@/components/input";
import { Ellipsis, MessageCircleMore, SendHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/avatar";
import { RiFilter3Line } from "@remixicon/react";

export default function Page() {
  const [data, setData] = useState([
    {
      id: 1,
      author: "João Silva",
      text: "Comentário 1",
      createdAt: new Date()
    },
    {
      id: 2,
      author: "João Silva",
      text: "Comentário 2",
      createdAt: new Date()
    },
    {
      id: 3,
      author: "João Silva",
      text: "Comentário 3",
      createdAt: new Date()
    },
    {
      id: 4,
      author: "Maria Oliveira",
      text: "Ótima sugestão! Podemos implementar isso na próxima sprint.",
      createdAt: new Date()
    },
    {
      id: 5,
      author: "Carlos Souza",
      text: "Encontrei um bug na tela de login, já estou corrigindo.",
      createdAt: new Date()
    },
    {
      id: 6,
      author: "Ana Paula",
      text: "A documentação está desatualizada, vou revisar hoje.",
      createdAt: new Date()
    },
    {
      id: 7,
      author: "Bruno Lima",
      text: "Alguém pode revisar meu pull request?",
      createdAt: new Date()
    },
    {
      id: 8,
      author: "Fernanda Costa",
      text: "O deploy foi realizado com sucesso!",
      createdAt: new Date()
    },
    {
      id: 9,
      author: "Lucas Pereira",
      text: "Precisamos alinhar os requisitos com o cliente.",
      createdAt: new Date()
    },
    {
      id: 10,
      author: "Juliana Martins",
      text: "Os testes automatizados estão passando.",
      createdAt: new Date()
    },
    {
      id: 11,
      author: "Patrícia Gomes",
      text: "O cliente aprovou as alterações do layout.",
      createdAt: new Date()
    },
    {
      id: 12,
      author: "Rafael Torres",
      text: "Sugiro adicionar uma validação extra no formulário.",
      createdAt: new Date()
    },
    {
      id: 13,
      author: "Gabriel Almeida",
      text: "A integração com o sistema externo está funcionando.",
      createdAt: new Date()
    },
    {
      id: 14,
      author: "Sofia Fernandes",
      text: "Podemos marcar uma call para discutir os próximos passos?",
      createdAt: new Date()
    },
    {
      id: 15,
      author: "Eduardo Ramos",
      text: "Atualizei as dependências do projeto.",
      createdAt: new Date()
    },
    {
      id: 16,
      author: "Camila Duarte",
      text: "O ambiente de homologação está pronto para testes.",
      createdAt: new Date()
    },
    {
      id: 17,
      author: "Vinícius Lopes",
      text: "Encontrei um erro ao salvar os dados, já estou investigando.",
      createdAt: new Date()
    },
    {
      id: 18,
      author: "Larissa Barros",
      text: "Os gráficos do dashboard foram atualizados.",
      createdAt: new Date()
    },
    {
      id: 19,
      author: "Felipe Santana",
      text: "O feedback do usuário foi positivo.",
      createdAt: new Date()
    },
    {
      id: 20,
      author: "Isabela Nunes",
      text: "Finalizei a revisão dos textos institucionais.",
      createdAt: new Date()
    },
  ]);

  return (
    <SidebarProvider className="p-2">
      <SiderBarDefault />
      <SidebarInset className="border border-zinc-200/10 overflow-hidden px-4 md:px-6 lg:px-8 rounded-2xl">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger className="-ms-4" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <a href="/dashboard" className="text-zinc-400">Dashboard</a>
                </BreadcrumbItem>
                <span className="text-zinc-400">/</span>
                <Link href="/dashboard/project" className="text-zinc-400">Projetos</Link>
                <span className="text-zinc-400">/</span>
                <span className="text-zinc-400">Manager System</span>
                <span className="text-zinc-400">/</span>
                <BreadcrumbItem>
                  <BreadcrumbPage>Tarefa 01</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex gap-3 ml-auto">
            <ThemeToggle />
            <UserDropdown />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-3 lg:gap-3 py-4 lg:px-8 lg:py-6">
          {/* Page intro */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-4xl font-semibold">Manager System</h1>
              <p className="text-muted-foreground">Aqui você pode ver com detalhes os comentários da tarefa selecionada.</p>
            </div>
          </div>

          <div
            className="p-4 relative flex flex-col border bg-zinc-200/10 dark:bg-zinc-800/30 rounded-2xl max-h-[calc(100vh-220px)] overflow-y-auto
            [&::-webkit-scrollbar]:w-1.5
                        [&::-webkit-scrollbar-track]:rounded-md
                        [&::-webkit-scrollbar-thumb]:rounded-md
                        [&::-webkit-scrollbar-track]:bg-zinc-200/50
                        dark:[&::-webkit-scrollbar-track]:bg-zinc-800/30
                        [&::-webkit-scrollbar-thumb]:bg-zinc-400
                        dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700"
          >
            {
              data.map((item) => (
                <div key={item.id} className={`p-4 pl-2 ${item.id == 1 ? "pt-1" : ""} ${item.id != data.length ? "border-b" : ""} last:border-0`}>
                  <div className="flex items-center gap-2">
                    <img className="rounded-full w-13 h-13" src={`https://i.pravatar.cc/150?img=${item.id}`} alt={item.author} />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-lg">{item.author}</p>
                        <Popover >
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="h-8 w-8 p-3">
                              <Ellipsis />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto min-w-30 p-0" align="end">
                            <div className="space-y-1">
                              <div className="text-xs px-3 pt-3 font-medium uppercase text-muted-foreground/60">
                                Ações
                              </div>
                              <div className="space-y-1 px-1 pb-1">
                                <button className={`flex gap-1 px-2 py-1 bg-zinc-200/0 w-full text-left hover:bg-red-500/15 cursor-pointer rounded-md duration-200`}><Trash size={16} className="mt-[3px]"/>Excluir</button>

                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-muted-foreground">{item.text}</p>
                        <p className="text-muted-foreground text-sm">Enviado em: {item.createdAt.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }

            <div
              className="w-full sticky bottom-0 z-10 border rounded-xl p-4 space-y-2 shadow-lg bg-background">
              <h1 className="text-lg">Adicionar novo comentário à tarefa</h1>
              <div className="flex items-center gap-2">
                <div className="relative w-full">
                  <MessageCircleMore className="absolute left-2 top-[7px] text-muted-foreground" size={20} />
                  <Input placeholder="Digite seu comentário aqui..." className="pl-8" />
                </div>
                <Button className="cursor-pointer"><SendHorizontal /></Button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}