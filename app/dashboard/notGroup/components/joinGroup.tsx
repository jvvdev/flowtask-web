"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { ALargeSmall, Users } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select"
import { Input } from "@/components/input"
import { Label } from "@/components/label"
import { Separator } from "@/components/separator"
import { teamService } from "@/api/dashboard/team-service"

interface JoinGroupForm {
  email?: string
  id_group?: string
}

const availableGroups = [
  { id: "1", name: "Equipe de Desenvolvimento", members: 12 },
  { id: "2", name: "Marketing Digital", members: 8 },
  { id: "3", name: "Design UX/UI", members: 6 },
  { id: "4", name: "Vendas", members: 15 },
  { id: "5", name: "Suporte ao Cliente", members: 10 },
]

export function JoinGroupDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<"select" | "custom">("custom")
  const { register, handleSubmit, setValue, watch, reset } = useForm<JoinGroupForm>()

  const onSubmit = (data: JoinGroupForm) => {
    console.log(data)
    teamService.requestJoin(data)
  }

  return (
    <AlertDialog onOpenChange={setIsOpen}>
      <AlertDialogTrigger className="px-8 py-2 bg-primary flex items-center justify-center gap-2 rounded-md text-sm text-white dark:text-black hover:bg-primary/90 cursor-pointer">
        Continuar
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Entrar em um grupo</AlertDialogTitle>
          <AlertDialogDescription>Aqui você pode pedir para entrar em novas equipes.</AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="custom-name" className="flex items-center gap-2 dark:text-zinc-200/80">
                Email
              </Label>

              <Input
                placeholder="Digite aqui seu email"
                className="mb-2"
                {...register("email", { required: selectedOption === "custom" })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-name" className="flex items-center gap-2 dark:text-zinc-200/80">
                ID da equipe
              </Label>

              <Input
                placeholder="Digite aqui o ID"
                className="mb-2"
                {...register("id_group", { required: selectedOption === "custom" })}
              />
            </div>
          </div>

          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel className="font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-red-500/30 border border-zinc-500/30 dark:hover:border-red-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              className="font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-green-500/30 border border-zinc-500/30 dark:hover:border-green-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200"
            >
              Solicitar entrada
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
