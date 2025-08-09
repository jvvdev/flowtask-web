import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlowTask",
};

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/breadcrumb";
import { Separator } from "@/components/separator";
import UserDropdown from "@/components/user-dropdown";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/sidebar";
import BigCalendar from "@/components/big-calendar";
import { SiderBarDefault } from "@/components/sidebarDefault";

export default function Page() {
  return (
    <SidebarProvider>
      <SiderBarDefault />
      
      <SidebarInset className="md:border-l border-zinc-200/10 md:rounded-l-2xl px-4">
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
                  <BreadcrumbPage>Tarefas</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex gap-3 ml-auto">
            
            <UserDropdown />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-2 pt-0">
          <BigCalendar />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
