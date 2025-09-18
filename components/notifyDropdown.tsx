import { Bell, Check, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { Button } from "./button";

export function NotifyDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="relative">
                    <div>
                        <div className="absolute right-0 -top-0.5 h-2 w-2 rounded-full bg-red-600 z-10"></div>
                        <div className="absolute right-0 -top-0.5 h-2 w-2 rounded-full bg-red-600 z-10 animate-ping"></div>
                    </div>
                    <Bell size={18} className="opacity-60 hover:opacity-100 cursor-pointer" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="" align="end">
                <DropdownMenuLabel className="flex min-w-0 flex-col">
                    <p className="text-lg font-medium text-foreground">Notificações</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex items-center justify-between hover:bg-zinc-50/0">
                        <img src="https://lh3.googleusercontent.com/a/ACg8ocKTm2agX6z8LVasXnQcAmSCEbjD1Vt45aKhoEDuuFwM6l9WExLqMw=s96-c" alt="" className="h-10 w-10 rounded-full object-cover" />
                        <div>
                            <h1 className="text-[16px] font-medium text-foreground">Nova solicitação</h1>
                            <p className="text-[14px] font-normal text-muted-foreground">Adriel Lucas quer entrar no seu grupo</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                            <Button variant="default" size="sm" className="rounded-md w-9 h-9 cursor-pointer"><Check /></Button>
                            <Button variant="outline" size="sm" className="rounded-md w-9 h-9 cursor-pointer"><X /></Button>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}