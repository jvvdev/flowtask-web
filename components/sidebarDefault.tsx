'use client'

import { usePathname } from "next/navigation";

import { SearchForm } from "@/components/search-form";
import { TeamSwitcher } from "@/components/integrar/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/sidebar";
import {
    RiScanLine,
    RiUserFollowLine,
    RiSettings3Line,
    RiLeafLine,
    RiLogoutBoxLine,
    RiClipboardLine,
    RiBriefcase3Line,
    RiChatAiLine,
    RiListCheck,
} from "@remixicon/react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./alert-dialog";
import { authService } from "@/api/auth-service";

export function SiderBarDefault({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();

    const data = {
        navMain: [
            {
                title: "GERAL",
                url: "#",
                items: [
                    { title: "Dashboard", url: "/dashboard", icon: RiScanLine },
                    { title: "Projetos", url: "/dashboard/project", icon: RiBriefcase3Line },
                    { title: "Equipe", url: "/dashboard/team", icon: RiUserFollowLine },
                    { title: "Chat IA", url: "/dashboard/chatai", icon: RiChatAiLine },
                ],
            },
            {
                title: "Ferramentas",
                url: "#",
                items: [
                    { title: "Tarefas", url: "/dashboard/task", icon: RiListCheck },
                    { title: "Documentos", url: "/dashboard/note", icon: RiClipboardLine },
                ],
            },
            {
                title: "Outros",
                url: "#",
                items: [
                    { title: "Configurações", url: "/dashboard/setting", icon: RiSettings3Line },
                    { title: "Ajuda", url: "/dashboard/help", icon: RiLeafLine },
                ],
            },
        ],
    };

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <TeamSwitcher />
                <hr className="border-t border-border mx-2 -mt-px" />
                <SearchForm className="mt-3" />
            </SidebarHeader>
            <SidebarContent>
                {data.navMain.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel className="uppercase text-muted-foreground/60">
                            {group.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent className="px-2">
                            <SidebarMenu>
                                {group.items.map((item) => {
                                    const isActive = pathname === item.url || pathname === `/dashboard/${item.url}`;

                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                className="group/menu-button font-medium gap-3 h-9 rounded-md bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto"
                                                isActive={isActive}
                                            >
                                                <a href={item.url}>
                                                    {item.icon && (
                                                        <item.icon
                                                            className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
                                                            size={22}
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                    <span>{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <hr className="border-t border-border mx-2 -mt-px" />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <AlertDialog>
                            <AlertDialogTrigger
                                className="w-full p-2 flex items-center gap-2 text-sm font-semibold cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800/95 rounded-md"
                            >
                                <RiLogoutBoxLine
                                    size={16}
                                    className="opacity-60"
                                    aria-hidden="true"
                                />
                                <span>Sair da conta</span>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Fazer logout</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Você tem certeza que deseja sair da sua conta?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-red-500/30 border border-zinc-500/30 dark:hover:border-red-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200">Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => authService.logout()}
                                        className="font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-green-500/30 border border-zinc-500/30 dark:hover:border-green-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200"
                                    >
                                        Confirmar
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
