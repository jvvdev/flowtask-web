import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlowTask - Dashboard",
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
import ThemeToggle from "@/components/theme-toggle";
import { InfoCardToTasks } from "@/app/dashboard/components/infoCardTask";
import { ListProductivity } from "./components/listProductivity";
import { ListLogs } from "./components/listLogs";
import { ChartOverHeat } from "./components/chartOverHeat";
import { ShortCutsWidget } from "./components/shortCuts";
import { MemberOverHeat } from "./components/memberOverHeat";

export default function Page() {
  return (
    <SidebarProvider className="p-2">
      <SiderBarDefault />
      <SidebarInset className="border border-zinc-200/10 overflow-hidden px-4 md:px-6 md:pr-10 md:rounded-2xl">
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
        <div className="flex flex-col gap-4 lg:gap-6 py-4 lg:py-6">
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
            <div className="w-full sm:w-[70%] h-full space-y-4">
              <InfoCardToTasks />

              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col 2xl:flex-row justify-between gap-4 h-[48%]">
                  <div className="flex flex-col xl:flex-row w-full justify-between gap-4">
                    {/* shortCuts */}
                    <ShortCutsWidget />
                    {/* list overheat members */}
                    <MemberOverHeat />
                  </div>
                  {/* graph tasks */}
                  <ChartOverHeat />
                </div>
              </div>
              {/* logs screen */}
              <ListLogs />
            </div>
            <ListProductivity />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}