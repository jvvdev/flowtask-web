'use client';

import { Bell, Check, UserRoundPlus, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { authService } from "@/api/auth-service";

export function NotifyDropdown() {
    const [notifys, setNotifys] = useState<any[]>([])

    useEffect(() => {
        async function getData() {
            await authService.getToken();

            let userData = await authService.getUserData();
            if (!userData) return

            userData = JSON.parse(userData);
            setNotifys(userData?.notifys ?? [])
        }

        getData()
    }, [])

    function declineInvite(id: number) {
        console.log(id)
    }

    function acceptInvite(id: number) {
        console.log(id)
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
                            : notifys.map((item: any) => (
                                <DropdownMenuItem key={item.id} className="flex items-center justify-between hover:bg-zinc-50/0 max-w-110">
                                    <div className="rounded-md w-12 h-9 bg-purple-500 flex items-center justify-center">
                                        <UserRoundPlus size={20} className="ml-0.5" />
                                    </div>
                                    {/* <img src="https://lh3.googleusercontent.com/a/ACg8ocKTm2agX6z8LVasXnQcAmSCEbjD1Vt45aKhoEDuuFwM6l9WExLqMw=s96-c" alt="" className="h-10 w-10 rounded-full object-cover" /> */}
                                    <div>
                                        <h1 className="text-[15px] font-medium text-foreground">{item.title}</h1>
                                        <p className="text-[14px] font-normal text-muted-foreground">{item.content}</p>
                                    </div>
                                    {
                                        item.type === "invite" ? <div className="flex gap-2 ml-4">
                                            <Button variant="default" size="sm" className="rounded-md w-9 h-9 cursor-pointer" onClick={() => acceptInvite(item.id)}><Check /></Button>
                                            <Button variant="outline" size="sm" className="rounded-md w-9 h-9 cursor-pointer" onClick={() => declineInvite(item.id)}><X /></Button>
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