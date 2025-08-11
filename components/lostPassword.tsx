import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./alert-dialog";

export function LostPassword() {
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <p className="cursor-pointer text-sm font-normal text-blue-700 dark:text-blue-400/60 underline hover:text-blue-400 duration-200">Esqueceu sua senha?</p>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Esqueceu sua senha?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Se você esqueceu sua senha, podemos ajudá-lo a redefini-la. Somente preencha seu e-mail cadastrado e enviaremos um link para redefinição de senha.
                    </AlertDialogDescription>
                    <div className="mt-4 space-y-2">
                        <p className="dark:text-zinc-200/80">Digite seu email cadastrado</p>
                        <input type="email" placeholder="Digite aqui" className="outline-none border border-zinc-300 dark:border-zinc-700 rounded-lg p-2 w-full" />
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
