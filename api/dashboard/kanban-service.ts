import axios from "axios";
import { getCookie } from "cookies-next/client";
import { routes } from "../routes";
import { stat } from "fs";

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
            window.location.reload();
        }).catch(err => {
            console.error(err)
        });
    }
}

export const kanbanService = new KanbanService();