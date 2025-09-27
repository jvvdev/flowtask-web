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
import UserDropdown from "@/components/user-dropdown";
import { SiderBarDefault } from "@/components/sidebarDefault";
import ThemeToggle from "@/components/theme-toggle";
import React, { useEffect } from "react";
import { IASection } from "@/components/integrar/chatIA";
import { authService } from "@/api/auth-service";

export default function ChatAI() {
    useEffect(() => {
        async function getData() {
            const userData = await authService.getUserData()

            if (!userData) return;

            console.log(JSON.parse(userData))
        }

        getData()
    }, [])

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
                                    <BreadcrumbPage>Chat IA</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="flex gap-3 ml-auto items-center">
                        <div className="flex items-center p-1 px-2 border rounded-md bg-fuchsia-500/30 border-fuchsia-600/30">
                            <p className="text-zinc-600 dark:text-zinc-400">Pontos de IA: <strong className="text-zinc-950 dark:text-zinc-200">1</strong></p>
                        </div>
                        <ThemeToggle />
                        <UserDropdown />
                    </div>
                </header>

                <div className="w-full h-full">
                    <IASection />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}