import axios from "axios";
import { routes } from "../routes";
import { getCookie } from "cookies-next/client";
import { toast } from "sonner";

class RelatoryService {
    async createRelatory(data: any) {
        const sessionId = getCookie("sessionId");
        await axios.post(routes.createRelatory, {
            relatory_owner: sessionId,
            title: data.name,
            content: "",
            group_id: JSON.parse(getCookie("activeTeam") as string).id_group
        }, {
            headers: {
                authToken: sessionId
            }
        }).then(res => {
            toast.success("Documento criado com sucesso!")
            window.location.reload();
        }).catch(err => {
            console.error(err)
        });
    }

    async updateRelatoryText(data: any, modifiedText?: string) {
        const sessionId = getCookie("sessionId");

        console.log(data)

        axios.post(routes.updateRelatory, {
            id: data.id_relatory,
            relatory_owner: data.relatory_owner ,
            title: data.title,
            content: modifiedText ? modifiedText : data.content,
        }, {
            headers: {
                authToken: sessionId
            }
        }).then(res => {
            toast.success("Documento atualizado com sucesso!")
        }).catch(err => {
            console.error(err)
        });
    }

    async updateRelatoryTitle(data: any, modifiedTitle: string) {
        const sessionId = getCookie("sessionId");

        console.log(data)

        axios.post(routes.updateRelatory, {
            id: data.id_relatory,
            relatory_owner: data.relatory_owner ,
            title: modifiedTitle ? modifiedTitle : data.title,
            content: data.content,
        }, {
            headers: {
                authToken: sessionId
            }
        }).then(res => {
            toast.success("Documento atualizado com sucesso!")
            window.location.reload();
        }).catch(err => {
            console.error(err)
        });
    }

    async deleteRelatory(id: string) {
        const sessionId = getCookie("sessionId");
        await axios.delete(routes.deleteRelatory + id, {
            headers: {
                authToken: sessionId
            }
        }).then(res => {
            toast.success("Documento deletado com sucesso!")
            window.location.reload();
        }).catch(err => {
            console.error(err)
        });
    }
}

export const relatoryService = new RelatoryService();