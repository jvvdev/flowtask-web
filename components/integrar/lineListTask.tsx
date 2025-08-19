import { Check } from "lucide-react";
import { TableRow, TableCell } from "../table";

export function LineListTask(item: any) {
    return (
        <TableRow
            key={item.id}
            className="border-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg h-px hover:bg-accent/50"
        >
            <TableCell className="flex gap-2 py-[17px]">
                {/* <button
                    className={`border rounded-sm ${selectedTask === item.id ? "bg-green-400 dark:bg-green-600 p-[3px]" : "w-5.5"}`}
                    onClick={() => {
                        if (selectedTask === item.id) setSelectedTask(0);
                        else setSelectedTask(item.id);
                    }}
                >
                    <Check className={`${selectedTask === item.id ? "block" : "hidden"}`} size={12} />
                </button> */}
                <p className="w-full overflow-hidden whitespace-nowrap text-ellipsis font-semibold">{item.title}</p>
            </TableCell>
            <TableCell>
                <p className="overflow-hidden whitespace-nowrap text-ellipsis">{item.description}</p>
            </TableCell>
            <TableCell>
                {item.priority === "high" ? (
                    <div className="flex items-center gap-2 relative">
                        <div className="relative flex h-2 w-2">
                            <div className="absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75 animate-ping"></div>
                            <div className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></div>
                        </div>
                        <span className="text-red-500 overflow-hidden whitespace-nowrap text-ellipsis">Alta</span>
                    </div>
                ) : item.priority === "medium" ? (
                    <div className="flex items-center gap-2 relative">
                        <div className="relative flex h-2 w-2">
                            <div className="absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75 animate-ping"></div>
                            <div className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></div>
                        </div>
                        <span className="text-yellow-500 overflow-hidden whitespace-nowrap text-ellipsis">Média</span>
                    </div>
                ) : item.priority === "low" ? (
                    <div className="flex items-center gap-2 relative">
                        <div className="relative flex h-2 w-2">
                            <div className="absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75 animate-ping"></div>
                            <div className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></div>
                        </div>
                        <span className="text-green-500 overflow-hidden whitespace-nowrap text-ellipsis">Baixa</span>
                    </div>
                ) : (
                    <span>{item.priority}</span> // Caso não seja nenhum dos 3, só mostra o texto
                )}
            </TableCell>
            <TableCell>
                {item.status === "to do" ? (
                    <div className="flex items-center gap-2 relative">
                        <div className="relative flex h-2 w-2">
                            <div className="absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75 animate-ping"></div>
                            <div className="relative inline-flex rounded-full h-2 w-2 bg-purple-400"></div>
                        </div>
                        <span className="text-purple-400 overflow-hidden whitespace-nowrap text-ellipsis">A fazer</span>
                    </div>
                ) : item.status === "in progress" ? (
                    <div className="flex items-center gap-2 relative">
                        <div className="relative flex h-2 w-2">
                            <div className="absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75 animate-ping"></div>
                            <div className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></div>
                        </div>
                        <span className="text-yellow-400 overflow-hidden whitespace-nowrap text-ellipsis">Em progresso</span>
                    </div>
                ) : item.status === "done" ? (
                    <div className="flex items-center gap-2 relative">
                        <div className="relative flex h-2 w-2">
                            <div className="absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75 animate-ping"></div>
                            <div className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></div>
                        </div>
                        <span className="text-green-500 overflow-hidden whitespace-nowrap text-ellipsis">Concluído</span>
                    </div>
                ) : (
                    <span className="overflow-hidden whitespace-nowrap text-ellipsis">{item.status}</span>
                )}
            </TableCell>
            <TableCell>
                <p>{item.comments.length == 0 ? "Sem comentários" : item.comments + " Comentários"}</p>
            </TableCell>
            <TableCell>
                <p className="overflow-hidden whitespace-nowrap text-ellipsis">{item.createdAt.toLocaleString()}</p>
            </TableCell>
        </TableRow>
    );
}
