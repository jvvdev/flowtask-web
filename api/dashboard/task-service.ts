import { getCookie } from "cookies-next/client";
import { routes } from "../routes";
import axios from "axios";
import { group } from "console";

class TaskService {
    async createTask(data: any) {
        try {
            const session_id = getCookie("sessionId");
            const actualProject = getCookie("activeTeam");

            const res = await axios.post(routes.createTask,
                {
                    group_id: JSON.parse(actualProject as string).id_group,
                    attributedAt: data.attributedAt,
                    title: data.title,
                    description: data.description,
                    priority: Number(data.priority),
                    status: data.status,
                    all_day: data.all_day,
                    color: data.color,
                    initDate: data.initDate,
                    endDate: data.endDate,
                    createdBy: session_id,
                },
                {
                    headers: {
                        authToken: session_id,
                    },
                }
            );

            window.location.reload();

            return res.data; // devolve o que a API respondeu
        } catch (err) {
            console.error("Erro ao criar task:", err);
            throw err; // deixa o componente que chamou decidir o que fazer
        }
    }

    async updateTask(data: any) {
        try {
            const session_id = getCookie("sessionId");
            const actualProject = getCookie("activeTeam");
            console.log(data)


            const res = await axios.post(routes.updateTask + data.id_task,
                {
                    group_id: JSON.parse(actualProject as string).id_group,
                    attributedAt: data.attributedAt,
                    title: data.title,
                    description: data.description,
                    priority: Number(data.priority),
                    status: data.status,
                    all_day: data.all_day,
                    color: data.color,
                    initDate: new Date(data.initDate),
                    endDate: new Date(data.endDate),
                },
                {
                    headers: {
                        authToken: session_id,
                    },
                }
            );

            return res.data;
        } catch (err) {
            console.error("Erro ao atualizar task:", err);
            throw err;
        }
    }

    async deleteTask(id: string) {
        try {
            const sessionId = getCookie("sessionId");
            const res = await axios.delete(routes.deleteTask + id, {
                headers: {
                    authToken: sessionId,
                },
            });

            return res.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

export const taskService = new TaskService();