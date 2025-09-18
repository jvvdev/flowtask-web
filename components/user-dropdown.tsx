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
import { useEffect, useState } from "react";

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
        })
        setLoading(false)
      }).catch((err) => {
        console.log(err);
      })
    }
    getData();
  }, []);

  return (
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
            <RiTeamLine size={16} className="opacity-60" aria-hidden="true" />
            <span>Área de afiliados</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <RiLogoutBoxLine
            size={16}
            className="opacity-60"
            aria-hidden="true"
          />
          <span>Sair da conta</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
