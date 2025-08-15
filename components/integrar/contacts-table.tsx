'use client'

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Button } from "../button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/popover";
import { Input } from "../input";
import { RiFilter3Line, RiSearch2Line } from "@remixicon/react";
import { ALargeSmall, ArchiveRestore, CalendarCheck2, ChartPie, Check, ClipboardCheck, ClipboardClock, LoaderCircle, MailSearch, Pencil, Trash2, TriangleAlert, UserCog } from "lucide-react";
import { CircularProgress } from "../circularProgress";
import { useRouter } from "next/navigation";
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
import { memberService } from "@/api/dashboard/member-service";
import { useForm } from "react-hook-form";

const Projects = [
  { id: 1, Name: "Ana Paula Souza", Email: "ana.souza@empresa.com", PendingTasks: 4, TotalTasks: 20 },
  { id: 2, Name: "Carlos Eduardo Lima", Email: "carlos.lima@empresa.com", PendingTasks: 7, TotalTasks: 22 },
  { id: 3, Name: "Fernanda Oliveira", Email: "fernanda.oliveira@empresa.com", PendingTasks: 0, TotalTasks: 30 },
  { id: 4, Name: "Bruno Costa", Email: "bruno.costa@empresa.com", PendingTasks: 12, TotalTasks: 40 },
  { id: 5, Name: "Juliana Pereira", Email: "juliana.pereira@empresa.com", PendingTasks: 5, TotalTasks: 25 },
  { id: 6, Name: "Marcos Vinicius", Email: "marcos.vinicius@empresa.com", PendingTasks: 0, TotalTasks: 18 },
  { id: 7, Name: "Patricia Lima", Email: "patricia.lima@empresa.com", PendingTasks: 4, TotalTasks: 28 },
  { id: 8, Name: "Rafael Almeida", Email: "rafael.almeida@empresa.com", PendingTasks: 9, TotalTasks: 26 },
  { id: 9, Name: "Camila Santos", Email: "camila.santos@empresa.com", PendingTasks: 0, TotalTasks: 19 },
  { id: 10, Name: "Lucas Martins", Email: "lucas.martins@empresa.com", PendingTasks: 3, TotalTasks: 24 },
];

