'use client'

import { Ellipsis, Plus, UsersRound, ArrowLeft, ALargeSmall, MessageCircleMore } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/alert-dialog";
import { useForm } from "react-hook-form";
import { Input } from "@/components/input";
import { teamService } from "@/api/dashboard/team-service";
import ThemeToggle from "@/components/theme-toggle";
import { JoinGroupDialog } from "./components/joinGroup";

type CreateTeamForm = {
  name: string;
  description?: string;
};

export default function NotGroupPage() {
  const [actualSelect, setActualSelect] = useState('')
  const { register, handleSubmit } = useForm<CreateTeamForm>();

  const onSubmit = (data: CreateTeamForm) => {
    teamService.createTeam(data);
  };

  return (
    <div className="min-h-dvh bg-background flex flex-col items-center justify-center dark:bg-zinc-950 p-6">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex flex-col mb-8">
          <p className="text-[16px] text-muted-foreground">Parece que você não está em nenhum grupo ainda...</p>
          <h1 className="text-2xl font-semibold text-foreground">Selecione uma das opções abaixo para continuar</h1>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Join Group Card */}
          <button
            onClick={() => setActualSelect('join')}
            className={`group relative overflow-hidden rounded-lg border p-6 ${actualSelect === 'join' ? 'border-primary/60' : 'group border-primary/20 hover:bg-zinc-900/5 hover:border-primary/60 cursor-pointer'} transition-colors`}>
            <div className="flex flex-col space-y-4">
              <div className="p-3 bg-primary/5 group-hover:bg-primary/10 rounded-lg w-fit">
                <UsersRound className="w-8 h-8 text-primary" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-card-foreground text-left">Entrar em um grupo</h2>
                <p className="text-sm text-muted-foreground text-left">
                  Perfeito para participar de grupos existentes e colaborar com outros membros
                </p>
              </div>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Acesso instantâneo ao grupo
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Participação em discussões
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Compartilhamento de conteúdo
                </li>
              </ul>
            </div>
          </button>

          {/* Create Group Card */}
          <button
            onClick={() => setActualSelect('create')}
            className={`relative overflow-hidden rounded-lg border p-6 ${actualSelect === 'create' ? 'border-primary/60' : 'group border-primary/20 hover:bg-zinc-900/5 hover:border-primary/60'} transition-colors cursor-pointer`}>
            <div className="flex flex-col space-y-4">
              <div className="p-3 bg-primary/5 group-hover:bg-primary/10 rounded-lg w-fit">
                <Plus className="w-8 h-8 text-primary" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-card-foreground text-left">Criar um grupo</h2>
                <p className="text-sm text-muted-foreground text-left">
                  Ideal para liderar e gerenciar seu próprio grupo com controle total
                </p>
              </div>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Controle administrativo completo
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Gerenciamento de membros
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Configurações personalizadas
                </li>
              </ul>
            </div>
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button variant="default" className="flex items-center gap-2 border border-destructive/40 bg-transparent hover:bg-destructive/10 hover:border-destructive/20 text-destructive cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            Sair da conta
          </Button>

          {
            actualSelect === 'join' ?
              <JoinGroupDialog /> : actualSelect === 'create' ?
                <AlertDialog>
                  <AlertDialogTrigger
                    className="px-8 py-2 bg-primary flex items-center justify-center gap-2 text-white dark:text-black rounded-md text-sm hover:bg-primary/90 cursor-pointer"
                  >
                    Continuar
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Adicionar equipe</AlertDialogTitle>
                      <AlertDialogDescription>
                        Aqui você pode adicionar novas equipes para gerenciar.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <p className="flex items-center gap-2 dark:text-zinc-200/80"><ALargeSmall size={20} />Nome da equipe</p>
                          <Input
                            placeholder="Digite aqui"
                            className="mb-2"
                            {...register("name", { required: true })}
                          />
                        </div>

                        <div className="space-y-2">
                          <p className="flex items-center gap-2 dark:text-zinc-200/80"><MessageCircleMore size={20} />Descrição da equipe</p>
                          <Input
                            placeholder="Digite aqui"
                            className="mb-2"
                            {...register("description", { required: true })}
                          />
                        </div>
                      </div>

                      <AlertDialogFooter className="mt-6">
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          type="submit"
                          className="font-semibold bg-green-500/15 dark:bg-green-500/20 hover:bg-green-500/20 dark:hover:bg-green-500/30 border border-green-500/20 text-green-500 cursor-pointer"
                        >
                          Criar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </form>
                  </AlertDialogContent>
                </AlertDialog> :
                <Button variant="default" className="px-8 bg-zinc-900/10 hover:bg-zinc-900/10 dark:bg-background dark:hover:bg-background text-black/70 dark:text-white/80 cursor-not-allowed">Continuar</Button>
          }
        </div>

        <div className="absolute bottom-16 right-16">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
