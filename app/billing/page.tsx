'use client'

import { Button } from "@/components/button";
import ThemeToggle from "@/components/theme-toggle";
import { ArrowLeft, Briefcase, ChartArea, Check, Plus, Star, UsersRound, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Subscriptions() {
  const router = useRouter();

  function redirectToPlan(planID: number) {
    if (planID === 0) {
      router.push(`billing/${planID}`);
    } else if (planID >= 1) {
      console.log(planID)
      router.push(`billing/${planID}`);
    }
  }

  return (
    <div className="w-full min-h-dvh bg-background flex flex-col items-center justify-center">
      <div>
        {/* Header */}
        <div className="flex flex-col mb-8">
          <p className="text-[16px] text-muted-foreground">Parece que você não tem nenhum plano ativo...</p>
          <h1 className="text-2xl font-semibold text-foreground">Selecione uma das opções abaixo para assinar um plano</h1>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Join Group Card */}
          <div
            className={`group relative overflow-hidden rounded-lg border p-6 group border-zinc-400/40 dark:border-white/20 bg-zinc-200/20 dark:bg-zinc-950/10 transition-colors`}>
            <div className="flex flex-col space-y-4">
              <div className="p-3 bg-zinc-400/20 dark:bg-white/5 rounded-lg w-fit">
                <UsersRound className="w-8 h-8 text-zinc-600 dark:text-white" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-card-foreground text-left">Plano individual</h2>
                <p className="text-sm text-muted-foreground text-left">
                  Este plano ele foi desenvolvido pensando em micro-empreendedores
                </p>
                <h2 className="font-bold font-mono text-xl my-1.5 text-left">R$ 49,00<span className="font-normal text-[16px]">/mês</span></h2>
                <p className="text-sm text-muted-foreground text-left">Recursos do plano individual:</p>
              </div>

              <ul className="-mt-2 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />
                  0 usuários
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />
                  1 espaço
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />
                  200 pontos na IA
                </li>
              </ul>
              <Button onClick={() => redirectToPlan(0)} className="mt-20 w-full py-5 font-semibold bg-zinc-900/80 border-zinc-400/40 dark:border-zinc-500 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-300 border text-white dark:text-black cursor-pointer duration-200">
                Selecionar plano
              </Button>
            </div>
          </div>

          {/* Create Group Card */}
          <div
            className={`group relative overflow-hidden rounded-lg border p-6 group border-yellow-900/20 dark:border-yellow-900/40 bg-zinc-200/20 dark:bg-zinc-950/10 transition-colors`}>
            <div className="flex flex-col space-y-4">
              <div className="p-3 bg-yellow-950/10 dark:bg-yellow-950/25 rounded-lg w-fit">
                <Briefcase className="w-8 h-8 text-yellow-900" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-card-foreground text-left">Plano Profissional</h2>
                <p className="text-sm text-muted-foreground text-left">
                  Este plano é recomendado para empresas em desenvolvimento
                </p>
                <h2 className="font-bold font-mono text-xl my-1.5 text-left">R$ 99,00<span className="font-normal text-[16px]">/mês</span></h2>
                <p className="text-sm text-muted-foreground text-left">Recursos do plano Profissional:</p>
              </div>

              <ul className="-mt-2 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-950 rounded-full" />
                  10 usuários
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-950 rounded-full" />
                  1 espaço
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-950 rounded-full" />
                  1000 pontos na IA
                </li>
              </ul>
              <Button onClick={() => redirectToPlan(1)} className="mt-20 w-full py-5 font-semibold bg-zinc-900/80 border-zinc-400/40 dark:border-zinc-500 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-300/80 border text-white dark:text-black cursor-pointer duration-200">
                Selecionar plano
              </Button>
            </div>
          </div>

          <div
            className={`group relative overflow-hidden rounded-lg border p-6 group border-fuchsia-400/20 bg-zinc-200/20 dark:bg-zinc-950/10 transition-colors`}>
            <div className="flex flex-col space-y-4">
              <div className="p-3 bg-fuchsia-400/15 dark:bg-fuchsia-400/5 rounded-lg w-fit">
                <ChartArea className="w-8 h-8 text-fuchsia-400" />
              </div>
              <div className="absolute right-6 flex items-center gap-1 p-1 px-2 text-[13px] font-semibold border text-fuchsia-500 dark:text-zinc-200 border-fuchsia-600/50 bg-fuchsia-400/40 rounded-md">
                <Star size={14} fill="fuchsia" color="fuchsia" className="dark:hidden" />
                <Star size={14} fill="white" color="white" className="hidden dark:block" />
                Recomendado
              </div>

              <div className="space-y-2">
                <div className="flex gap-2">
                  <h1 className="text-xl font-semibold">Plano Escala</h1>
                </div>
                <p className="text-sm text-muted-foreground text-left">
                  Este plano é recomendado para empresas maiores
                </p>
                <h2 className="font-bold font-mono text-xl my-1.5 text-left">R$ 199,00<span className="font-normal text-[16px]">/mês</span></h2>
                <p className="text-sm text-muted-foreground text-left">Recursos do plano Escala:</p>
              </div>

              <ul className="-mt-2 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full" />
                  Usuários ilimitados
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full" />
                  Espaços ilimitados
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full" />
                  IA ilimitada
                </li>
              </ul>
              <Button onClick={() => redirectToPlan(2)} className="mt-20 w-full py-5 font-semibold bg-zinc-200/60 border-zinc-600/30 dark:border-zinc-200/10 dark:bg-zinc-950/60 hover:bg-zinc-500/20 dark:hover:bg-zinc-950 border text-zinc-800 dark:text-white hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200">
                Selecionar plano
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-16 right-16">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
