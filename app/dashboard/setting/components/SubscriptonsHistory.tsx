'use client'

import { authService } from "@/api/auth-service";
import { routes } from "@/api/routes";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/table";
import axios from "axios";
import { sub } from "date-fns";
import { ALargeSmall, BanknoteArrowDown, BanknoteArrowUp, CalendarX2, Check, ClipboardCheck, Coins, ExternalLink, FileText, HandCoins, Inbox, KeyRound, Loader, Loader2, Pencil, ShieldCheck, Trash2, User, UserMinus } from "lucide-react";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

interface dataType {
    id: string,
    dateCreated: string,
    subscription_description: string,
    subscription_due_date: string,
    subscription_payment_date: string,
    subscription_payment_url: string,
    subscription_status: string,
    subscription_value: number
}

export function SubscriptionsHistory({ subscription_id }: { subscription_id: string }) {
    const [data, setData] = useState<dataType[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function getData() {
            const session_id = await authService.getToken()

            await axios.get(routes.getPlans + subscription_id, {
                headers: {
                    authToken: session_id
                }
            }).then((res) => {
                setData(res.data.data)
                setLoading(false)
                toast.success(res.data.message)
            }).catch((err) => {
                console.log(err)
                toast.error(err.response.data.message)
            })
        }

        getData()
    }, [])

    function redirectToPayment(data: any) {
        console.log(data)
        window.open(data.subscription_payment_url, "_blank")
    }

    return (
        <div className="w-full py-2">
            <div className="text-2xl font-semibold flex justify-center">Hístorico de pagamento</div>

            <p className="mt-4 text-lg font-semibold text-muted-foreground">Informações confidenciais</p>
            {
                loading ?
                    <div className="mt-30 w-full flex items-center justify-center">
                        <Loader2 className="animate-spin opacity-50" />
                    </div> :
                    <div
                        className="mt-2 h-full overflow-y-auto pr-2
                                [&::-webkit-scrollbar]:w-1.5
                                [&::-webkit-scrollbar-track]:rounded-md
                                [&::-webkit-scrollbar-thumb]:rounded-md
                                [&::-webkit-scrollbar-track]:bg-zinc-200/50
                                dark:[&::-webkit-scrollbar-track]:bg-zinc-800/30
                                [&::-webkit-scrollbar-thumb]:bg-zinc-400
                                dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700"
                    >
                        <Table className="table-fixed border-separate min-w-290 border-spacing-0 [&_tr:not(:last-child)_td]:border-b">
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="relative w-30 h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                        <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500 overflow-hidden whitespace-nowrap text-ellipsis"><BanknoteArrowDown size={18} /> Status</p>
                                    </TableHead>
                                    <TableHead className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                        <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500 overflow-hidden whitespace-nowrap text-ellipsis"><FileText size={18} /> Descrição</p>
                                    </TableHead>
                                    <TableHead className="relative w-25 h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                        <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500 overflow-hidden whitespace-nowrap text-ellipsis"><Coins size={18} /> Valor</p>
                                    </TableHead>
                                    <TableHead className="relative w-35 h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                        <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500 overflow-hidden whitespace-nowrap text-ellipsis"><CalendarX2 size={18} /> Vencimento</p>
                                    </TableHead>
                                    <TableHead className="relative w-30 h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                        <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500 overflow-hidden whitespace-nowrap text-ellipsis"><BanknoteArrowUp size={18} /> Pago</p>
                                    </TableHead>
                                    <TableHead className="relative w-30 h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg">
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {
                                    data.map((item, index) => (
                                        <TableRow
                                            key={item.id}
                                            // onClick={() => redirectToPayment(item)}
                                            className="hover:bg-transparent border-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg h-px"
                                        >
                                            <TableCell className="overflow-hidden whitespace-nowrap text-ellipsis">
                                                {item.subscription_status === "PENDING" ?
                                                    <p className="flex gap-1 items-center font-semibold text-blue-500"><HandCoins size={20} /> Pendente</p> :
                                                    item.subscription_status === "CONFIRMED" ?
                                                        <p className="flex gap-1 items-center font-semibold text-green-500"><Check size={20} /> Pago</p> :
                                                        item.subscription_status === "RECEIVED" ?
                                                            <p className="flex gap-1 items-center font-semibold text-blue-500"><ShieldCheck size={20} /> Em análise</p> :
                                                            ""}
                                            </TableCell>
                                            <TableCell className="font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
                                                {item.subscription_description}
                                            </TableCell>
                                            <TableCell className="overflow-hidden whitespace-nowrap text-ellipsis">
                                                <strong>R$</strong> {Number(item.subscription_value).toFixed(2).replace(".", ",")}
                                            </TableCell>
                                            <TableCell className="overflow-hidden whitespace-nowrap text-ellipsis">
                                                {/* {item.subscription_due_date.replaceAll("-", "/")} */}
                                                {item.subscription_due_date.slice(8, 10) + "/" + item.subscription_due_date.slice(5, 7) + "/" + item.subscription_due_date.slice(0, 4)}
                                            </TableCell>
                                            <TableCell className="overflow-hidden whitespace-nowrap text-ellipsis">
                                                {item.subscription_payment_date ? item.subscription_payment_date.slice(8, 10) + "/" + item.subscription_payment_date.slice(5, 7) + "/" + item.subscription_payment_date.slice(0, 4) : <p className="font-semibold">Não pago</p>}
                                            </TableCell>
                                            <TableCell className="overflow-hidden whitespace-nowrap text-ellipsis">
                                                <button onClick={() => redirectToPayment(item)} className="border bg-sidebar hover:bg-zinc-400/15 dark:hover:bg-blue-600/80 border-border dark:border-blue-800/80 dark:bg-blue-600/60 text-zinc-800 dark:text-zinc-300 p-1 font-semibold flex items-center justify-center gap-1 rounded-sm cursor-pointer duration-200">
                                                    <ExternalLink size={16} className="text-blue-600 dark:text-zinc-300"/>
                                                    {
                                                        item.subscription_status === "PENDING" ?
                                                            "Pagar" : "Informações"
                                                    }
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>
            }
        </div>
    );
}
