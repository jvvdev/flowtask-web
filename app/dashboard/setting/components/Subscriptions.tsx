import { Button } from "@/components/button";
import { Check, Star, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Subscriptions() {
  const router = useRouter();

  function redirectToPlan(planID: number) {
    if (planID) {
      router.push(`/dashboard/setting/billing/${planID}`);
    }
  }

  return (
    <div className="w-full py-2">
      <div className="text-2xl font-semibold flex justify-center w-full">Assinaturas</div>

      <p className="mt-4 text-lg font-semibold text-muted-foreground">Aqui você pode gerenciar seus planos</p>
      <div className="grid xl:grid-cols-2 2xl:grid-cols-3 mt-2 gap-4">

        <div className="p-4 w-full border bg-zinc-200/70 dark:bg-zinc-800/70 rounded-lg">
          <h1 className="text-xl font-semibold">Plano básico</h1>
          <p className="text-black/70 dark:text-zinc-200/80">Este plano ele foi desenvolvido somente para testar o sistema</p>
          <h2 className="font-bold font-mono text-xl my-1.5">GRATUITO</h2>
          <p className="text-black/70 dark:text-zinc-200/80 mb-1">Recursos do plano gratuito:</p>

          <div className="space-y-1">
            <p className="flex font-semibold gap-1"><Check />Controle de membros</p>
            <p className="flex font-semibold gap-1"><Check />Controle de tarefas</p>
            <p className="flex font-semibold gap-1"><X />Controle de projetos</p>
            <p className="flex font-semibold gap-1"><X />Controle de kanban's por projeto</p>
            <p className="flex font-semibold gap-1"><X />Inteligência artificial própria</p>
            <p className="flex font-semibold gap-1"><X />Acesso total ao painel</p>
          </div>

          <Button onClick={() => redirectToPlan(0)} className="w-full mt-3 py-5 font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-green-500/30 border border-zinc-500/30 dark:hover:border-green-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200">
            Selecionar plano
          </Button>
        </div>

        <div className="p-4 w-full border bg-zinc-200/70 dark:bg-zinc-800/70 rounded-lg">
          <h1 className="text-xl font-semibold">Plano MEI</h1>
          <p className="text-black/70 dark:text-zinc-200/80">Este plano é recomendado para empresas em desenvolvimento</p>
          <h2 className="font-bold font-mono text-xl my-1.5">R$ 19,99<span className="font-normal text-[16px]">/mês</span></h2>
          <p className="text-black/70 dark:text-zinc-200/80 mb-1">Recursos do plano gratuito:</p>

          <div className="space-y-1">
            <p className="flex font-semibold gap-1"><Check />Controle de membros</p>
            <p className="flex font-semibold gap-1"><Check />Controle de tarefas</p>
            <p className="flex font-semibold gap-1"><Check />Controle de projetos</p>
            <p className="flex font-semibold gap-1"><Check />Controle de kanban's por projeto</p>
            <p className="flex font-semibold gap-1"><X />Inteligência artificial própria</p>
            <p className="flex font-semibold gap-1"><X />Acesso total ao painel</p>
          </div>

          <Button onClick={() => redirectToPlan(1)} className="w-full mt-3 py-5 font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-green-500/30 border border-zinc-500/30 dark:hover:border-green-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200">
            Selecionar plano
          </Button>
        </div>

        <div className="p-4 w-full border bg-zinc-200/70 dark:bg-zinc-800/70 rounded-lg">
          <div className="flex gap-2">
            <h1 className="text-xl font-semibold">Plano LTDA</h1>
            <div className="flex items-center gap-1 p-1 px-2 text-[13px] font-semibold border border-zinc-600/50 bg-zinc-400/20 rounded-md">
              <Star size={14} fill="" className="dark:hidden" />
              <Star size={14} fill="white" className="hidden dark:block" />
              Recomendado
            </div>
          </div>

          <p className="text-black/70 dark:text-zinc-200/80">Este plano é recomendado para empresas maiores</p>
          <h2 className="font-bold font-mono text-xl my-1.5">R$ 29,99<span className="font-normal text-[16px]">/mês</span></h2>
          <p className="text-black/70 dark:text-zinc-200/80 mb-1">Recursos do plano gratuito:</p>

          <div className="space-y-1">
            <p className="flex font-semibold gap-1"><Check />Controle de membros</p>
            <p className="flex font-semibold gap-1"><Check />Controle de tarefas</p>
            <p className="flex font-semibold gap-1"><Check />Controle de projetos</p>
            <p className="flex font-semibold gap-1"><Check />Controle de kanban's por projeto</p>
            <p className="flex font-semibold gap-1"><Check />Inteligência artificial própria</p>
            <p className="flex font-semibold gap-1"><Check />Acesso total ao painel</p>
          </div>

          <Button onClick={() => redirectToPlan(2)} className="w-full mt-3 py-5 font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-green-500/30 border border-zinc-500/30 dark:hover:border-green-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200">
            Selecionar plano
          </Button>
        </div>
      </div>
    </div>
  );
}
