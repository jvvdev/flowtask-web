import { TableHead } from "@/components/table"
import { ShieldAlert, Clock, User, Asterisk } from "lucide-react"

const memberOverHeat = [
    { id: 1, name: "Adriel Dev", OverLoad: 2, totalTasks: 10 },
    { id: 2, name: "Jordana Lima", OverLoad: 5, totalTasks: 12 },
    { id: 3, name: "Carlos Souza", OverLoad: 4, totalTasks: 11 },
    { id: 4, name: "Larissa Alves", OverLoad: 3, totalTasks: 10 },
    { id: 5, name: "Rafael Martins", OverLoad: 6, totalTasks: 14 },
    { id: 6, name: "Fernanda Silva", OverLoad: 2, totalTasks: 9 },
    { id: 7, name: "Bruno Costa", OverLoad: 7, totalTasks: 15 },
    { id: 8, name: "Juliana Pereira", OverLoad: 5, totalTasks: 13 },
    { id: 9, name: "Marcos Vinícius", OverLoad: 3, totalTasks: 10 },
    { id: 10, name: "Patrícia Lima", OverLoad: 6, totalTasks: 12 },
    { id: 11, name: "Camila Santos", OverLoad: 4, totalTasks: 11 },
    { id: 12, name: "Lucas Martins", OverLoad: 2, totalTasks: 8 },
    { id: 13, name: "Gabriela Ribeiro", OverLoad: 5, totalTasks: 13 },
    { id: 14, name: "Rodrigo Fernandes", OverLoad: 3, totalTasks: 10 },
    { id: 15, name: "Larissa Carvalho", OverLoad: 6, totalTasks: 14 },
    { id: 16, name: "Thiago Rocha", OverLoad: 4, totalTasks: 12 },
]

export function MemberOverHeat() {
    return (
        <div className="p-4 space-y-2 w-full h-62 border border-border bg-gradient-to-br from-sidebar/60 to-sidebar rounded-lg flex flex-col">
            <div>
                <h2 className="text-xl font-semibold">Membros com sobrecarga</h2>
            </div>
            <div className="overflow-auto min-w-[140px] max-h-[320px] pr-1 
            [&::-webkit-scrollbar]:w-1.5
                        [&::-webkit-scrollbar-track]:rounded-md
                        [&::-webkit-scrollbar-thumb]:rounded-md
                        [&::-webkit-scrollbar-track]:bg-zinc-200/50
                        dark:[&::-webkit-scrollbar-track]:bg-zinc-800/30
                        [&::-webkit-scrollbar-thumb]:bg-zinc-400
                        dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700"
            >
                <div className="w-full flex justify-between px-2 py-1 bg-sidebar border border-border rounded-lg mb-2">
                    <p className="w-full font-semibold flex items-center gap-1"><User size={16} />Nome</p>
                    <p className="w-[60%] font-semibold flex items-center gap-1"><Asterisk size={16} />Sobrecarga</p>
                </div>
                {
                    memberOverHeat.map(member => (
                        <div key={member.id} className="min-w-[140px] w-full flex justify-between py-1 px-2 border-b hover:bg-muted">
                            <span className="w-full font-bold">{member.name}</span>
                            <p className="w-[60%] font-semibold">{member.OverLoad} <span className="font-normal">Tarefas</span></p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}