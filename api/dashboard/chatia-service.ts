import axios from "axios";
import { routes } from "../routes";
import { authService } from "../auth-service";
import { toast } from "sonner";

class ChatIaService {
    async getResponse(data: any) {
        const sessionId = await authService.getToken();

        try {
            const res = await axios.post(routes.chat_ia_response, {
                prompt: data
            }, {
                headers: {
                    authToken: sessionId
                }
            })

            toast.success("Pergunta enviada com sucesso!")

            return res.data
        } catch (err) {
            console.error("Erro ao responder à pergunta:", err);
            throw err; // deixa o componente que chamou decidir o que fazer
        }
    }
}

export const chatIaService = new ChatIaService();