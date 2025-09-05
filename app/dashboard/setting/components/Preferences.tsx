'use client'

import { Switch } from "@/components/ui/switch";
import { Label } from "@radix-ui/react-label";

import { MessageSquare, MoonIcon, SunIcon, SunMoon, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useId, useState } from "react";

export function Preferences() {
    const id = useId()
    const [checked, setChecked] = useState<boolean>(true)
    const { theme, setTheme } = useTheme();
    const [system, setSystem] = useState(false);

    useEffect(() => {
        if (theme === "light") {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, [theme]);

    return (
        <div className="w-full py-2">
            <div className="text-2xl font-semibold flex justify-center">Preferências</div>

            <p className="mt-4 text-lg font-semibold text-muted-foreground">Aparência</p>
            <div className="flex flex-col gap-3">
                <div className={`w-full mt-2 p-2 flex justify-between items-center gap-2 rounded-lg border bg-zinc-200/40 dark:bg-zinc-800/70 dark:border-zinc-200/5 duration-200`}>
                    <div className="flex items-center gap-2 w-full">
                        <SunMoon className="p-[5px] text-zinc-700 dark:text-zinc-50/80 rounded-md" size={32} />
                        <p className="text-md font-semibold text-zinc-700 dark:text-zinc-50/80">Tema</p>
                    </div>

                    <div>
                        <div className="relative inline-grid h-8 w-20.5 grid-cols-[1fr_1fr]  items-center text-sm font-medium">
                            <Switch
                                id={id}
                                checked={checked}
                                onCheckedChange={(value: boolean) => {
                                    setChecked(value);
                                    setTheme(value ? "light" : "dark");
                                    setSystem(false);
                                }}
                                className="peer data-[state=unchecked]:bg-input/50 absolute inset-0 h-[inherit] w-auto [&_span]:z-10 [&_span]:h-full [&_span]:w-10 [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full"
                            />
                            <span className="pointer-events-none relative ms-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full peer-data-[state=unchecked]:rtl:-translate-x-full">
                                <MoonIcon size={16} aria-hidden="true" />
                            </span>
                            <span className="peer-data-[state=checked]:text-background pointer-events-none relative me-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full">
                                <SunIcon size={16} aria-hidden="true" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

