import axios from "axios"
import { authService } from "../auth-service"
import { routes } from "../routes"

class PlanService {
    async createCustomer(data: any) {
        const sessionID = await authService.getToken()

        await axios.post(routes.createCustomer, data, {
            headers: {
                authToken: sessionID
            },
        }).then((response) => {
            console.log(response)
        }).catch((err) => {
            console.log(err)
        })
    }

    async createSubscription(data: any) {
        const dataToSend = {
            ...data,
            cep: data.cep.replace(/\D/g, ""),             // remove traço
            card_val: data.card_val.replace(/\D/g, ""),   // remove barra
            card_number: data.card_number.replace(/\s/g, ""), // remove espaços
            card_cvv: data.card_cvv.replace(/\D/g, ""),   // apenas números (opcional, por segurança)
            address_number: data.address_number.replace(/\D/g, ""), // garante que é só número
        };
    }
}

export const planService = new PlanService()