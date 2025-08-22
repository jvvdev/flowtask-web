import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlowTask - Projetos",
};

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
import UserDropdown from "@/components/user-dropdown";
import { SiderBarDefault } from "@/components/sidebarDefault";
import { Button } from "@/components/button";
import { InfoCardToProjects } from "@/components/integrar/infoCardProject";
import { ProjectList } from "@/components/integrar/projectList";
import ThemeToggle from "@/components/theme-toggle";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/alert-dialog";
import { Input } from "@/components/input";
import { Plus, ALargeSmall, MailSearch, ClipboardClock, ClipboardCheck, ChartPie, TriangleAlert, LoaderCircle, CalendarCheck2, UserCog } from "lucide-react";


export default function Page() {
  function handleCreateTask() {
    console.log(window.location.href)
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
                  <BreadcrumbPage>Projetos</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex gap-3 ml-auto">
            <ThemeToggle />
            <UserDropdown />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
          {/* Page intro */}
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">Olá, Keith!</h1>
              <p className="text-sm text-muted-foreground">
                Aqui está uma visão geral dos seus projetos. Gerencie-os ou adicione novos com facilidade!
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger
                className="p-2 flex items-center justify-center gap-2 rounded-md text-sm font-semibold bg-green-500/15 dark:bg-green-500/20 hover:bg-green-500/20 dark:hover:bg-green-500/30 border border-green-500/20 text-green-500 cursor-pointer"
              >
                <Plus className="size-5" />
                <span className="hidden sm:block">Adicionar projeto</span>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Adicionar projeto</AlertDialogTitle>
                  <AlertDialogDescription>
                    Aqui você pode adicionar novos projetos para gerenciar.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <form>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 dark:text-zinc-200/80"><ALargeSmall size={20} />Nome</p>
                      <Input
                        placeholder="Digite aqui"
                        className="mb-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 dark:text-zinc-200/80"><ChartPie size={20} />Status</p>
                      <select
                        className="mb-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none"
                        defaultValue=""
                        name="status"
                      >
                        <option value="" disabled>Selecione o status</option>
                        <option value="Baixa">Não iniciado</option>
                        <option value="Media">Em progresso</option>
                        <option value="Alta">Concluído</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 dark:text-zinc-200/80"><TriangleAlert size={20} />Prioridade</p>
                      <select
                        className="mb-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none"
                        defaultValue=""
                        name="prioridade"
                      >
                        <option value="" disabled>Selecione a prioridade</option>
                        <option value="Baixa">Baixa</option>
                        <option value="Media">Média</option>
                        <option value="Alta">Alta</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 dark:text-zinc-200/80"><LoaderCircle size={20} />Progresso</p>
                      <Input
                        placeholder="Digite aqui"
                        className="mb-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 dark:text-zinc-200/80"><CalendarCheck2 size={20} />Data de entrega</p>
                      <Input
                        placeholder="Digite aqui"
                        className="mb-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 dark:text-zinc-200/80"><UserCog size={20} />Responsável</p>
                      <Input
                        placeholder="Digite aqui"
                        className="mb-2"
                      />
                    </div>
                  </div>

                  <AlertDialogFooter className="mt-6">
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      type="submit"
                      className="font-semibold bg-green-500/15 dark:bg-green-500/20 hover:bg-green-500/20 dark:hover:bg-green-500/30 border border-green-500/20 text-green-500 cursor-pointer"
                    >
                      Confirmar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </form>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* info card */}
          <InfoCardToProjects />

          {/* project list */}
          <ProjectList />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}