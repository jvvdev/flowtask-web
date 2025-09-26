import axios from "axios";
import { getCookie } from "cookies-next/client";
import { routes } from "../routes";
import { stat } from "fs";
import { toast } from "sonner";

class KanbanService {
    async createTask(data: any, projectId: string) {
        console.log(data)
        const sessionId = getCookie("sessionId");
        await axios.post(routes.createKanban, {
            id_project: projectId,
            id_task: data.id_task,
            title: data.title ? data.title : data.name ? data.name : "",
            description: data.description,
            priority: Number(data.priority),
            status: data.status,
            attributedAt: data.attributedAt,
            initDate: data.initDate,
            endDate: data.endDate,
            all_day: data.all_day,
            color: data.color,
            label: data.label,
            location: data.location,
            createdBy: sessionId
        }, {
            headers: {
                authToken: sessionId
            }
        }).then(res => {
            toast.success("Tarefa criada com sucesso!")
            window.location.reload();
        }).catch(err => {
            console.error(err)
        });
    }

    async updateTaskDragAndDrop(data: any, status: string) {
        const sessionId = getCookie("sessionId");

        await axios.post(routes.updateKanban + data.id_kanban, {
            id_project: data.id_project,
            title: data.title,
            description: data.description,
            priority: data.priority,
            status: status,
            createdBy: data.createdBy,
        }, {
            headers: {
                authToken: sessionId
            }
        }).then(res => {
            toast.warning("Tarefa movida com sucesso!")
            return "ok"
        }).catch(err => {
            console.error(err)
        });
    }

    async updateTask(kanbanDetails: any, data: any) {
        const sessionId = getCookie("sessionId");

        await axios.post(routes.updateKanban + kanbanDetails.id_kanban, {
            id_project: kanbanDetails.id_project,
            createdBy: kanbanDetails.createdBy,
            title: data.title,
            description: data.description,
            priority: Number(data.priority),
            status: data.status,
        }, {
            headers: {
                authToken: sessionId
            }
        }).then(res => {
            toast.success("Tarefa modificada com sucesso!")
            window.location.reload();
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
            toast.success("Tarefa deletada com sucesso!")
            window.location.reload();
        }).catch(err => {
            console.error(err)
        });
    }
}

export const kanbanService = new KanbanService();