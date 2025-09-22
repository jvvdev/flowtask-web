import axios from "axios"
import { authService } from "../auth-service"
import { routes } from "../routes"
import { Phone } from "lucide-react"

class PlanService {
    async createCustomer(data: any) {
        const sessionID = await authService.getToken()

        try {
            const res = await axios.post(routes.createCustomer, data, {
                headers: {
                    authToken: sessionID
                },
            })

            return res.data
        } catch (err) {
            console.error("Erro ao criar cliente:", err);
            throw err;
        }
    }

    async createSubscription(plan: string, data: any, cpf_cnpj: string, customer_id: string, phone: string) {
        const dataToSend = {
            plan: plan,
            customer_id: customer_id,
            cpf_cnpj: cpf_cnpj,
            cep: data.cep.replace(/\D/g, ""),
            adress_number: data.adress_number, 
            phone: phone,
            card_name: data.card_name,
            card_expiry_month: data.card_val.replace(/\D/g, "").slice(0, 2),
            card_expiry_year: 20 + data.card_val.replace(/\D/g, "").slice(2, 4),
            card_number: data.card_number.replace(/\s/g, ""), // remove espaços
            card_cvv: data.card_cvv.replace(/\D/g, ""),   // apenas números (opcional, por segurança)
            address_number: data.address_number.replace(/\D/g, ""), // garante que é só número
        };

        console.log(dataToSend, cpf_cnpj, customer_id)

        const sessionID = await authService.getToken()

        try {
            const res = await axios.post(routes.buyPlan, dataToSend, {
                headers: {
                    authToken: sessionID
                },
            })

            return res.data
        } catch (err) {
            console.error("Erro ao criar cliente:", err);
            throw err;
        }
    }
}

export const planService = new PlanService()