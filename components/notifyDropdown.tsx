'use client';

import { Bell, Check, CircleAlert, UserRoundPlus, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { authService } from "@/api/auth-service";
import axios from "axios";
import { routes } from "@/api/routes";
import { teamService } from "@/api/dashboard/team-service";

interface Notify {
    id: string;
    type: 'invite' | 'remove_member' | 'success' | 'accept_invite' | 'reject_invite';
    title: string;
    content: string;
}

export function NotifyDropdown() {
    const [notifys, setNotifys] = useState<Notify[]>([]);

    useEffect(() => {
        async function getData() {
            const token = await authService.getToken();
            try {
                const response = await axios.get<{ notifys: Notify[] }>(routes.getUser + token);
                setNotifys(response.data.notifys);
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, []);

    function declineInvite(data: Notify) {
        teamService.rejectJoin(data);
    }

    function acceptInvite(data: Notify) {
        teamService.acceptJoin(data);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="relative">
                    {
                        notifys.length > 0 ? <div>
                            <div className="absolute right-0 -top-0.5 h-2 w-2 rounded-full bg-red-600 z-10"></div>
                            <div className="absolute right-0 -top-0.5 h-2 w-2 rounded-full bg-red-600 z-10 animate-ping"></div>
                        </div> : null
                    }
                    <Bell size={18} className="opacity-60 hover:opacity-100 cursor-pointer" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="" align="end">
                <DropdownMenuLabel className="flex min-w-0 flex-col">
                    <p className="text-lg font-medium text-foreground">Notificações</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {
                        notifys.length === 0 ?
                            <p className="p-2 text-sm text-muted-foreground">Nenhuma notificação encontrada</p>
                            : notifys.map((item: Notify) => (
                                <DropdownMenuItem key={item.id} className="flex items-center justify-between hover:bg-zinc-50/0 max-w-110">
                                    <div className="flex items-center gap-2">
                                        {
                                            item.type === "invite" ?
                                                <div className="rounded-md p-2 bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                                                    <UserRoundPlus size={24} />
                                                </div> : item.type === "remove_member" ?
                                                    <div className="rounded-md p-2 bg-red-600/20 border border-red-600/30 flex items-center justify-center">
                                                        <X size={24} className="" />
                                                    </div> : item.type === "success" ? <div className="rounded-md p-2 bg-green-600/20 border border-green-600/30 flex items-center justify-center">
                                                        <Check size={24} className="" />
                                                    </div> : item.type === "accept_invite" ? <div className="rounded-md p-2 bg-green-600/20 border border-green-600/30 flex items-center justify-center">
                                                        <Check size={24} className="" />
                                                    </div> : item.type === "reject_invite" ? <div className="rounded-md p-2 bg-red-600/20 border border-red-600/30 flex items-center justify-center">
                                                        <X size={24} className="" />
                                                    </div> : ""
                                        }
                                        {/* <img src="https://lh3.googleusercontent.com/a/ACg8ocKTm2agX6z8LVasXnQcAmSCEbjD1Vt45aKhoEDuuFwM6l9WExLqMw=s96-c" alt="" className="h-10 w-10 rounded-full object-cover" /> */}
                                        <div>
                                            <h1 className="text-[15px] font-medium text-foreground">{item.title}</h1>
                                            <p className="text-[14px] font-normal text-muted-foreground">{item.content}</p>
                                        </div>
                                    </div>
                                    {
                                        item.type === "invite" ? <div className="flex gap-2 ml-4">
                                            <Button variant="default" size="sm" className="rounded-md w-9 h-9 cursor-pointer" onClick={() => acceptInvite(item)}><Check /></Button>
                                            <Button variant="outline" size="sm" className="rounded-md w-9 h-9 cursor-pointer" onClick={() => declineInvite(item)}><X /></Button>
                                        </div> : null
                                    }
                                </DropdownMenuItem>
                            ))
                    }
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}