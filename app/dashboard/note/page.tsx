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
import { NotesComponent } from "@/components/integrar/notes/notesComponent";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/alert-dialog";
import { ALargeSmall, MessageCircle, Plus } from "lucide-react";
import { Input } from "@/components/input";
import { useForm } from "react-hook-form";
import { relatoryService } from "@/api/dashboard/relatory-service";

type NoteForm = {
  name: string;
  content: string;
};

export default function Notes() {
  const { register, handleSubmit } = useForm<NoteForm>();

  function handleCreateNote(data: NoteForm) {
    relatoryService.createRelatory(data);
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
            <AlertDialog>
              <AlertDialogTrigger
                className="p-2 flex items-center justify-center gap-2 rounded-md text-sm font-semibold bg-green-500/15 dark:bg-green-500/20 hover:bg-green-500/20 dark:hover:bg-green-500/30 border border-green-500/20 text-green-500 cursor-pointer"
              >
                <Plus className="size-5" />
                <span className="hidden sm:block">Adicionar nota</span>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Adicionar nota</AlertDialogTitle>
                  <AlertDialogDescription>
                    Aqui você pode adicionar novas notas para gerenciar.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <form onSubmit={handleSubmit(handleCreateNote)}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 dark:text-zinc-200/80"><ALargeSmall size={20} />Nome</p>
                      <Input
                        placeholder="Digite aqui"
                        className="mb-2"
                        {...register("name")}
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 dark:text-zinc-200/80"><MessageCircle size={20} />Conteúdo</p>
                      <Input
                        placeholder="Digite aqui"
                        className="mb-2"
                        {...register("content")}
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

          <NotesComponent />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}