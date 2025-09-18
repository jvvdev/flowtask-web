'use client'

import { authService } from "@/api/auth-service";
import { routes } from "@/api/routes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Button } from "@/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";

import { RiSettingsLine, RiTeamLine, RiLogoutBoxLine } from "@remixicon/react";
import axios from "axios";
import { Bell, Check, HandCoins, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NotifyDropdown } from "./notifyDropdown";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./alert-dialog";
import { Input } from "./input";

interface UserData {
  name: string;
  email: string;
  avatar: string;
}

export default function UserDropdown() {
  const [data, setData] = useState<UserData>({ name: "", email: "", avatar: "" });
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      const token = await authService.getToken();

      const userData = await authService.getUserData();
      if (userData) {
        setData(JSON.parse(userData) as UserData);
        setLoading(false)
        return;
      }

      await axios.get(routes.getUser + token).then((response) => {
        setData({
          name: response.data.name,
          email: response.data.email,
          avatar: response.data.avatar,
        });
        authService.setUserData({
          name: response.data.name,
          email: response.data.email,
          avatar: response.data.avatar,
          google_id: response.data.google_id,
        })
        setLoading(false)
      }).catch((err) => {
        console.log(err);
      })
    }
    getData();
  }, []);

  return (
    <div className="flex items-center gap-4">
      <NotifyDropdown />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
            {
              loading ?
                <div>
                  <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
                </div> :
                <Avatar className="size-8">
                  <AvatarImage
                    src={data.avatar}
                    width={32}
                    height={32}
                    alt="Profile image"
                  />
                  <AvatarFallback>-</AvatarFallback>
                </Avatar>
            }
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-64" align="end">
          <DropdownMenuLabel className="flex min-w-0 flex-col">
            {
              loading ?
                <div className="h-4 w-32 animate-pulse rounded bg-muted" /> :
                <span className="truncate text-sm font-medium text-foreground">
                  {data.name ? data.name : "Nome não disponível"}
                </span>
            }
            {
              loading ?
                <div className="mt-1 h-3 w-40 animate-pulse rounded bg-muted" /> :
                <span className="truncate text-xs font-normal text-muted-foreground">
                  {data.email ? data.email : "Email não disponível"}
                </span>
            }
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <RiSettingsLine
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <a href="/dashboard/setting">Configurações da conta</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HandCoins size={16} className="opacity-60 cursor-pointer" aria-hidden="true" />
              <span>Área de pagamentos</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RiTeamLine size={16} className="opacity-60 cursor-pointer" aria-hidden="true" />
              <span>Página de seleção de grupos</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <AlertDialog>
            <AlertDialogTrigger
              className="w-full px-2 py-1.5 flex items-center gap-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-md"
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
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => authService.logout()}
                  className="font-semibold bg-green-500/15 dark:bg-green-500/20 hover:bg-green-500/20 dark:hover:bg-green-500/30 border border-green-500/20 text-green-500 cursor-pointer"
                >
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
