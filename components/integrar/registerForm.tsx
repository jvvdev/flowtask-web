'use client'

import { Eye, EyeOff } from "lucide-react";
import { Input } from "../input";
import { useState } from "react";

export function RegisterForm() {
    const [hidePassword, setHidePassword] = useState(false)

    return (
        <div className="space-y-4 w-full">
            <div className="flex gap-5">
                <div className="w-full space-y-2">
                    <p className="dark:text-zinc-200/80">Primeiro nome</p>
                    <Input placeholder="Digite aqui" className="pl-4 pr-9 h-10.5 rounded-lg" />
                </div>
                <div className="w-full space-y-2">
                    <p className="dark:text-zinc-200/80">Segundo nome</p>
                    <Input placeholder="Digite aqui" className="pl-4 pr-9 h-10.5 rounded-lg" />
                </div>
            </div>
            <div className="w-full space-y-2">
                <p className="dark:text-zinc-200/80">Email</p>
                <Input placeholder="Digite aqui" className="pl-4 pr-9 h-10.5 rounded-lg" />
            </div>
            <div className="w-full space-y-2 mt-1">
                <p className="dark:text-zinc-200/80 flex justify-between items-center">Senha</p>
                <div className="relative">
                    <Input type={hidePassword ? "text" : "password"} placeholder="Digite aqui" className="pl-4 pr-9 h-10.5 rounded-lg" />
                    {
                        hidePassword ? (
                            <Eye className="absolute top-2.5 right-2.5 text-zinc-400 hover:text-zinc-200 duration-200 cursor-pointer" size={20} onClick={() => setHidePassword(false)} />
                        ) : (
                            <EyeOff className="absolute top-2.5 right-2.5 text-zinc-400 hover:text-zinc-200 duration-200 cursor-pointer" size={20} onClick={() => setHidePassword(true)} />
                        )
                    }
                </div>
            </div>

            <button className="py-3 w-full mt-2 bg-green-500 hover:bg-green-600 border-green-700/30 text-zinc-50 dark:bg-green-700 border dark:border-green-950 dark:hover:bg-green-800 duration-200 font-semibold rounded-lg cursor-pointer">Entrar</button>
        </div>
    )
}