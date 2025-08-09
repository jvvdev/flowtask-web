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
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/sidebar";
import UserDropdown from "@/components/user-dropdown";
import { SiderBarDefault } from "@/components/sidebarDefault";
import ThemeToggle from "@/components/theme-toggle";

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

      </SidebarInset>
    </SidebarProvider>
  );
}