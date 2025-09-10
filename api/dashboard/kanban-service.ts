import axios from "axios";
import { getCookie } from "cookies-next/client";
import { routes } from "../routes";

class KanbanService {
    async createTask(data: any, projectId: string) {
        console.log(data)
        const sessionId = getCookie("sessionId");
        await axios.post(routes.createKanban, {
            id_project: projectId,
            title: data.name,
            description: data.description,
            priority: Number(data.priority),
            createdBy: sessionId
        }, {
            headers: {
                authToken: sessionId
            }
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.error(err)
        });
    }

    async deleteTask(id: string) {
        const sessionId = getCookie("sessionId");
        await axios.delete(routes.deleteKanban + id, {
            headers: {
                authToken: sessionId
            }
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.error(err)
        });
    }
}

export const kanbanService = new KanbanService();