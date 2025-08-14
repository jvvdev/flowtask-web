import { RiArrowRightUpLine } from "@remixicon/react";
import { Container, File, FileCheck, FileJson } from "lucide-react";

const List = [
    {
        id: 1,
        Name: "Projetos",
        Number: 135
    },
    {
        id: 2,
        Name: "Finalizados",
        Number: 30
    },
    {
        id: 3,
        Name: "Em andamento",
        Number: 40
    },
    {
        id: 4,
        Name: "Não iniciados",
        Number: 34
    },
]

export function InfoCardToProjects() {
    return (
        <div className="grid grid-cols-2 min-[1200px]:grid-cols-4 border border-border rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar">
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
                            <div className="max-[480px]:hidden size-10 shrink-0 rounded-full bg-emerald-600/25 border border-emerald-600/50 flex items-center justify-center text-emerald-500">
                                {
                                    item.Name == "Projetos" ?
                                    <Container /> :
                                    item.Name == "Finalizados" ? 
                                    <FileCheck /> : 
                                    item.Name == "Em andamento" ?
                                    <FileJson /> :
                                    item.Name == "Não iniciados" ?
                                    <File /> : ""
                                }
                            </div>
                            {/* Content */}
                            <div>
                                <h1
                                    className="font-medium tracking-widest text-xs uppercase text-muted-foreground/60"
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