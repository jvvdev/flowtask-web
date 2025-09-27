import { RiArrowRightUpLine } from "@remixicon/react";
import { ClipboardClock, Container, File, FileCheck, FileJson, TimerReset, Users } from "lucide-react";
import { metricsProp } from "../page";
import { useEffect, useState } from "react";

const List = [
    {
        id: 1,
        Name: "Projetos em andamento",
        Number: 135
    },
    {
        id: 2,
        Name: "Tarefas pendentes",
        Number: 30
    },
    {
        id: 3,
        Name: "Membros",
        Number: 40
    },
]

export type returnMetricProps = {
    data: metricsProp;
    // setData: React.Dispatch<React.SetStateAction<Project[]>>;
};

export function InfoCardToTasks({ data }: returnMetricProps) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (data.length === 0) {

        } else {
            setLoading(false)
        }
    }, [data])

    return (
        <div className="grid w-full xl:grid-cols-2 2xl:grid-cols-3 border border-border rounded-lg bg-gradient-to-br from-sidebar/60 to-sidebar">
            <div className="relative p-4 lg:p-5 group before:absolute before:inset-y-8 before:right-0 before:w-px before:bg-gradient-to-b before:from-input/30 before:via-input before:to-input/30 last:before:hidden">
                <div className="relative flex items-center gap-4">
                    <RiArrowRightUpLine
                        className="absolute right-0 top-0 opacity-0 group-has-[a:hover]:opacity-100 transition-opacity text-emerald-500"
                        size={20}
                        aria-hidden="true"
                    />
                    {/* Icon */}
                    <div className="size-10 shrink-0 rounded-full bg-emerald-600/25 border border-emerald-600/50 flex items-center justify-center text-emerald-500">
                        <Container />
                    </div>
                    {/* Content */}
                    <div>
                        <h1
                            className="font-medium tracking-widest text-xs uppercase text-muted-foreground/60 overflow-hidden whitespace-nowrap text-ellipsis truncate"
                        >
                            projetos
                        </h1>
                        {
                            loading ? <div className="w-full h-6 bg-zinc-200 rounded-sm mt-2 animate-pulse"></div> :
                                <div className="text-2xl font-semibold mb-2">{data.all_projects}</div>
                        }
                    </div>
                </div>
            </div>

            <div className="relative p-4 lg:p-5 group before:absolute before:inset-y-8 before:right-0 before:w-px before:bg-gradient-to-b before:from-input/30 before:via-input before:to-input/30 last:before:hidden">
                <div className="relative flex items-center gap-4">
                    <RiArrowRightUpLine
                        className="absolute right-0 top-0 opacity-0 group-has-[a:hover]:opacity-100 transition-opacity text-emerald-500"
                        size={20}
                        aria-hidden="true"
                    />
                    {/* Icon */}
                    <div className="size-10 shrink-0 rounded-full bg-emerald-600/25 border border-emerald-600/50 flex items-center justify-center text-emerald-500">
                        <Container />
                    </div>
                    {/* Content */}
                    <div>
                        <h1
                            className="font-medium tracking-widest text-xs uppercase text-muted-foreground/60 overflow-hidden whitespace-nowrap text-ellipsis truncate"
                        >
                            tarefas pendente
                        </h1>
                        {
                            loading ? <div className="w-full h-6 bg-zinc-200 rounded-sm mt-2 animate-pulse"></div> :
                                <div className="text-2xl font-semibold mb-2">{data.all_pendent_tasks}</div>
                        }
                    </div>
                </div>
            </div>

            <div className="relative p-4 lg:p-5 group before:absolute before:inset-y-8 before:right-0 before:w-px before:bg-gradient-to-b before:from-input/30 before:via-input before:to-input/30 last:before:hidden">
                <div className="relative flex items-center gap-4">
                    <RiArrowRightUpLine
                        className="absolute right-0 top-0 opacity-0 group-has-[a:hover]:opacity-100 transition-opacity text-emerald-500"
                        size={20}
                        aria-hidden="true"
                    />
                    {/* Icon */}
                    <div className="size-10 shrink-0 rounded-full bg-emerald-600/25 border border-emerald-600/50 flex items-center justify-center text-emerald-500">
                        <Container />
                    </div>
                    {/* Content */}
                    <div>
                        <h1
                            className="font-medium tracking-widest text-xs uppercase text-muted-foreground/60 overflow-hidden whitespace-nowrap text-ellipsis truncate"
                        >
                            membros
                        </h1>
                        {
                            loading ? <div className="w-full h-6 bg-zinc-200 rounded-sm mt-2 animate-pulse"></div> :
                                <div className="text-2xl font-semibold mb-2">{data.all_members}</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}