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
                    { title: "Ajuda", url: "/help", icon: RiLeafLine },
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
                        <SidebarMenuButton className="font-medium gap-3 h-9 rounded-md bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto">
                            <RiLogoutBoxLine
                                className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
                                size={22}
                                aria-hidden="true"
                            />
                            <span>Sair da conta</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
