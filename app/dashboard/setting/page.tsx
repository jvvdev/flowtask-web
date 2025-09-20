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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { ALargeSmall, Handshake, Undo2, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import Subscriptions from "./components/Subscriptions";
import { AccountSettings } from "./components/AccountSettings";
import { Preferences } from "./components/Preferences";
import { authService } from "@/api/auth-service";
import { routes } from "@/api/routes";
import axios from "axios";
import { Console } from "console";
import { NotifyDropdown } from "@/components/notifyDropdown";

interface UserData {
  name: string;
  email: string;
  avatar: string;
}

export default function Settings() {
  const [currentTab, setCurrentTab] = useState(0)
  const [data, setData] = useState<UserData>({ name: "", email: "", avatar: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const token = await authService.getToken();

      const userData = await authService.getUserData();
      if (userData) {
        setData(JSON.parse(userData) as UserData);
        setLoading(false)
        return;
      }

      await axios.get(routes.getUser + token).then((response) => {
        setData(response.data);
        authService.setUserData(response.data);
        setLoading(false)
      }).catch((err) => {
        console.log(err);
      })
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
                  <a href="/dashboard" className="text-zinc-400">Dashboard</a>
                </BreadcrumbItem>
                <span className="text-zinc-400">/</span>
                <BreadcrumbItem>
                  <BreadcrumbPage>Configurações</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <NotifyDropdown />
        </header>
        <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">

          <div className="flex justify-betweenh-full w-full gap-4">

            <div className={`${currentTab === 0 ? "w-full" : "hidden md:block"} md:w-[40%] xl:w-[25%]`}>
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold">Configurações</h1>
                <p className="text-sm text-muted-foreground">
                  Aqui você consegue gerenciar suas configurações de conta, preferências e etc.
                </p>
              </div>

              <div className="flex items-center gap-3 p-2 mt-5 bg-zinc-200/70 dark:bg-zinc-800/70 dark:border-zinc-200/5 dark:text-zinc-50/90 border rounded-lg">
                {
                  loading ? (
                    <div className="w-14 h-14 bg-zinc-300/70 dark:bg-zinc-700/70 rounded-full animate-pulse" />
                  ) : (
                    <Avatar className="size-14">
                      <AvatarImage
                        src={data.avatar}
                        width={32}
                        height={32}
                        alt="Profile image"
                      />
                      <AvatarFallback>-</AvatarFallback>
                    </Avatar>
                  )}

                <div className="flex flex-col">
                  {
                    loading ?
                      <div className="h-4 w-18 animate-pulse rounded bg-muted-foreground/20" /> :
                      <span className="font-semibold">
                        {data.name ? data.name : "Nome não disponível"}
                      </span>
                  }
                  {
                    loading ?
                      <div className="mt-2 h-4 w-40 animate-pulse rounded bg-muted-foreground/20" /> :
                      <span className="text-sm text-muted-foreground">
                        {data.email ? data.email : "Email não disponível"}
                      </span>
                  }

                </div>
              </div>

              <button onClick={() => setCurrentTab(1)} className={`w-full mt-4 p-2 flex items-center gap-2 rounded-lg border border-b-0 ${currentTab === 1 ? 'bg-blue-500/70 text-zinc-50' : 'bg-zinc-200/70 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800/70 dark:hover:bg-zinc-700/40 dark:border-zinc-200/5 dark:text-zinc-50/80'} cursor-pointer duration-200`}>
                <Handshake className="p-1.5 bg-green-600/70 text-zinc-50 rounded-md" size={32} />
                <p className="text-md font-semibold">Assinaturas</p>
              </button>

              <button onClick={() => setCurrentTab(2)} className={`w-full mt-4 p-2 flex items-center gap-2 rounded-t-lg border border-b-0 ${currentTab === 2 ? 'bg-blue-500/70 text-zinc-50' : 'bg-zinc-200/70 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800/70 dark:hover:bg-zinc-700/40 dark:border-zinc-200/5 dark:text-zinc-50/80'} cursor-pointer duration-200`}>
                <UserCog className="p-1.5 bg-zinc-400/80 dark:bg-zinc-950/40 text-zinc-50 rounded-md" size={32} />
                <p className="text-md font-semibold">Configurações da conta</p>
              </button>
              <button onClick={() => setCurrentTab(3)} className={`w-full p-2 flex items-center gap-2 rounded-b-lg border ${currentTab === 3 ? 'bg-blue-500/70 text-zinc-50' : 'bg-zinc-200/70 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800/70 dark:hover:bg-zinc-700/40 dark:border-zinc-200/5 dark:text-zinc-50/80'} cursor-pointer duration-200`}>
                <ALargeSmall className="p-1.5 bg-zinc-400/80 dark:bg-zinc-950/40 text-zinc-50 rounded-md" size={32} />
                <p className="text-md font-semibold">Preferências</p>
              </button>
            </div>

            <div className={`${currentTab === 0 ? "hidden" : "block"} w-full md:w-[60%] lg:w-[75%] md:border-l md:pl-4`}>
              {currentTab === 1 && <Subscriptions />}
              {currentTab === 2 && <AccountSettings />}
              {currentTab === 3 && <Preferences />}
            </div>

            <Undo2 className={`${currentTab === 0 ? "hidden" : "block md:hidden"} absolute left-4 top-22`} onClick={() => setCurrentTab(0)} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}