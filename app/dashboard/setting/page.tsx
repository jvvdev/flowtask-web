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
import { SiderBarDefault } from "@/components/sidebarDefault";
import ThemeToggle from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { ALargeSmall, Handshake, UserCog } from "lucide-react";
import { useState } from "react";
import Subscriptions from "./components/Subscriptions";
import { AccountSettings } from "./components/AccountSettings";
import { Preferences } from "./components/Preferences";

export default function Settings() {
  const [currentTab, setCurrentTab] = useState(0)

  return (
    <SidebarProvider className="p-2">
      <SiderBarDefault />
      <SidebarInset className="border border-zinc-200/10 overflow-hidden px-4 md:px-6 lg:px-8 md:rounded-2xl">
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
                  <BreadcrumbPage>Configurações</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">

          <div className="flex justify-betweenh-full w-full gap-4">

            <div className="w-[25%]">
              <div className="space-y-1">
                <h1 className="text-3xl font-semibold">Configurações</h1>
                <p className="text-sm text-muted-foreground">
                  Aqui você consegue gerenciar suas configurações de conta, preferências e etc.
                </p>
              </div>

              <div className="flex items-center gap-3 p-2 mt-5 bg-zinc-200/70 dark:bg-zinc-800/70 dark:border-zinc-200/5 dark:text-zinc-50/90 border rounded-lg">
                <Avatar className="size-14">
                  <AvatarImage
                    src="https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/user_sam4wh.png"
                    width={32}
                    height={32}
                    alt="Profile image"
                  />
                  <AvatarFallback>AL</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <p className="text-lg font-semibold">Adriel Lucas</p>
                  <span className="text-sm text-muted-foreground">a.dev@gmail.com</span>
                </div>
              </div>

              <button onClick={() => setCurrentTab(1)} className={`w-full mt-4 p-2 flex items-center gap-2 rounded-lg border border-b-0 ${currentTab === 1 ? 'bg-blue-500/70 text-zinc-50' : 'bg-zinc-200/70 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800/70 dark:border-zinc-200/5 dark:text-zinc-50/80'} cursor-pointer duration-200`}>
                <Handshake className="p-1.5 bg-green-600/70 text-zinc-50 rounded-md" size={32} />
                <p className="text-md font-semibold">Assinaturas</p>
              </button>

              <button onClick={() => setCurrentTab(2)} className={`w-full mt-4 p-2 flex items-center gap-2 rounded-t-lg border border-b-0 ${currentTab === 2 ? 'bg-blue-500/70 text-zinc-50' : 'bg-zinc-200/70 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800/70 dark:border-zinc-200/5 dark:text-zinc-50/80'} cursor-pointer duration-200`}>
                <UserCog className="p-1.5 bg-zinc-500/70 text-zinc-50 rounded-md" size={32} />
                <p className="text-md font-semibold">Configurações da conta</p>
              </button>
              <button onClick={() => setCurrentTab(3)} className={`w-full p-2 flex items-center gap-2 rounded-b-lg border ${currentTab === 3 ? 'bg-blue-500/70 text-zinc-50' : 'bg-zinc-200/70 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800/70 dark:border-zinc-200/5 dark:text-zinc-50/80'} cursor-pointer duration-200`}>
                <ALargeSmall className="p-1.5 bg-zinc-500/70 text-zinc-50 rounded-md" size={32} />
                <p className="text-md font-semibold">Preferências</p>
              </button>
            </div>

            <div className="w-[75%] border-l pl-4">
              {currentTab === 1 && <Subscriptions />}
              {currentTab === 2 && <AccountSettings />}
              {currentTab === 3 && <Preferences />}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}