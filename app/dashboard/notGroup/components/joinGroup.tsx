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

interface JoinGroupForm {
  selectedGroup?: string
  customName?: string
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
  const [selectedOption, setSelectedOption] = useState<"select" | "custom">("select")
  const { register, handleSubmit, setValue, watch, reset } = useForm<JoinGroupForm>()

  useEffect(() => {
    if (isOpen) {
      reset()
      setSelectedOption("select")
    }
  }, [isOpen, reset])

  const handleGroupSelect = (value: string) => {
    setValue("selectedGroup", value)
    setSelectedOption("select")
  }

  const onSubmit = (data: JoinGroupForm) => {
    if (selectedOption === "select" && data.selectedGroup) {
      const selectedGroupData = availableGroups.find((group) => group.id === data.selectedGroup)

      console.log("Grupo selecionado:", {
        id: data.selectedGroup,
        name: selectedGroupData?.name,
        members: selectedGroupData?.members,
        type: "existing_group",
      })

      // Aqui você pode fazer a requisição para entrar no grupo
      // Por exemplo: await joinGroup(data.selectedGroup)
    } else if (selectedOption === "custom" && data.customName) {
      console.log("Nome customizado:", {
        name: data.customName,
        type: "custom_group",
      })

    }
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
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="select-group"
                  name="option"
                  checked={selectedOption === "select"}
                  onChange={() => setSelectedOption("select")}
                  className="w-4 h-4"
                />
                <Label htmlFor="select-group" className="flex items-center gap-2 dark:text-zinc-200/80">
                  <Users size={20} />
                  Escolher grupo disponível
                </Label>
              </div>

              {selectedOption === "select" && (
                <Select onValueChange={handleGroupSelect}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um grupo" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableGroups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{group.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">{group.members} membros</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="custom-name"
                  name="option"
                  checked={selectedOption === "custom"}
                  onChange={() => setSelectedOption("custom")}
                  className="w-4 h-4"
                />
                <Label htmlFor="custom-name" className="flex items-center gap-2 dark:text-zinc-200/80">
                  <ALargeSmall size={20} />
                  { selectedOption === "custom" ? "Nome da equipe" : "Pedir para entrar" }
                </Label>
              </div>

              {selectedOption === "custom" && (
                <Input
                  placeholder="Digite aqui o nome da equipe que deseja entrar"
                  className="mb-2"
                  {...register("customName", { required: selectedOption === "custom" })}
                />
              )}
            </div>
          </div>

          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              className="font-semibold bg-green-500/15 dark:bg-green-500/20 hover:bg-green-500/20 dark:hover:bg-green-500/30 border border-green-500/20 text-green-500 cursor-pointer"
            >
              Solicitar entrada
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
