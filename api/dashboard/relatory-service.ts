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
            group_id: JSON.parse(getCookie("activeTeam") as string).id_group
        }, {
            headers: {
                authToken: sessionId
            }
        }).then(res => {
            window.location.reload();
        }).catch(err => {
            console.error(err)
        });
    }

    async updateRelatory(id: string, data: any) {
        const sessionId = getCookie("sessionId");

        
    }

    async deleteRelatory(id: string) {
        const sessionId = getCookie("sessionId");
        await axios.delete(routes.deleteRelatory + id, {
            headers: {
                authToken: sessionId
            }
        }).then(res => {
            window.location.reload();
        }).catch(err => {
            console.error(err)
        });
    }
}

export const relatoryService = new RelatoryService();