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
import { ALargeSmall, ArchiveRestore, Briefcase, CalendarCheck2, ChartPie, Check, ClipboardCheck, ClipboardClock, LoaderCircle, MailSearch, Pencil, Trash2, TriangleAlert, UserCog } from "lucide-react";
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
import axios from "axios";
import { routes } from "@/api/routes";
import { teamService } from "@/api/dashboard/team-service";
import { authService } from "@/api/auth-service";

const Projects = [
  { user_id: "", name: "Ana Paula Souza", role: "owner", email: "ana.souza@empresa.com", PendingTasks: 4, TotalTasks: 20 },
];

type Member = {
  user_id: string;
  name: string;
  role: string;
  email: string;
  PendingTasks: number;
  TotalTasks: number;
};

const ITEMS_PER_PAGE = 9;

export function ContactsTables() {
  const [isLoading, setIsLoading] = useState(true);
const [data, setData] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState("");
const [selectedMemberData, setSelectedMemberData] = useState<Member | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    async function getData() {
      const sessionId = await authService.getToken();
      const actualTeamRaw = await teamService.getTeamByUser();
      if (!actualTeamRaw) return;
      const actualTeam: { id_group: string } = JSON.parse(actualTeamRaw as string);

      await axios.get(routes.getMembersByTeam + actualTeam.id_group, {
        headers: {
          AuthToken: sessionId
        }
      }).then(res => {
        setData(res.data.data)
        setIsLoading(false)
      }).catch(err => {
        console.error(err)
      });
    }
    getData();
  }, []);

  // Atualiza os valores do formulário ao trocar o membro selecionado
  useEffect(() => {
    if (selectedMember !== "") {
      const member = data.find(item => item.user_id === selectedMember);
      if (member) {
        reset({
          id: member.user_id,
          name: member.name,
          email: member.email,
          pendingTasks: member.PendingTasks,
          totalTasks: member.TotalTasks,
        });
      }
    }
  }, [selectedMember, data, reset]);

  // Filtra e pagina os dados
  const filteredData = data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4 gap-2">
        <div className="relative">
          <Input
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar pelo nome"
            className="peer min-w-40 ps-9 bg-zinc-500/20 dark:bg-zinc-500/10 border border-zinc-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200"
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/60 peer-disabled:opacity-50">
            <RiSearch2Line size={20} aria-hidden="true" />
          </div>
        </div>

        <div className="flex gap-2">
          {
            selectedMember !== "" && (
              <div className="flex gap-2">
                {/* <AlertDialog>
                  <AlertDialogTrigger
                    className="px-2 flex items-center justify-center gap-2 rounded-md text-sm font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-yellow-300/30 border border-zinc-500/30 dark:hover:border-yellow-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200"
                  >
                    <Pencil className="size-5 text-yellow-600" />
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
                        <Input
                          placeholder="Nome"
                          className="hidden"
                          defaultValue={data.find(item => item.user_id === selectedMember)?.user_id || ""}
                          {...register("id")}
                        />
                        <div className="space-y-2">
                          <p className="text-sm flex items-center gap-2 dark:text-zinc-200/80">Nome</p>
                          <Input
                            placeholder="Ex: Keith Adams"
                            className="mb-2"
                            defaultValue={data.find(item => item.user_id === selectedMember)?.name || ""}
                            {...register("name")}
                          />
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm flex items-center gap-2 dark:text-zinc-200/80">Email</p>
                          <Input
                            placeholder="Ex: keith@example.com"
                            className="mb-2"
                            defaultValue={data.find(item => item.user_id === selectedMember)?.email || ""}
                            {...register("email")}
                          />
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm flex items-center gap-2 dark:text-zinc-200/80">Tarefas pendentes</p>
                          <Input
                            placeholder="Ex: 15"
                            className="mb-2"
                            defaultValue={data.find(item => item.user_id === selectedMember)?.PendingTasks || ""}
                            {...register("pendingTasks")}
                          />
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm flex items-center gap-2 dark:text-zinc-200/80">Tarefas concluídas</p>
                          <Input
                            placeholder="Ex: 30"
                            className="mb-2"
                            defaultValue={data.find(item => item.user_id === selectedMember)?.TotalTasks || ""}
                            {...register("totalTasks")}
                          />
                        </div>
                      </div>

                      <AlertDialogFooter className="mt-6">
                        <AlertDialogCancel className="font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-red-500/30 border border-zinc-500/30 dark:hover:border-red-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200">Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          type="submit"
                          className="font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-green-500/30 border border-zinc-500/30 dark:hover:border-green-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200"
                        >
                          Confirmar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </form>
                  </AlertDialogContent>
                </AlertDialog> */}

                <AlertDialog>
                  <AlertDialogTrigger
                    className="p-2 flex items-center justify-center gap-2 rounded-md text-sm group font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-red-500/30 border border-zinc-500/30 dark:hover:border-red-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer"
                  >
                    <Trash2 className="size-5 text-red-500" />
                    <span className="hidden sm:block">Expulsar</span>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Expulsar membro</AlertDialogTitle>
                      <AlertDialogDescription>
                        Você tem certeza que deseja expulsar o membro selecionado?
                      </AlertDialogDescription>
                    </AlertDialogHeader>



                    <AlertDialogFooter className="mt-6">
                      <AlertDialogCancel className="font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-red-500/30 border border-zinc-500/30 dark:hover:border-red-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200">Cancelar</AlertDialogCancel>
                      <AlertDialogAction
onClick={() => {
                          if (selectedMemberData) {
                            memberService.DeleteMember(selectedMemberData.email);
                          }
                        }}
                        type="submit"
                        className="font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-green-500/30 border border-zinc-500/30 dark:hover:border-green-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200"
                      >
                        Confirmar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
              <TableHead className="relative h-9 select-none bg-zinc-500/20 dark:bg-zinc-500/10 border-zinc-500/30 border-y first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><ALargeSmall size={18} /> Nome</p>
              </TableHead>
              <TableHead className="relative h-9 select-none bg-zinc-500/20 dark:bg-zinc-500/10 border-zinc-500/30 border-y first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><Briefcase size={18} /> Cargo</p>
              </TableHead>
              <TableHead className="relative h-9 select-none bg-zinc-500/20 dark:bg-zinc-500/10 border-zinc-500/30 border-y first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><MailSearch size={18} /> Email</p>
              </TableHead>
              {/* <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><ClipboardClock size={18} /> Tarefas pendentes</p>
              </TableHead>
              <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><ClipboardCheck size={18} /> Tarefas concluídas</p>
              </TableHead>
              <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500"><LoaderCircle size={18} /> Porcentual de tarefas</p>
              </TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? null : paginatedData.length > 0 ? (
              paginatedData.map(item => {
                // completed task calc
                const completed = item.TotalTasks - item.PendingTasks;
                const taskProgress = item.TotalTasks > 0 ? Math.round((completed / item.TotalTasks) * 100) : 0;
                return (
                  <TableRow
                    key={item.user_id}
                    className="border-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg h-px hover:bg-accent/50"
                  >
                    <TableCell className="flex gap-2">
                      <button
                        className={`border rounded-sm ${selectedMember === item.user_id ? "bg-green-400 dark:bg-green-600 p-[3px]" : "w-5.5"}`}
                        onClick={() => {
                          if (selectedMember === item.user_id) setSelectedMember(""), setSelectedMemberData(null);
else setSelectedMember(item.user_id), setSelectedMemberData(item);
                        }}
                      >
                        <Check className={`${selectedMember === item.user_id ? "block" : "hidden"}`} size={12} />
                      </button>
                      <p className="w-full overflow-hidden whitespace-nowrap text-ellipsis font-semibold">{item.name}</p>
                    </TableCell>
                    <TableCell>
                      <p className="overflow-hidden whitespace-nowrap text-ellipsis">{item.role === "owner" ? "Dono" : "Membro"}</p>
                    </TableCell>
                    <TableCell>
                      <p className="overflow-hidden whitespace-nowrap text-ellipsis">{item.email}</p>
                    </TableCell>
                    {/* <TableCell>
                      <p className="font-semibold">{item.PendingTasks}</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-semibold">{completed}</p>
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <CircularProgress progress={taskProgress} />
                      <span className="text-sm flex">{taskProgress}<span className="text-zinc-600 dark:text-zinc-400 ms-0.5">%</span></span>
                    </TableCell> */}
                  </TableRow>
                );
              })
            ) : null}
          </TableBody>
        </Table>
      </div>

      {
        isLoading ? <div className="w-full flex justify-center items-center mt-5">
          <p className="text-center text-zinc-500 font-semibold dark:text-zinc-400">Carregando...</p>
        </div> : totalPages === 1 ? "" : filteredData.length > 0 ?
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
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                aria-label="Próxima página"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
