import { getCookie } from "cookies-next/client";
import { routes } from "../routes";
import axios from "axios";
import { group } from "console";

class TaskService {
    async createTask(data: any) {
        const session_id = getCookie("sessionId");
        const actualProject = getCookie("activeProject");

        await axios.post(routes.createTask, {
            group_id: JSON.parse(actualProject as string).id_group,
            attributedAt: data.attributedTo,
            title: data.title,
            description: data.description,
            priority: Number(data.priority),
            status: data.status,
            initDate: data.initDate,
            endDate: data.endDate,
            createdBy: session_id
        }, {
            headers: {
                authToken: session_id
            }
        });
    }
}

export const taskService = new TaskService();