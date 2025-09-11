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
import { Button } from "@/components/button";
import ThemeToggle from "@/components/theme-toggle";
import { KanbanProject } from "@/components/integrar/kanbanProject";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/alert-dialog";
import { ALargeSmall, CalendarCheck2, ChartPie, LoaderCircle, MessageCircle, Plus, TriangleAlert, UserCog } from "lucide-react";
import { Input } from "@/components/input";
import { routes } from "@/api/routes";
import axios from "axios";
import { authService } from "@/api/auth-service";
import { set } from "date-fns";
import { useForm } from "react-hook-form";
import { kanbanService } from "@/api/dashboard/kanban-service";

interface KanbanComment {
  id: string;
  content: string;
  createdAt: string;
  // outros campos se necessário
}

interface KanbanTask {
  id_kanban: string;
  id_project: string;
  title: string;
  priority: number;
  description: string;
  status: string;
  comments: KanbanComment[] | null;
  createdBy: string;
  createdAt: string;
};

interface ProjectInfo {
  title: string;
  resume: string;
  // Adicione outros campos conforme necessário
}

interface TaskForm {
  name: string;
  description: string;
  priority: string;
}

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<KanbanTask[]>([]);
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>({ title: "", resume: "" });
  const { register, handleSubmit } = useForm<TaskForm>();

  useEffect(() => {
    async function getData() {
      const sessionId = await authService.getToken();
      await axios.get(routes.getKanbanByProject + params.projectID, {
        headers: {
          AuthToken: sessionId
        }
      }).then(res => {
        setData(res.data.data)
      }).catch(err => {
        console.error(err)
      });
    }
    getData()
  }, [params.projectID, router]);

  function handleCreateTask(data: TaskForm) {
    const projectId = window.location.href.split('/dashboard/project/')[1]
    kanbanService.createTask(data, projectId);
  }

  useEffect(() => {
    async function getData() {
      const sessionId = await authService.getToken();

      await axios.get(routes.getProjectDetails + params.projectID, {
        headers: {
          AuthToken: sessionId
        }
      }).then(res => {
        setProjectInfo(res.data.data)
      }).catch(err => {
        console.error(err)
      });
    }

    getData();
  }, [])

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
                <Link href="/dashboard/project" className="text-zinc-400">Tarefas</Link>
                <span className="text-zinc-400">/</span>
                <BreadcrumbItem>
                  <BreadcrumbPage>{projectInfo.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex gap-3 ml-auto">
            <ThemeToggle />
            <UserDropdown />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-3 lg:gap-3 py-4 lg:px-8 lg:py-6">
          {/* Page intro */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold">{projectInfo.title}</h1>
              <p className="text-sm text-zinc-400">{projectInfo.resume}</p>
            </div>
            <div>
              <AlertDialog>
                <AlertDialogTrigger
                  className="p-2 flex items-center justify-center gap-2 rounded-md text-sm font-semibold bg-green-500/15 dark:bg-green-500/20 hover:bg-green-500/20 dark:hover:bg-green-500/30 border border-green-500/20 text-green-500 cursor-pointer"
                >
                  <Plus className="size-5" />
                  <span className="hidden sm:block">Criar tarefa</span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Criar tarefa</AlertDialogTitle>
                    <AlertDialogDescription>
                      Aqui você pode criar novas tarefas para gerenciar.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <form onSubmit={handleSubmit(handleCreateTask)}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="flex items-center gap-2 dark:text-zinc-200/80"><ALargeSmall size={20} />Nome</p>
                        <Input
                          placeholder="Digite aqui"
                          className="mb-2"
                          {...register("name", { required: true })}
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="flex items-center gap-2 dark:text-zinc-200/80"><MessageCircle size={20} />Descrição</p>
                        <Input
                          placeholder="Digite aqui"
                          className="mb-2"
                          {...register("description", { required: true })}
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="flex items-center gap-2 dark:text-zinc-200/80"><TriangleAlert size={20} />Prioridade</p>
                        <select
                          className="mb-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none"
                          defaultValue="0"
                          {...register("priority", { required: true })}
                        >
                          <option value="" disabled>Selecione a prioridade</option>
                          <option value="0">Baixa</option>
                          <option value="1">Média</option>
                          <option value="2">Alta</option>
                        </select>
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
          </div>

          <KanbanProject kanbanList={data} setKanbanList={setData} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}