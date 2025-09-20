import { RiArrowRightUpLine } from "@remixicon/react";
import { ClipboardClock, Container, File, FileCheck, FileJson, TimerReset, Users } from "lucide-react";

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

export function InfoCardToTasks() {
    return (
        <div className="grid w-full lg:grid-cols-2 2xl:grid-cols-3 border border-border rounded-lg bg-gradient-to-br from-sidebar/60 to-sidebar">
            {
                List.map((item) => (
                    <div key={item.id} className="relative p-4 lg:p-5 group before:absolute before:inset-y-8 before:right-0 before:w-px before:bg-gradient-to-b before:from-input/30 before:via-input before:to-input/30 last:before:hidden">
                        <div className="relative flex items-center gap-4">
                            <RiArrowRightUpLine
                                className="absolute right-0 top-0 opacity-0 group-has-[a:hover]:opacity-100 transition-opacity text-emerald-500"
                                size={20}
                                aria-hidden="true"
                            />
                            {/* Icon */}
                            <div className="size-10 shrink-0 rounded-full bg-emerald-600/25 border border-emerald-600/50 flex items-center justify-center text-emerald-500">
                                {
                                    item.Name == "Projetos em andamento" ?
                                    <Container /> :
                                    item.Name == "Tarefas pendentes" ? 
                                    <ClipboardClock /> : 
                                    item.Name == "Membros" ?
                                    <Users /> : ""
                                }
                            </div>
                            {/* Content */}
                            <div>
                                <h1
                                    className="font-medium tracking-widest text-xs uppercase text-muted-foreground/60 overflow-hidden whitespace-nowrap text-ellipsis truncate"
                                >
                                    {item.Name}
                                </h1>
                                <div className="text-2xl font-semibold mb-2">{item.Number}</div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}