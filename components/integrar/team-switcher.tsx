"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/sidebar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/alert-dialog";

import { RiExpandUpDownLine, RiAddLine } from "@remixicon/react";
import { Input } from "../input";
import { ALargeSmall, LoaderCircle, MessageCircleMore, Trash, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { teamService } from "@/api/dashboard/team-service";
import axios from "axios";
import { routes } from "@/api/routes";
import { authService } from "@/api/auth-service";
import { ModifyTeam } from "./modifyTeam";

type Team = {
  id_group: string;
  name: string;
  // Adicione outros campos se necessário
};

type CreateTeamForm = {
  name: string;
  description: string;
};

export function TeamSwitcher() {
  const [activeTeam, setActiveTeam] = React.useState<string | undefined>();
  const [team, setTeam] = React.useState<Team[]>([]);

  const [loading, setLoading] = React.useState(true);

  const { register, handleSubmit } = useForm<CreateTeamForm>();

  React.useEffect(() => {
    async function getData() {
      const token = await authService.getToken()

      await axios.get(routes.getTeamByUser, {
        headers: {
          "authToken": token
        }
      }).then((response) => {
        setTeam(response.data.data)
        setLoading(false)
      }).catch((error) => {
        console.error(error);
      })
    }

    getData()

    async function getActiveTeam() {
      if (!activeTeam) {
        setTimeout(async () => {
          if (team.length > 0) {
            const activeTeam = await teamService.getTeamByUser();
            if (typeof activeTeam === "string") {
              setActiveTeam(JSON.parse(activeTeam).name);
            }
          }
        }, 500);
      }
    }

    getActiveTeam()
  }, [])

  const onSubmit = (data: CreateTeamForm) => {
    teamService.createTeam(data);
  };

  const handleTeamChange = (team: Team) => {
    setActiveTeam(team.name);
    teamService.setTeamByUser(team);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground gap-3 [&>svg]:size-auto"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-md overflow-hidden bg-sidebar-primary text-sidebar-primary-foreground">
                {/* {activeTeam && (
                  <img
                    src={activeTeam.logo}
                    width={36}
                    height={36}
                    alt={activeTeam.name}
                  />
                )} */}
                <Users size={18} />
              </div>
              <div className="grid flex-1 text-left text-base leading-tight">
                <span className="truncate font-medium">
                  {activeTeam ?? "Selecione um time"}
                </span>
              </div>
              <RiExpandUpDownLine
                className="ms-auto text-muted-foreground/60"
                size={20}
                aria-hidden="true"
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-md"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="uppercase text-muted-foreground/60 text-xs">
              EQUIPES
            </DropdownMenuLabel>
            {loading ? <div className="w-full flex items-center justify-center h-10 text-sm font-semibold gap-2 text-muted-foreground"><LoaderCircle size={16} className="animate-spin" /> Carregando...</div> : team.length > 0 ? team.map((team, index) => (
              <div
                key={team.id_group}
                onClick={() => handleTeamChange(team)}
                className={`rounded-md gap-2 py-1 px-2 flex justify-between items-center ${activeTeam === team.name ? 'bg-muted-foreground/10' : 'cursor-pointer hover:bg-muted-foreground/5'}`}
              >
                {/* <div className="flex size-6 items-center justify-center rounded-md overflow-hidden">
                  <img src={team.logo} width={36} height={36} alt={team.name} />
                </div> */}
                {team.name}

                <div className="flex">
                  <ModifyTeam id={team.id_group} />
                  <AlertDialog>
                    <AlertDialogTrigger
                      className="w-full p-2 flex items-center justify-center gap-2 rounded-md text-sm font-semibold hover:bg-red-600/15 cursor-pointer"
                    >
                      <Trash size={16} className="opacity-60" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Deletar equipe</AlertDialogTitle>
                        <AlertDialogDescription>
                          Você tem certeza que quer deletar a equipe selecionada?
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter className="">
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => teamService.deleteTeam(Number(team.id_group))}
                          className="font-semibold bg-green-500/15 dark:bg-green-500/20 hover:bg-green-500/20 dark:hover:bg-green-500/30 border border-green-500/20 text-green-500 cursor-pointer"
                        >
                          Deletar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            )) :
              <div className="flex items-center justify-center p-2">
                <p className="text-muted-foreground text-sm">Nenhuma equipe encontrada.</p>
              </div>}
            <DropdownMenuSeparator />
            <AlertDialog>
              <AlertDialogTrigger
                className="w-full p-2 flex items-center justify-center gap-2 rounded-md text-sm font-semibold hover:bg-muted-foreground/5 cursor-pointer"
              >
                <RiAddLine className="opacity-60" size={16} aria-hidden="true" />
                <div className="font-medium">Adicionar equipe</div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Adicionar equipe</AlertDialogTitle>
                  <AlertDialogDescription>
                    Aqui você pode adicionar novas equipes para gerenciar.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 dark:text-zinc-200/80"><ALargeSmall size={20} />Nome da equipe</p>
                      <Input
                        placeholder="Digite aqui"
                        className="mb-2"
                        {...register("name", { required: true })}
                      />
                    </div>

                    <div className="space-y-2">
                      <p className="flex items-center gap-2 dark:text-zinc-200/80"><MessageCircleMore size={20} />Descrição da equipe</p>
                      <Input
                        placeholder="Digite aqui"
                        className="mb-2"
                        {...register("description", { required: true })}
                      />
                    </div>
                  </div>

                  <AlertDialogFooter className="mt-6">
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      type="submit"
                      className="font-semibold bg-green-500/15 dark:bg-green-500/20 hover:bg-green-500/20 dark:hover:bg-green-500/30 border border-green-500/20 text-green-500 cursor-pointer"
                    >
                      Criar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </form>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
