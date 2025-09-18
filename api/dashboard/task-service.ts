import { getCookie } from "cookies-next/client";
import { routes } from "../routes";
import axios from "axios";
import { group } from "console";

class TaskService {
    async createTask(data: any) {
        const session_id = getCookie("sessionId");
        // const actualProject = getCookie("activeProject");
        const actualProject = "3f8db29b-d048-42fd-a6ba-59eec3f785a2"

        await axios.post(routes.createTask, {
            // group_id: JSON.parse(actualProject as string).id_group,
            group_id: actualProject,
            attributedAt: data.attributedAt,
            title: data.title,
            description: data.description,
            priority: Number(data.priority),
            status: data.status,
            all_day: data.all_day,
            color: data.color,
            initDate: data.start,
            endDate: data.end,
            createdBy: session_id
        }, {
            headers: {
                authToken: session_id
            }
        });
    }
}

export const taskService = new TaskService();