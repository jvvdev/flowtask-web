import { BrainCog, Clipboard, UserRoundCheck, Users } from "lucide-react";

export function ShortCutsWidget() {
    return (
        <div className="p-4 space-y-2 w-full h-62 max-h-[400px] border border-border bg-gradient-to-br from-sidebar/60 to-sidebar rounded-lg flex flex-col">
            <div>
                <h2 className="text-2xl font-semibold">Atalhos</h2>
            </div>
            <div className="flex flex-col gap-3 flex-1">
                <button className="flex p-4 gap-2 w-full border border-border rounded-md flex-1 hover:text-white hover:bg-gradient-to-br from-green-500/50 to-green-500/80">
                    <Users size={24} /> <span className="mt-0.5">Equipe</span>
                </button>
                <div className="flex flex-row gap-3 w-full flex-1">
                    <button className="flex p-4 gap-2 w-full border border-border rounded-md flex-1 hover:text-white hover:bg-gradient-to-br from-green-500/50 to-green-500/80">
                        <BrainCog size={24} /> <span className="mt-0.5">Chat IA</span>
                    </button>
                    <button className="flex p-4 gap-2 w-full border border-border rounded-md flex-1 hover:text-white hover:bg-gradient-to-br from-green-500/50 to-green-500/80">
                        <Clipboard size={24} /> <span className="mt-0.5">Tarefas</span>
                    </button>
                </div>
            </div>
        </div>
    )
}