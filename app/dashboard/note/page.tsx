import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlowTask  - Relatórios",
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
import { Button } from "@/components/button";
import { NotesComponent } from "@/components/integrar/notes/notesComponent";

export default function Notes() {
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
                  <BreadcrumbPage>Relatórios</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex gap-3 ml-auto">
            <ThemeToggle />
            <UserDropdown />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 lg:gap-6 pt-4 lg:pt-6">
          {/* Page intro */}
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">Olá, Keith!</h1>
              <p className="text-xs md:text-sm text-muted-foreground">
                Confira a visão geral dos seus relatórios e gerencie ou adicione novos com rapidez e facilidade!
              </p>
            </div>
            <Button className="px-3">Adicionar Relatório</Button>
          </div>

          <NotesComponent />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}