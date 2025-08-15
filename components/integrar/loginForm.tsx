'use client'

import { Eye, EyeOff } from "lucide-react";
import { Input } from "../input";
import { LostPassword } from "../lostPassword";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { authService } from "@/api/auth-service";

export function LoginForm() {
    const [hidePassword, setHidePassword] = useState(false)

    const {register, handleSubmit} = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    return (
        <form className="space-y-4 w-full" onSubmit={handleSubmit(authService.login)}>
            <div className="w-full space-y-2">
                <p className="dark:text-zinc-200/80">Seu email</p>
                <Input placeholder="Digite aqui" className="pl-4 pr-9 h-10.5 rounded-lg" {...register("email")}/>
            </div>
            <div className="w-full space-y-2 mt-1">
                <p className="dark:text-zinc-200/80 flex justify-between items-center">Sua senha <LostPassword /> </p>
                <div className="relative">
                    <Input type={hidePassword ? "text" : "password"} placeholder="Digite aqui" className="pl-4 pr-9 h-10.5 rounded-lg" {...register("password")}/>
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
        </form>
    )
}