export function ContactsTables() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<typeof Projects>([]);
  const [selectedMember, setSelectedMember] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const currentPage = 1;
  const totalPages = 1;

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    setTimeout(() => {
      setData(Projects);
      setIsLoading(false);
    }, 0);
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4 gap-2">
        <div className="relative">
          <Input
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar pelo nome"
            className="peer min-w-40 ps-9 bg-background bg-gradient-to-br from-accent/60 to-accent"
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/60 peer-disabled:opacity-50">
            <RiSearch2Line size={20} aria-hidden="true" />
          </div>
        </div>

        <div className="flex gap-2">
          {
            selectedMember > 0 && (
              <div className="flex gap-2">
                <AlertDialog>
                  <AlertDialogTrigger
                    className="px-2 flex items-center justify-center gap-2 rounded-md text-sm font-semibold bg-yellow-500/15 dark:bg-yellow-500/20 hover:bg-yellow-500/20 dark:hover:bg-yellow-500/30 border border-yellow-500/20 text-yellow-500 cursor-pointer"
                  >
                    <Pencil className="size-5" />
                    <span className="hidden sm:block">Modificar</span>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Modificar membro</AlertDialogTitle>
                      <AlertDialogDescription>
                        Aqui você pode modificar os detalhes do membro selecionado.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <form onSubmit={handleSubmit(memberService.ModifyMember)}>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <p className="flex items-center gap-2 dark:text-zinc-200/80"><ALargeSmall size={20} />Nome</p>
                          <Input
                            placeholder="Nome"
                            className="mb-2"
                            defaultValue={data.find(item => item.id === selectedMember)?.Name || ""}
                            {...register("name")}
                          />
                        </div>
                        <div className="space-y-2">
                          <p className="flex items-center gap-2 dark:text-zinc-200/80"><MailSearch size={20} />Email</p>
                          <Input
                            placeholder="Email"
                            className="mb-2"
                            defaultValue={data.find(item => item.id === selectedMember)?.Email || ""}
                            {...register("email")}
                          />
                        </div>
                        <div className="space-y-2">
                          <p className="flex items-center gap-2 dark:text-zinc-200/80"><ClipboardClock size={20} />Tarefas pendentes</p>
                          <Input
                            placeholder="Nome"
                            className="mb-2"
                            defaultValue={data.find(item => item.id === selectedMember)?.PendingTasks || ""}
                            {...register("pendingTasks")}
                          />
                        </div>
                        <div className="space-y-2">
                          <p className="flex items-center gap-2 dark:text-zinc-200/80"><ClipboardCheck size={20} />Tarefas concluídas</p>
                          <Input
                            placeholder="Nome"
                            className="mb-2"
                            defaultValue={data.find(item => item.id === selectedMember)?.TotalTasks || ""}
                            {...register("totalTasks")}
                          />
                        </div>
                      </div>

                      <AlertDialogFooter className="mt-6">
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction className="font-semibold bg-yellow-500/15 dark:bg-yellow-500/20 hover:bg-yellow-500/20 dark:hover:bg-yellow-500/30 border border-yellow-500/20 text-yellow-500 cursor-pointer">Confirmar</AlertDialogAction>
                      </AlertDialogFooter>
                    </form>
                  </AlertDialogContent>
                </AlertDialog>

                <Button className="bg-red-500/15 dark:bg-red-500/20 hover:bg-red-500/20 dark:hover:bg-red-500/30 border border-red-500/20 text-red-500 cursor-pointer"
                  onClick={() => {
                    memberService.DeleteMember(selectedMember);
                  }}
                >
                  <Trash2 className="size-5" />
                  <span className="hidden sm:block">Excluir</span>
                </Button>
              </div>
            )
          }

          {/* <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <RiFilter3Line
                  className="size-5 -ms-1.5 text-muted-foreground/60"
                  size={20}
                  aria-hidden="true"
                />
                <span className="hidden sm:block">Filtrar</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto min-w-36 p-3" align="end">
              <div className="space-y-3">
                <div className="text-xs font-medium uppercase text-muted-foreground/60">
                  Status
                </div>
                <div className="space-y-3">

                </div>
              </div>
            </PopoverContent>
          </Popover> */}
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-[1565px] table-fixed border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><ALargeSmall size={18} /> Nome</p>
              </TableHead>
              <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><MailSearch size={18} /> Email</p>
              </TableHead>
              <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><ClipboardClock size={18} /> Tarefas pendentes</p>
              </TableHead>
              <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><ClipboardCheck size={18} /> Tarefas concluídas</p>
              </TableHead>
              <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><LoaderCircle size={18} /> Porcentual de tarefas</p>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? "" : data.length > 0 ? (
              data
                .filter(item => item.Name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map(item => {
                  // completed task calc
                  const completed = item.TotalTasks - item.PendingTasks;
                  const taskProgress = item.TotalTasks > 0 ? Math.round((completed / item.TotalTasks) * 100) : 0;
                  return (
                    <TableRow
                      key={item.id}
                      className="border-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg h-px hover:bg-accent/50"
                    >
                      <TableCell className="flex gap-2">
                        <button
                          className={`border rounded-sm ${selectedMember === item.id ? "bg-green-400 dark:bg-green-600 p-[3px]" : "w-5.5"}`}
                          onClick={() => {
                            if (selectedMember === item.id) setSelectedMember(0);
                            else setSelectedMember(item.id);
                          }}
                        >
                          <Check className={`${selectedMember === item.id ? "block" : "hidden"}`} size={12} />
                        </button>
                        <p className="w-full overflow-hidden whitespace-nowrap text-ellipsis font-semibold">{item.Name}</p>
                      </TableCell>
                      <TableCell>
                        <p className="overflow-hidden whitespace-nowrap text-ellipsis">{item.Email}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-semibold">{item.PendingTasks}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-semibold">{completed}</p>
                      </TableCell>
                      <TableCell className="flex items-center gap-2">
                        {/* Porcentagem de tarefas concluídas */}
                        <CircularProgress progress={taskProgress} />
                        <span className="text-sm flex">{taskProgress}<span className="text-zinc-600 dark:text-zinc-400 ms-0.5">%</span></span>
                      </TableCell>
                    </TableRow>
                  );
                })
            ) : ""}
          </TableBody>
        </Table>
      </div>

      {
        isLoading ? <div className="w-full flex justify-center items-center mt-5">
          <p className="text-center text-zinc-500 font-semibold dark:text-zinc-400">Carregando...</p>
        </div> : data.length > 0 ?
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
            <p
              className="flex-1 whitespace-nowrap text-sm text-muted-foreground"
              aria-live="polite"
            >
              Página{" "}
              <span className="text-foreground">{currentPage}</span> de{" "}
              <span className="text-foreground">{totalPages}</span>
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                aria-label="Página anterior"
                onClick={() => {

                }}
                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                aria-label="Próxima página"
                onClick={() => {

                }}
                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
              >
                Próxima
              </Button>
            </div>
          </div> : <div className="w-full flex justify-center items-center mt-5">
            <p className="text-center font-semibold">Nenhum projeto encontrado</p>
          </div>
      }
    </div>
  );
}
