"use client"

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/breadcrumb"
import { Separator } from "@/components/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/sidebar"
import { SiderBarDefault } from "@/components/sidebarDefault"
import { useEffect, useState } from "react"
import { authService } from "@/api/auth-service"
import { routes } from "@/api/routes"
import axios from "axios"
import UserDropdown from "@/components/user-dropdown"
import ThemeToggle from "@/components/theme-toggle"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group"
import { Label } from "@radix-ui/react-label"
import { ChevronDown, ChevronUp, CreditCard } from "lucide-react"
import { Input } from "@/components/input"
import { Button } from "@/components/button"
import { useForm } from "react-hook-form"
import { se } from "date-fns/locale"
import { planService } from "@/api/payment/plan-service"
import { toast } from "sonner"
import { useParams } from "next/navigation"

interface UserData {
    name: string
    email: string
    avatar: string
}

export default function Settings() {
    const [currentTab, setCurrentTab] = useState(0)
    const [customer_id, setCustomer_id] = useState("")
    const [cpf_cnpj, setCpf_cnpj] = useState("")
    const [phone, setPhone] = useState("")
    const [data, setData] = useState<UserData>({ name: "", email: "", avatar: "" })
    const [loading, setLoading] = useState(true)
    const [cepLoading, setCepLoading] = useState(false);
    const [cepError, setCepError] = useState<string | null>(null);
    const [planID, setPlanID] = useState("")

    const params = useParams();

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    useEffect(() => {
        if (params.plan === "0") {
            setPlanID("Plano 0")
        } else if (params.plan === "1") {
            setPlanID("Plano 1")
        } else if (params.plan === "2") {
            setPlanID("Plano 2")
        }

        async function getData() {
            const token = await authService.getToken()

            const userData = await authService.getUserData()
            if (userData) {
                setData(JSON.parse(userData) as UserData)
                setLoading(false)
                return
            }

            await axios
                .get(routes.getUser + token)
                .then((response) => {
                    setData(response.data)
                    authService.setUserData(response.data)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        getData()
    }, [])

    async function onSubmit(data: any) {
        console.log(data)
        if (currentTab === 0) {
            const res = await planService.createCustomer(data)
            console.log(res)
            if (res.message == "Cliente criado com sucesso") {
                setCustomer_id(res.data.id)
                setCpf_cnpj(res.data.cpfCnpj)
                setPhone(res.data.phone)
                reset()
                setCurrentTab(1)
                toast.success("Cliente cadastrado com sucesso")
            } else {
                toast.error("Erro ao cadastrar cliente")
            }
            return
        } else if (currentTab === 1) {
            planService.createSubscription(planID, data, cpf_cnpj, customer_id, phone)
            return
        }
    }

    function returnPage() {
        setCurrentTab(0)
        reset()
    }

    function validarCPF(cpf: string): boolean {
        cpf = cpf.replace(/\D/g, "");
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(10))) return false;

        return true;
    }

    function validarCNPJ(cnpj: string): boolean {
        cnpj = cnpj.replace(/\D/g, "");
        if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== parseInt(digitos.charAt(0))) return false;

        tamanho++;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== parseInt(digitos.charAt(1))) return false;

        return true;
    }

    return (
        <SidebarProvider className="p-2">
            <SiderBarDefault />
            <SidebarInset className="border border-zinc-200/10 overflow-hidden px-4 md:px-6 lg:px-8 rounded-2xl">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b">
                    <div className="flex flex-1 items-center gap-2 px-3">
                        <SidebarTrigger className="-ms-4" />
                        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <a href="/dashboard" className="text-zinc-400">
                                        Dashboard
                                    </a>
                                </BreadcrumbItem>
                                <span className="text-zinc-400">/</span>
                                <BreadcrumbItem>
                                    <a href="/dashboard/setting" className="text-zinc-400">
                                        Configurações
                                    </a>
                                </BreadcrumbItem>
                                <span className="text-zinc-400">/</span>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Pagamento</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <ThemeToggle />
                    <UserDropdown />
                </header>

                <div className="flex flex-col gap-4 lg:gap-6 py-4 lg:py-6">
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        <div className="flex flex-col lg:flex-row lg:gap-8">
                            {/* Left Column - Form */}
                            <div className="lg:col-span-2 w-full">
                                <h1 className="text-3xl font-bold text-gray-900 mb-8">Pagamento</h1>

                                {/* Personal Data Section */}
                                <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg border p-6">
                                    {
                                        currentTab === 0 ?
                                            <div className="space-y-6 2xl:w-200">
                                                <div
                                                    className="flex items-center justify-between "
                                                >
                                                    <div>
                                                        <h2 className="text-lg font-semibold text-gray-900">Dados pessoais</h2>
                                                        <p className="text-sm text-gray-500">Para continuar sua compra preencha os campos abaixo</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <div>
                                                        <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                                                            Nome completo{" "}
                                                            {errors.name && (
                                                                <span className="text-red-500 text-xs">({errors.name.message as string})</span>
                                                            )}
                                                        </Label>
                                                        <Input
                                                            id="fullName"
                                                            placeholder="Nome completo"
                                                            className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
                                                            {...register("name", {
                                                                required: "Nome é obrigatório",
                                                                minLength: { value: 3, message: "Mínimo 3 caracteres" },
                                                                pattern: {
                                                                    value: /^[A-Za-zÀ-ÿ\s]+$/,
                                                                    message: "Use apenas letras e espaços"
                                                                }
                                                            })}
                                                        />
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="document" className="text-sm font-medium text-gray-700">
                                                            CPF ou CNPJ{" "}
                                                            {errors.cpf_cnpj && (
                                                                <span className="text-red-500 text-xs">
                                                                    ({errors.cpf_cnpj.message as string})
                                                                </span>
                                                            )}
                                                        </Label>
                                                        <Input
                                                            id="document"
                                                            placeholder="CPF ou CNPJ"
                                                            className={`mt-1 ${errors.cpf_cnpj ? "border-red-500" : ""}`}
                                                            maxLength={14}
                                                            {...register("cpf_cnpj", {
                                                                required: "CPF ou CNPJ é obrigatório",
                                                                minLength: {
                                                                    value: 11,
                                                                    message: "Digite pelo menos 11 dígitos (CPF)",
                                                                },
                                                                maxLength: {
                                                                    value: 14,
                                                                    message: "Digite no máximo 14 dígitos (CNPJ)",
                                                                },
                                                                validate: (value) => {
                                                                    const cleanValue = value.replace(/\D/g, "");
                                                                    if (cleanValue.length === 11) {
                                                                        return validarCPF(cleanValue) || "CPF inválido";
                                                                    }
                                                                    if (cleanValue.length === 14) {
                                                                        return validarCNPJ(cleanValue) || "CNPJ inválido";
                                                                    }
                                                                    return "Digite um CPF (11 dígitos) ou CNPJ (14 dígitos) válido";
                                                                },
                                                            })}
                                                        />
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Não é possível alterar o CPF ou CNPJ
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                                            Seu melhor e-mail{" "}
                                                            {errors.email && (
                                                                <span className="text-red-500 text-xs">({errors.email.message as string})</span>
                                                            )}
                                                        </Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            placeholder="Email"
                                                            className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
                                                            {...register("email", {
                                                                required: "Email é obrigatório",
                                                                pattern: {
                                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                                    message: "Digite um e-mail válido"
                                                                }
                                                            })}
                                                        />
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                                            Número de telefone{" "}
                                                            {errors.phone && (
                                                                <span className="text-red-500 text-xs">({errors.phone.message as string})</span>
                                                            )}
                                                        </Label>
                                                        <Input
                                                            id="phone"
                                                            placeholder="11912345678"
                                                            className={`mt-1 ${errors.phone ? "border-red-500" : ""}`}
                                                            type="text"
                                                            inputMode="numeric" // mostra teclado numérico no celular
                                                            maxLength={11}
                                                            {...register("phone", {
                                                                required: "Telefone é obrigatório",
                                                                minLength: {
                                                                    value: 10,
                                                                    message: "Digite pelo menos 10 dígitos (com DDD)",
                                                                },
                                                                maxLength: {
                                                                    value: 11,
                                                                    message: "Digite no máximo 11 dígitos (com DDD)",
                                                                },
                                                                pattern: {
                                                                    value: /^\d{10,11}$/,
                                                                    message: "Digite um número válido com DDD (10 ou 11 dígitos)",
                                                                },
                                                            })}
                                                            onInput={(e) => {
                                                                e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ""); // remove tudo que não for número
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            :

                                            <div className="space-y-6 2xl:w-200">
                                                <div
                                                    className="flex items-center justify-between "
                                                >
                                                    <div>
                                                        <h2 className="text-lg font-semibold text-gray-900">Informações de pagamento</h2>
                                                        <p className="text-sm text-gray-500">Para confirmar sua compra preencha os campos</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-4 w-full">

                                                    <div className="w-full flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4">
                                                        <div className="w-full">
                                                            <Label htmlFor="cep" className="text-sm font-medium text-gray-700">
                                                                CEP{" "}
                                                                {errors.cep && (
                                                                    <span className="text-red-500 text-xs">({errors.cep.message as string})</span>
                                                                )}
                                                            </Label>
                                                            <Input
                                                                id="cep"
                                                                placeholder="00000-000"
                                                                className={`mt-1 ${errors.cep ? "border-red-500" : ""}`}
                                                                maxLength={9}
                                                                {...register("cep", {
                                                                    required: "CEP é obrigatório",
                                                                    minLength: { value: 9, message: "CEP deve ter 8 dígitos (formato 00000-000)" },
                                                                    maxLength: { value: 9, message: "CEP deve ter 8 dígitos (formato 00000-000)" },
                                                                    pattern: {
                                                                        value: /^[0-9]{5}-[0-9]{3}$/,
                                                                        message: "Digite no formato 00000-000",
                                                                    },
                                                                    // validate pode incluir chamada à API ou validar depois no onBlur
                                                                    validate: async (val) => {
                                                                        const digits = val.replace(/\D/g, "");
                                                                        if (digits.length !== 8) return "CEP incompleto";
                                                                        try {
                                                                            setCepLoading(true);
                                                                            setCepError(null);
                                                                            const resp = await fetch(`https://brasilapi.com.br/api/cep/v2/${digits}`);
                                                                            if (!resp.ok) {
                                                                                // Se status for 404 ou outro erro
                                                                                throw new Error("CEP não encontrado");
                                                                            }
                                                                            const data = await resp.json();
                                                                            return true;
                                                                        } catch (err: any) {
                                                                            setCepError(err.message || "Erro ao consultar CEP");
                                                                            return "CEP inválido ou não encontrado";
                                                                        } finally {
                                                                            setCepLoading(false);
                                                                        }
                                                                    }
                                                                })}
                                                                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                    let value = e.target.value.replace(/\D/g, "");
                                                                    if (value.length > 8) value = value.slice(0, 8);
                                                                    if (value.length > 5) {
                                                                        value = value.slice(0, 5) + "-" + value.slice(5);
                                                                    }
                                                                    e.target.value = value;
                                                                }}
                                                            />
                                                            {cepLoading && <p className="text-sm text-gray-500 mt-1">Verificando CEP...</p>}
                                                            {/* {cepError && <p className="text-sm text-red-500 mt-1">{cepError === "Failed to fetch" ? "CEP inválido ou não encontrado" : cepError}</p>} */}
                                                        </div>

                                                        <div className="w-full">
                                                            <Label htmlFor="address_number" className="text-sm font-medium text-gray-700">
                                                                Número de endereço{" "}
                                                                {errors.address_number && (
                                                                    <span className="text-red-500 text-xs">({errors.address_number.message as string})</span>
                                                                )}
                                                            </Label>
                                                            <Input
                                                                id="address_number"
                                                                placeholder="Número do endereço"
                                                                className={`mt-1 ${errors.address_number ? "border-red-500" : ""}`}
                                                                {...register("address_number", {
                                                                    required: "Número de endereço é obrigatório",
                                                                    pattern: {
                                                                        value: /^[0-9]+$/,
                                                                        message: "Digite apenas números",
                                                                    },
                                                                })}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="card_name" className="text-sm font-medium text-gray-700">
                                                            Nome do cartão{" "}
                                                            {errors.card_name && (
                                                                <span className="text-red-500 text-xs">
                                                                    ({errors.card_name.message as string})
                                                                </span>
                                                            )}
                                                        </Label>
                                                        <Input
                                                            id="card_name"
                                                            placeholder="Nome impresso no cartão"
                                                            className={`mt-1 ${errors.card_name ? "border-red-500" : ""}`}
                                                            {...register("card_name", {
                                                                required: "Nome do cartão é obrigatório",
                                                                pattern: {
                                                                    value: /^[A-Za-zÀ-ÿ\s]+$/,
                                                                    message: "Digite apenas letras e espaços",
                                                                },
                                                            })}
                                                        />
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="card_number" className="text-sm font-medium text-gray-700">
                                                            Número do cartão{" "}
                                                            {errors.card_number && (
                                                                <span className="text-red-500 text-xs">({errors.card_number.message as string})</span>
                                                            )}
                                                        </Label>
                                                        <Input
                                                            id="card_number"
                                                            placeholder="1234 5678 9012 3456"
                                                            className={`mt-1 ${errors.card_number ? "border-red-500" : ""}`}
                                                            maxLength={19} // inclui os espaços
                                                            {...register("card_number", {
                                                                required: "Número do cartão é obrigatório",
                                                                minLength: { value: 13, message: "Mínimo 13 dígitos" },
                                                                maxLength: { value: 19, message: "Máximo 19 dígitos" },
                                                                pattern: {
                                                                    value: /^[0-9\s]+$/, // permite números e espaços
                                                                    message: "Digite apenas números",
                                                                },
                                                            })}
                                                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                let value = e.target.value.replace(/\D/g, ""); // remove tudo que não é número
                                                                if (value.length > 16) value = value.slice(0, 16); // limita a 16 dígitos
                                                                // adiciona espaço a cada 4 dígitos
                                                                value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
                                                                e.target.value = value;
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="w-full flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4">
                                                        <div className="w-full">
                                                            <Label htmlFor="card_cvv" className="text-sm font-medium text-gray-700">
                                                                CVV{" "}
                                                                {errors.card_cvv && (
                                                                    <span className="text-red-500 text-xs">({errors.card_cvv.message as string})</span>
                                                                )}
                                                            </Label>
                                                            <Input
                                                                id="card_cvv"
                                                                placeholder="CVV"
                                                                className={`mt-1 ${errors.card_cvv ? "border-red-500" : ""}`}
                                                                maxLength={3}
                                                                {...register("card_cvv", {
                                                                    required: "CVV é obrigatório",
                                                                    minLength: { value: 3, message: "CVV deve ter 3 dígitos" },
                                                                    maxLength: { value: 3, message: "CVV deve ter 3 dígitos" },
                                                                    pattern: {
                                                                        value: /^[0-9]{3}$/,
                                                                        message: "Digite apenas números",
                                                                    },
                                                                })}
                                                            />
                                                        </div>

                                                        <div className="w-full">
                                                            <Label htmlFor="card_val" className="text-sm font-medium text-gray-700">
                                                                Validade (MM/AA){" "}
                                                                {errors.card_val && (
                                                                    <span className="text-red-500 text-xs">({errors.card_val.message as string})</span>
                                                                )}
                                                            </Label>
                                                            <Input
                                                                id="card_val"
                                                                placeholder="MM/AA"
                                                                className={`mt-1 ${errors.card_val ? "border-red-500" : ""}`}
                                                                maxLength={5}
                                                                {...register("card_val", {
                                                                    required: "Campo obrigatório",
                                                                    pattern: {
                                                                        value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                                                                        message: "Formato inválido use MM/AA",
                                                                    },
                                                                })}
                                                                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                    let value = e.target.value.replace(/\D/g, ""); // só números
                                                                    if (value.length > 4) value = value.slice(0, 4);
                                                                    if (value.length > 2) {
                                                                        value = value.slice(0, 2) + "/" + value.slice(2);
                                                                    }
                                                                    e.target.value = value;
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    }

                                    <div className={`mt-6 flex ${currentTab === 0 ? "justify-end" : "justify-between"}`}>
                                        <Button type="button" onClick={() => returnPage()} className={`${currentTab === 0 ? "hidden" : "block"} px-6 font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-green-500/30 border border-zinc-500/30 dark:hover:border-green-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200`}>
                                            Voltar
                                        </Button>

                                        <Button type="submit" className="px-6 font-semibold bg-zinc-500/20 dark:bg-zinc-500/10 hover:bg-zinc-500/30 dark:hover:bg-green-500/30 border border-zinc-500/30 dark:hover:border-green-500/30 text-zinc-800/80 dark:text-white/70 hover:text-black/80 dark:hover:text-zinc-200 cursor-pointer duration-200">
                                            Proxima
                                        </Button>
                                    </div>
                                </form>

                                {/* Payment Method Section */}
                                {/* <div className="bg-white rounded-lg border">
                                    <div
                                        className="flex items-center justify-between p-6 cursor-pointer"
                                        onClick={() => setPaymentMethodExpanded(!paymentMethodExpanded)}
                                    >
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-900">Forma de Pagamento</h2>
                                            <p className="text-sm text-gray-500">Selecione a melhor forma de pagar</p>
                                        </div>
                                        {paymentMethodExpanded ? (
                                            <ChevronUp className="w-5 h-5 text-gray-400" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>

                                    {paymentMethodExpanded && (
                                        <div className="px-6 pb-6">
                                            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                                                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                                                    <RadioGroupItem value="pix" id="pix" />
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 bg-teal-500 rounded flex items-center justify-center">
                                                                <span className="text-white text-xs font-bold">₽</span>
                                                            </div>
                                                            <Label htmlFor="pix" className="font-medium">
                                                                Pix
                                                            </Label>
                                                        </div>
                                                        <p className="text-sm text-gray-500 mt-1">O pagamento será aprovado em instantes.</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                                                    <RadioGroupItem value="cards" id="cards" />
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <CreditCard className="w-5 h-5 text-gray-600" />
                                                            <Label htmlFor="cards" className="font-medium">
                                                                Cartões
                                                            </Label>
                                                        </div>
                                                        <p className="text-sm text-gray-500 mt-1">VISA, MasterCard, AMEX, Elo</p>
                                                    </div>
                                                </div>
                                            </RadioGroup>
                                        </div>
                                    )}
                                </div> */}
                            </div>

                            {/* Right Column - Order Summary */}
                            <div className="mt-6 lg:col-span-1 lg:mt-17">
                                <Card className="sticky top-8">
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalhes da sua compra</h3>
                                        <p className="text-sm text-gray-600 mb-6">
                                            Confirme os produtos, quantidade e valores de cada um dos itens que você selecionou
                                        </p>

                                        <div className="mb-6">
                                            <h4 className="font-medium text-gray-900 mb-4">Lista de itens:</h4>

                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h5 className="font-medium text-gray-900">{planID === "Plano 0" ? "Plano básico" : planID === "Plano 1" ? "Plano MEI" : planID === "Plano 2" ? "Plano LTDA" : "Não selecionado"}</h5>
                                                        <p className="text-sm text-gray-600">Tipo</p>
                                                        <p className="text-sm text-gray-600">Valor Total</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="h-6"></div>
                                                        <p className="text-sm text-gray-900">Mensalidade</p>
                                                        <p className="text-sm text-gray-900 font-medium">{planID === "Plano 0" ? "Gratuito" : planID === "Plano 1" ? "RS$ 19,99" : planID === "Plano 2" ? "R$ 29,99" : "Não selecionado"}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3 border-t pt-4">
                                            <div className="flex justify-between">
                                            </div>
                                            <div className="flex justify-between text-lg font-semibold">
                                                <span>Total</span>
                                                <span>{planID === "Plano 0" ? "Gratuito" : planID === "Plano 1" ? "RS$ 19,99" : planID === "Plano 2" ? "R$ 29,99" : "Não selecionado"}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
