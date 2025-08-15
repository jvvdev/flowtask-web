'use client'

import { authService } from "@/api/auth-service";
import { LoginForm } from "@/components/integrar/loginForm";
import ThemeToggle from "@/components/theme-toggle";
import { Metadata } from "next";

export default function LoginPage() {
    return (
        <main className="flex justify-center gap-10 xl:gap-40 h-dvh p-10">
            <div className="relative hidden w-[60%] xl:w-[50%] lg:flex justify-center items-center bg-zinc-200/60 dark:bg-zinc-800 rounded-xl">
                <div className="absolute bottom-5 p-10 space-y-2">
                    <h1 className="text-4xl font-semibold">O FlowTask agora conta com uma IA <br /> personalizada</h1>
                    <p className="text-zinc-800/70 dark:text-zinc-400">Desenvolvida para compreender profundamente o seu fluxo de trabalho, a IA personalizada do FlowTask adapta-se ao seu estilo, antecipa necessidades e otimiza cada etapa do processo.</p>
                </div>
                <div className="shadow absolute rounded-full bottom-5 gap-2 flex justify-center items-center p-1.5 bg-white/80 dark:bg-zinc-950/60">
                    <div className="w-2 h-2 bg-green-600 dark:bg-green-400/70 rounded-full"></div>
                    <div className="w-2 h-2 bg-zinc-300/60 dark:bg-white/20 rounded-full cursor-pointer"></div>
                    <div className="w-2 h-2 bg-zinc-300/60 dark:bg-white/20 rounded-full cursor-pointer"></div>
                </div>
            </div>

            <div className="h-full lg:w-[50%] xl:w-[30%] flex flex-col justify-center items-center gap-5">
                <div>
                    <h1 className="text-3xl font-semibold">Bem-vindo novamente 👋</h1>
                    <p className="text-zinc-400 mt-2">Coloque suas informações para poder acessar sua conta.</p>
                </div>

                <div className="w-full">
                    <LoginForm />
                </div>

                <div className="gap-2 flex flex-col justify-center items-center w-full">
                    <p className="w-full text-center text-sm dark:text-zinc-200/50 text-zinc-800/90">Ou entre com</p>
                    <button onClick={() => {authService.loginWithGoogle()}} className="flex justify-center items-center gap-3 py-3 w-full mt-2 dark:bg-zinc-700/40 dark:hover:bg-zinc-700/20 bg-zinc-200 hover:bg-zinc-300 border dark:border-zinc-950/30 border-zinc-500/5 font-semibold rounded-lg duration-200 cursor-pointer"><img src="https://i.imgur.com/2Zsoe9M.png" alt="" className="w-5 h-5" />Google</button>
                    <p className="dark:text-zinc-400 text-zinc-800/90 mt-2 text-sm">Não tem uma conta? <a href="/auth/register" className="dark:text-zinc-200 text-black font-semibold underline">Crie uma conta agora!</a></p>
                </div>

            
            </div>

            <div className="absolute bottom-0 right-0 p-10">
                <ThemeToggle />
            </div>
        </main>
    )
}