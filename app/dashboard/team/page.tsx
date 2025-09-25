'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/breadcrumb";
import { Separator } from "@/components/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/sidebar";
import { Button } from "@/components/button";
import UserDropdown from "@/components/user-dropdown";
import { ContactsTables } from "@/components/integrar/contacts-table";
import { StatsGrid } from "@/components/stats-grid";
import { SiderBarDefault } from "@/components/sidebarDefault";
import ThemeToggle from "@/components/theme-toggle";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/alert-dialog";
import { Loader2, Plus, Users } from "lucide-react";
import { Input } from "@/components/input";
import { useForm } from "react-hook-form";
import { memberService } from "@/api/dashboard/member-service";
import { useEffect, useState } from "react";
import { teamService } from "@/api/dashboard/team-service";

export default function Page() {
  const { register, handleSubmit } = useForm();
  const [notActiveGroup, setNotActiveGroup] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      const actualGroupRaw = await teamService.getTeamByUser();
      let actualGroup: { id_group: string } | null = null;
      if (actualGroupRaw) {
        try {
          actualGroup = JSON.parse(actualGroupRaw);
          setLoading(false)
        } catch {
          actualGroup = null;
          setLoading(false)
        }
      } else {
        setNotActiveGroup(true);
        setLoading(false)
      }
      if (!actualGroup) return;

    }

    getData();
  }, []);

  function onSubmit(data: any) {
    memberService.InviteMember(data);
    console.log(data)
  }

  return (
    <SidebarProvider className="p-2">
      <SiderBarDefault />
      <SidebarInset className="border border-zinc-200/10 overflow-hidden px-4 md:px-6 lg:px-8 rounded-2xl">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger className="-ms-4" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <a href="/dashboard" className="text-zinc-400">Dashboard</a>
                </BreadcrumbItem>
                <span className="text-zinc-400">/</span>
                <BreadcrumbItem>
                  <BreadcrumbPage>Equipe</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex gap-3 ml-auto">
            <ThemeToggle />
            <UserDropdown />
          </div>
        </header>
        {loading ? <div className="w-full h-full flex items-center justify-center opacity-50 gap-1">
          <Loader2 className="animate-spin" />
          Carregando...
        </div> : notActiveGroup ?
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Users size={40} className="text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">Nenhum grupo ativo encontrado</h3>
            <p className="text-muted-foreground">Selecione um grupo para acessar essa página.</p>
          </div> : <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
            {/* Page intro */}
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold">Olá, Keith!</h1>
                <p className="text-sm text-muted-foreground">
                  Aqui está uma visão geral dos seus membros. Gerencie-os ou adicione novos com facilidade!
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger
                  className="p-2 flex items-center justify-center gap-2 rounded-md text-sm font-semibold bg-zinc-500/15 dark:bg-zinc-200 hover:bg-zinc-500/20 dark:hover:bg-zinc-300/90 border border-zinc-500/20 text-zinc-600 dark:text-zinc-900/90 cursor-pointer"
                >
                  <Plus className="size-5" />
                  <span className="hidden sm:block">Convidar membro</span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Convidar membro</AlertDialogTitle>
                    <AlertDialogDescription>
                      Aqui você pode convidar novos membros a sua equipe.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="flex items-center gap-2 dark:text-zinc-200/80">Email</p>
                        <Input
                          placeholder="Ex: keith@example.com"
                          className="mb-2"
                          {...register("email")}
                        />
                      </div>
                    </div>

                    <AlertDialogFooter className="mt-6">
                      <AlertDialogCancel className="font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-red-500/30 border border-zinc-500/30 dark:hover:border-red-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200"
                      >Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        type="submit"
                        className="font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-green-500/30 border border-zinc-500/30 dark:hover:border-green-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200"
                      >
                        Confirmar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </form>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            {/* Numbers */}
            <StatsGrid
              stats={[
                {
                  title: "Membros",
                  value: "37,429",
                  change: {
                    value: "+42%",
                    trend: "up",
                  },
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={18}
                      height={19}
                      fill="currentColor"
                    >
                      <path d="M2 9.5c0 .313.461.858 1.53 1.393C4.914 11.585 6.877 12 9 12c2.123 0 4.086-.415 5.47-1.107C15.538 10.358 16 9.813 16 9.5V7.329C14.35 8.349 11.827 9 9 9s-5.35-.652-7-1.671V9.5Zm14 2.829C14.35 13.349 11.827 14 9 14s-5.35-.652-7-1.671V14.5c0 .313.461.858 1.53 1.393C4.914 16.585 6.877 17 9 17c2.123 0 4.086-.415 5.47-1.107 1.069-.535 1.53-1.08 1.53-1.393v-2.171ZM0 14.5v-10C0 2.015 4.03 0 9 0s9 2.015 9 4.5v10c0 2.485-4.03 4.5-9 4.5s-9-2.015-9-4.5ZM9 7c2.123 0 4.086-.415 5.47-1.107C15.538 5.358 16 4.813 16 4.5c0-.313-.461-.858-1.53-1.393C13.085 2.415 11.123 2 9 2c-2.123 0-4.086.415-5.47 1.107C2.461 3.642 2 4.187 2 4.5c0 .313.461.858 1.53 1.393C4.914 6.585 6.877 7 9 7Z" />
                    </svg>
                  ),
                },
                {
                  title: "Tarefas pendentes",
                  value: "427,296",
                  change: {
                    value: "+12%",
                    trend: "up",
                  },
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M16 14v2.2l1.6 1" /><path d="M16 4h2a2 2 0 0 1 2 2v.832" /><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2" /><circle cx="16" cy="16" r="6" /><rect x="8" y="2" width="8" height="4" rx="1" /></svg>
                  ),
                },
                {
                  title: "Tarefas totais",
                  value: "$82,439",
                  change: {
                    value: "+37%",
                    trend: "up",
                  },
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="m9 14 2 2 4-4" /></svg>
                  ),
                },
              ]}
            />
            {/* Table */}
            <div className="min-h-[100vh] flex-1 md:min-h-min">
              <ContactsTables />
            </div>
          </div>}
      </SidebarInset>
    </SidebarProvider>
  );
}
