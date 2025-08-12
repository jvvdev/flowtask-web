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
import { InfoCardToProjects } from "@/components/integrar/infoCard";
import { ProjectList } from "@/components/integrar/projectList";
import ThemeToggle from "@/components/theme-toggle";
import { KanbanProject } from "@/components/integrar/kanbanProject";

export default function Page() {
  return (
    <SidebarProvider className="">
      <SiderBarDefault />
      <SidebarInset className="md:border-l border-zinc-200/10 overflow-hidden px-4 md:px-6 lg:px-8 md:rounded-l-2xl">
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
                <a href="/dashboard/project" className="text-zinc-400">Projetos</a>
                <span className="text-zinc-400">/</span>
                <BreadcrumbItem>
                  <BreadcrumbPage>Manager System</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex gap-3 ml-auto">
            <ThemeToggle />
            <UserDropdown />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:px-8 lg:py-6">
          {/* Page intro */}
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl font-semibold">Manager System</h1>
            <Button>Adicionar tarefa</Button>
          </div>

          <KanbanProject />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}