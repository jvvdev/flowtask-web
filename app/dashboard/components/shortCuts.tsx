import { BrainCog, Clipboard, UserRoundCheck, Users } from "lucide-react";

export function ShortCutsWidget() {
    return (
        <div className="p-4 space-y-2 w-full 2xl:w-[50%] h-62 max-h-[400px] border border-border bg-gradient-to-br from-sidebar/60 to-sidebar rounded-lg flex flex-col">
            <div>
                <h2 className="text-xl font-semibold">Atalhos</h2>
            </div>
            <div className="flex flex-col gap-3 flex-1">
                <a href="/dashboard/team" className="flex p-4 gap-2 w-full border border-border rounded-md flex-1 hover:text-white hover:bg-gradient-to-br hover:from-green-500/50 hover:to-green-500/80 duration-300 transition">
                    <Users size={24} /> <span className="mt-0.5">Equipe</span>
                </a>
                <div className="flex flex-row gap-3 w-full flex-1">
                    <a href="/dashboard/chatai" className="flex p-4 gap-2 w-full border border-border rounded-md flex-1 hover:text-white hover:bg-gradient-to-br hover:from-green-500/50 hover:to-green-500/80 duration-300 transition">
                        <BrainCog size={24} /> <span className="mt-0.5">Chat IA</span>
                    </a>
                    <a href="/dashboard/task" className="flex p-4 gap-2 w-full border border-border rounded-md flex-1 hover:text-white hover:bg-gradient-to-br hover:from-green-500/50 hover:to-green-500/80 duration-300 transition">
                        <Clipboard size={24} /> <span className="mt-0.5">Tarefas</span>
                    </a>
                </div>
            </div>
        </div>
    )
}