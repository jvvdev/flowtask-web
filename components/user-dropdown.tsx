'use client'

import { authService } from "@/api/auth-service";
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
import { useEffect, useState } from "react";

export default function UserDropdown() {
  const [data, setData] = useState();

  useEffect(() => {
    authService.getUser(data, setData);
  }, [data]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar className="size-8">
            <AvatarImage
              src="https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/user_sam4wh.png"
              width={32}
              height={32}
              alt="Profile image"
            />
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-foreground">
            Adriel Lucas
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            a.dev@gmail.com
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <RiSettingsLine
              size={16}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>Configurações da conta</span>
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
