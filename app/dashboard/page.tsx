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
import UserDropdown from "@/components/user-dropdown";
import { SiderBarDefault } from "@/components/sidebarDefault";
import ThemeToggle from "@/components/theme-toggle";
import { InfoCardToTasks } from "@/app/dashboard/components/infoCardTask";
import { ListProductivity } from "./components/listProductivity";
import { ListLogs } from "./components/listLogs";
import { ChartOverHeat } from "./components/chartOverHeat";
import { ShortCutsWidget } from "./components/shortCuts";
import { MemberOverHeat } from "./components/memberOverHeat";
import { teamService } from "@/api/dashboard/team-service";
import { authService } from "@/api/auth-service";
import { useEffect, useState } from "react";
import { Loader2, Users } from "lucide-react";

export default function Page() {
  const [notActiveGroup, setNotActiveGroup] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      const sessionId = await authService.getToken();
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
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
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
          </div> : <div className="flex flex-col gap-4 lg:gap-6 py-4 lg:py-6">
            {/* Page intro */}
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold">Olá, Keith!</h1>
                <p className="text-sm text-muted-foreground">
                  Aqui está o panorama da sua empresa. Acompanhe indicadores, organize processos e mantenha tudo sob controle de forma simples e eficiente.
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-[55%] xl:w-[70%] h-full space-y-4">
                <InfoCardToTasks />

                <div className="flex flex-col gap-4 w-full">
                  <div className="flex flex-col xl:flex-row justify-between gap-4 h-[48%]">
                    {/* shortCuts */}
                    <ShortCutsWidget />
                    {/* graph tasks */}
                    <ChartOverHeat />
                  </div>
                </div>
                {/* logs screen */}
                <ListLogs />
              </div>


              <div className="w-full sm:w-[44%] xl:w-[30%] space-y-4">
                <MemberOverHeat />
                <ListProductivity />
              </div>
            </div>
          </div>}
      </SidebarInset>
    </SidebarProvider>
  );
}