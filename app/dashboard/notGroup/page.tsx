'use client'

import { Ellipsis, Plus, UsersRound, ArrowLeft, ALargeSmall, MessageCircleMore, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/alert-dialog";
import { useForm } from "react-hook-form";
import { Input } from "@/components/input";
import { teamService } from "@/api/dashboard/team-service";
import ThemeToggle from "@/components/theme-toggle";
import { JoinGroupDialog } from "./components/joinGroup";
import { authService } from "@/api/auth-service";
import { routes } from "@/api/routes";
import axios from "axios";
import UserDropdown from "@/components/user-dropdown";
import { SidebarTrigger } from "@/components/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/breadcrumb";
import { Separator } from "@/components/separator";
import { RiAddLine, RiSearch2Line } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { AskToJoinGroup } from "./components/askToJoin";

type CreateTeamForm = {
  name: string;
  description?: string;
};

type Team = {
  id_group: string;
  name: string;
  description: string;
  // Adicione outros campos se necessário
};

export default function NotGroupPage() {
  const [actualSelect, setActualSelect] = useState('')
  const [activeTeam, setActiveTeam] = useState<string | undefined>();
  const [team, setTeam] = useState<Team[]>([]);
  const [data, setData] = useState()

  const [loading, setLoading] = useState(true);

  const { register, handleSubmit } = useForm<CreateTeamForm>();

  const router = useRouter();

  useEffect(() => {
    async function getData() {
      const token = await authService.getToken()

      const userTeams = await teamService.getAllTeams();
      if (userTeams) {
        setTeam(JSON.parse(userTeams) as Team[]);
        setLoading(false)
        return;
      }

      await axios.get(routes.getTeamByUser, {
        headers: {
          "authToken": token
        }
      }).then((response) => {
        setTeam(response.data.data)
        setLoading(false)
        if (response.data.data.length === 0) {
          setLoading(false)
          return;
        }
        teamService.setAllTeams(response.data.data)
      }).catch((error) => {
        console.error(error);
      })
    }

    getData()

    async function getActiveTeam() {
      if (!activeTeam) {
        setTimeout(async () => {
          const activeTeam = await teamService.getTeamByUser();
          if (typeof activeTeam === "string") {
            setActiveTeam(JSON.parse(activeTeam).name);
          }
        }, 500);
      }
    }

    getActiveTeam()
  }, [])

  useEffect(() => {
    async function getData() {
      const token = await authService.getToken()

      await axios.get(routes.getUser + token)
        .then((response) => {
          setData(response.data)
          authService.setUserData(response.data)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    getData()
  }, [])

  const handleTeamChange = (team: Team) => {
    setActiveTeam(team.name);
    teamService.setTeamByUser(team);
    router.push("/dashboard");
  };

  const onSubmit = (data: CreateTeamForm) => {
    teamService.createTeam(data);
  };

  const redirectToPlans = () => {
    router.push("/dashboard/setting/billing");
  }

  return (
    <div className={`min-h-dvh bg-background flex flex-col items-center justify-center ${team.length >= 1 ? '' : 'p-6'}`}>
      {
        loading ?
          <div className="flex items-center gap-1 text-muted-foreground">
            <Loader2 className="animate-spin" />
            Carregando...
          </div> : team.length >= 1 ?

            <div className="h-dvh w-full flex flex-col">
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
                <div className="flex flex-1 items-center gap-2">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <a href="/dashboard" className="text-zinc-400">Dashboard</a>
                      </BreadcrumbItem>
                      <span className="text-zinc-400">/</span>
                      <BreadcrumbItem>
                        <BreadcrumbPage>Seleção de time</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
                <div className="flex gap-3 ml-auto">
                  <ThemeToggle />
                  <UserDropdown />
                </div>
              </header>

              <div className="flex flex-1 flex-col gap-4 lg:gap-6 pt-4 lg:pt-6 px-6">
                {/* Page intro */}
                <div className="flex flex-col justify-between gap-4">
                  <div className="space-y-1">
                    <h1 className="text-2xl font-semibold">Olá, Keith!</h1>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Confira a visão geral dos seus documentos e gerencie ou adicione novos com rapidez e facilidade!
                    </p>
                  </div>

                  <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-2">
                    <div className="relative w-full">
                      <Input
                        placeholder="Pesquisar pelo nome"
                        className="peer min-w-40 md:max-w-78.5 ps-9 bg-zinc-200/70 hover:bg-zinc-200 dark:bg-zinc-800/30 dark:hover:bg-zinc-800/70 duration-200"
                      />
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/60 peer-disabled:opacity-50">
                        <RiSearch2Line size={20} aria-hidden="true" />
                      </div>
                    </div>

                    <div className="w-full md:w-[93%] lg:w-[60%] flex justify-end gap-2 items-center">
                      <AskToJoinGroup />
                      <AlertDialog>
                        <AlertDialogTrigger
                          className="w-full md:w-full 2xl:w-[30%] py-[9px] md:py-2 px-4 flex items-center justify-center gap-2 rounded-md text-sm font-semibold border bg-zinc-200/70 hover:bg-zinc-200 dark:bg-zinc-800/30 dark:hover:bg-zinc-800/70 duration-200 cursor-pointer"
                        >
                          <RiAddLine className="opacity-60" size={16} aria-hidden="true" />
                          <div className="font-medium flex sm:hidden md:flex">Adicionar equipe</div>
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
                    </div>
                  </div>

                  <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                    {team.map((member) => (
                      <div
                        key={member.id_group}
                        className="relative p-3 border rounded-lg bg-zinc-200/70 dark:bg-zinc-800/30"
                      >
                        <div className="w-full flex justify-between items-start">
                          <div className="absolute right-3 text-sm font-semibold bg-gradient-to-br from-green-600/80 to-green-600/80  text-white border-green-700/30 dark:from-green-700/80 dark:to-green-600/40 dark:border-green-400/20  py-1 px-2 rounded-sm border flex items-center gap-1">
                            Conectado
                          </div>
                        </div>

                        <div>
                          <h1 className="text-lg font-semibold">{member.name}</h1>
                          <p className="text-sm text-muted-foreground">{member.description}</p>

                          <Button
                            onClick={() => handleTeamChange(member)}
                            className="font-semibold mt-2 w-full rounded-sm border text-zinc-800 dark:text-zinc-200 bg-zinc-400/30 hover:bg-zinc-950 hover:text-white dark:bg-zinc-800/30 dark:hover:bg-zinc-200 dark:hover:text-black duration-200 cursor-pointer"
                          >
                            Entrar no grupo
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div> :

            <div className="w-full max-w-4xl">
              {/* Header */}
              <div className="flex flex-col mb-8">
                <p className="text-[16px] text-muted-foreground">Parece que você não está em nenhum grupo ainda...</p>
                <h1 className="text-2xl font-semibold text-foreground">Selecione uma das opções abaixo para continuar</h1>
              </div>

              {/* Cards Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Join Group Card */}
                <button
                  onClick={() => setActualSelect('join')}
                  className={`group relative overflow-hidden rounded-lg border p-6 ${actualSelect === 'join' ? 'border-primary/60' : 'group border-primary/20 hover:bg-zinc-900/5 hover:border-primary/60 cursor-pointer'} transition-colors`}>
                  <div className="flex flex-col space-y-4">
                    <div className="p-3 bg-primary/5 group-hover:bg-primary/10 rounded-lg w-fit">
                      <UsersRound className="w-8 h-8 text-primary" />
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold text-card-foreground text-left">Entrar em um grupo</h2>
                      <p className="text-sm text-muted-foreground text-left">
                        Perfeito para participar de grupos existentes e colaborar com outros membros
                      </p>
                    </div>

                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        Acesso instantâneo ao grupo
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        Participação em discussões
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        Compartilhamento de conteúdo
                      </li>
                    </ul>
                  </div>
                </button>

                {/* Create Group Card */}
                <button
                  onClick={() => setActualSelect('create')}
                  className={`relative overflow-hidden rounded-lg border p-6 ${actualSelect === 'create' ? 'border-primary/60' : 'group border-primary/20 hover:bg-zinc-900/5 hover:border-primary/60'} transition-colors cursor-pointer`}>
                  <div className="flex flex-col space-y-4">
                    <div className="p-3 bg-primary/5 group-hover:bg-primary/10 rounded-lg w-fit">
                      <Plus className="w-8 h-8 text-primary" />
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold text-card-foreground text-left">Criar um grupo</h2>
                      <p className="text-sm text-muted-foreground text-left">
                        Ideal para liderar e gerenciar seu próprio grupo com controle total
                      </p>
                    </div>

                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        Controle administrativo completo
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        Gerenciamento de membros
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        Configurações personalizadas
                      </li>
                    </ul>
                  </div>
                </button>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center">
                <Button onClick={() => authService.logout()} variant="default" className="flex items-center gap-2 border border-destructive/40 bg-transparent hover:bg-destructive/10 hover:border-destructive/20 text-destructive cursor-pointer">
                  <ArrowLeft className="w-4 h-4" />
                  Sair da conta
                </Button>

                {
                  actualSelect === 'join' ?
                    <JoinGroupDialog /> : actualSelect === 'create' ? data.plan != "Sem plano" ?
                      <AlertDialog>
                        <AlertDialogTrigger
                          className="px-8 py-2 bg-primary flex items-center justify-center gap-2 text-white dark:text-black rounded-md text-sm hover:bg-primary/90 cursor-pointer"
                        >
                          Continuar
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
                              <AlertDialogCancel className="font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-red-500/30 border border-zinc-500/30 dark:hover:border-red-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200">Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                type="submit"
                                className="font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-green-500/30 border border-zinc-500/30 dark:hover:border-green-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200"
                              >
                                Criar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </form>
                        </AlertDialogContent>
                      </AlertDialog> :
                      <AlertDialog>
                        <AlertDialogTrigger
                          className="px-8 py-2 bg-primary flex items-center justify-center gap-2 text-white dark:text-black rounded-md text-sm hover:bg-primary/90 cursor-pointer"
                        >
                          Continuar
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Não autorizado</AlertDialogTitle>
                            <AlertDialogDescription>
                              Você não possui um plano ativo, e por isso você não pode criar grupos. Assine um plano para continuar.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter className="mt-6">
                            <AlertDialogCancel className="font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-red-500/30 border border-zinc-500/30 dark:hover:border-red-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200">Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              type="submit"
                              className="font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-green-500/30 border border-zinc-500/30 dark:hover:border-green-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200"
                            >
                              Assinar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog> :
                      <Button variant="default" className="px-8 bg-zinc-900/10 hover:bg-zinc-900/10 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/4*0 text-black/70 dark:text-white/80 cursor-not-allowed">Continuar</Button>
                }
              </div>

              <div className="absolute bottom-16 right-16">
                <ThemeToggle />
              </div>
            </div>
      }
    </div>
  )
}
