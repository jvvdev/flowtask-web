import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "FlowTask - Chat IA",
};

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
import UserDropdown from "@/components/user-dropdown";
import { SiderBarDefault } from "@/components/sidebarDefault";
import ThemeToggle from "@/components/theme-toggle";
import React, { } from "react";
import { Label } from "recharts";
import { Input } from "@/components/input";

export default function Help() {


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
                                    <a
                                        href="/dashboard"
                                        className="text-zinc-400"
                                    >
                                        Dashboard
                                    </a>
                                </BreadcrumbItem>
                                <span className="text-zinc-400">/</span>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Ajuda</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="flex gap-3 ml-auto">
                        <ThemeToggle />
                        <UserDropdown />
                    </div>
                </header>

                <div className="flex flex-1 flex-col gap-4 lg:gap-6 pt-4 lg:pt-6">
                    {/* Page intro */}
                    {/* <div className="flex items-center justify-between gap-4">
                        <div className="space-y-1">
                            <h1 className="text-2xl font-semibold">Olá, Keith!</h1>
                            <p className="text-xs md:text-sm text-muted-foreground">
                                Caso estiver com alguma dúvida em alguma parte do sistema você pode enviar uma mensagem abaixo
                            </p>
                        </div>
                    </div> */}

                    <div className="flex justify-between gap-4">
                        <div className="w-full">
                            <h1 className="text-2xl font-semibold">Entre em contato</h1>
                            <p className="text-xs md:text-sm text-muted-foreground">
                                Se tiver alguma dúvida em qualquer parte do sistema, envie sua mensagem no campo ao lado
                            </p>
                        </div>

                        <div className="w-full border p-3 flex flex-col gap-4 rounded-lg">
                            <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-zinc-400">
                                    Nome
                                </p>
                                <Input
                                    placeholder="Digite aqui seu nome"
                                    className={`mt-1 bg-gray-50 dark:bg-zinc-800/40 `}
                                />
                            </div>

                            <p className="text-sm font-medium text-gray-700 dark:text-zinc-400">
                                Qual seu problema?
                            </p>

                            <div className="grid grid-cols-3 gap-2">
                                <button className="border p-1 text-[15px] rounded-md bg-gray-50 hover:bg-zinc-200/60 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/60 duration-200 cursor-pointer">
                                    Interface
                                </button>
                                <button className="border p-1 text-[15px] rounded-md bg-gray-50 hover:bg-zinc-200/60 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/60 duration-200 cursor-pointer">
                                    Experiencia no celular
                                </button>
                                <button className="border p-1 text-[15px] rounded-md bg-gray-50 hover:bg-zinc-200/60 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/60 duration-200 cursor-pointer">
                                    Gerenciamento dos membros
                                </button>
                                <button className="border p-1 text-[15px] rounded-md bg-gray-50 hover:bg-zinc-200/60 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/60 duration-200 cursor-pointer">
                                    Gerenciamento das tarefas
                                </button>
                                <button className="border p-1 text-[15px] rounded-md bg-gray-50 hover:bg-zinc-200/60 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/60 duration-200 cursor-pointer">
                                    Gerenciamento dos documentos
                                </button>
                                <button className="border p-1 text-[15px] rounded-md bg-gray-50 hover:bg-zinc-200/60 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/60 duration-200 cursor-pointer">
                                    Assinatura/Planos
                                </button>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-zinc-400">
                                    Não achou o problema? envie um texto customizado abaixo
                                </p>
                                <Input
                                    placeholder="Digite aqui seu problema com detalhes"
                                    className={`mt-1 bg-gray-50 dark:bg-zinc-800/40 `}
                                />
                            </div>

                            <button className="border p-2 text-[15px] rounded-md font-semibold bg-gray-50 hover:bg-zinc-200/60 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/60 duration-200 cursor-pointer">
                                Entrar em contato
                            </button>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}