'use client'

import * as React from "react";

import { SearchForm } from "@/components/search-form";
import { TeamSwitcher } from "@/components/team-switcher";
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
import { usePathname } from "next/navigation";

export function SiderBarDefault({ ...props }: React.ComponentProps<typeof Sidebar>) {
    // This is sample data.
    const data = {
        teams: [
            {
                name: "FlowTask",
                logo: "https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/logo-01_kp2j8x.png",
            }
        ],
        navMain: [
            {
                title: "GERAL",
                url: "#",
                items: [
                    {
                        title: "Dashboard",
                        url: "/dashboard",
                        icon: RiScanLine,
                    },
                    {
                        title: "Projetos",
                        url: "/dashboard/project",
                        icon: RiBriefcase3Line,
                    },
                    {
                        title: "Equipe",
                        url: "/dashboard/team",
                        icon: RiUserFollowLine,
                        isActive: true,
                    },
                    {
                        title: "Chat IA",
                        url: "#",
                        icon: RiChatAiLine,
                    },
                ],
            },
            {
                title: "Ferramentas",
                url: "#",
                items: [
                    {
                        title: "Tarefas",
                        url: "/dashboard/task",
                        icon: RiListCheck,
                    },
                    {
                        title: "Relatórios",
                        url: "#",
                        icon: RiClipboardLine,
                    },
                ],
            },
            {
                title: "Other",
                url: "#",
                items: [
                    {
                        title: "Configurações",
                        url: "#",
                        icon: RiSettings3Line,
                    },
                    {
                        title: "Ajuda",
                        url: "#",
                        icon: RiLeafLine,
                    },
                ],
            },
        ],
    };

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
                <hr className="border-t border-border mx-2 -mt-px" />
                <SearchForm className="mt-3" />
            </SidebarHeader>
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}
                {data.navMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel className="uppercase text-muted-foreground/60">
                            {item.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent className="px-2">
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            className="group/menu-button font-medium gap-3 h-9 rounded-md bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto"
                                            isActive={item.url == usePathname() ? true : "/dashboard/" + item.url == usePathname() ? true : false}
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
                                ))}
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