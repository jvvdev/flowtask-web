import axios from "axios";
import { routes } from "../routes";
import { getCookie } from "cookies-next/client";

class RelatoryService {
    async createRelatory(data: any) {
        const sessionId = getCookie("sessionId");
        await axios.post(routes.createRelatory, {
            relatory_owner: sessionId,
            title: data.name,
            content: data.content,
        }, {
            headers: {
                authToken: sessionId
            }
        });
    }
}

export const relatoryService = new RelatoryService();