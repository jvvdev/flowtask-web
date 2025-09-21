import {
    getCookie,
    getCookies,
    setCookie,
    deleteCookie,
    hasCookie,
    useGetCookies,
    useSetCookie,
    useHasCookie,
    useDeleteCookie,
    useGetCookie,
} from 'cookies-next/client';

import axios from "axios";
import { authService } from "../auth-service";
import { routes } from "../routes";
import { toast } from 'sonner';

class TeamService {
    async deleteAllTeams() {
        deleteCookie('allTeams');
        deleteCookie('activeTeam');
        window.location.reload();
    }

    async createTeam(data: any) {
        const token = await authService.getToken();
        let userData = await authService.getUserData();

        userData = JSON.parse(userData || '{}');

        if (!userData || !userData.google_id) {
            return false;
        }

        const api = await axios.post(routes.createTeam, {
            group_owner: userData.google_id,
            name: data.name,
            description: data.description
        }, {
            headers: {
                "authToken": token
            }
        }).then((response) => {
            deleteCookie("allTeams");
            window.location.reload();
            return true
        }).catch((error) => {
            console.error(error);
        });
    }

    async getTeams() {

    }

    async requestJoin(data: any) {
        const token = await authService.getToken();
        
        const api = await axios.post(routes.inviteMember, {
            email: data.email,
            id_group: data.id_group,
            type: "request"
        }, {
            headers: {
                "authToken": token
            }
        }).then((res) => {
            const message = res.data.message;

            toast(message)
        }).catch((error) => {
            const message = error.data.message;
            toast('Não foi possivel enviar seu pedido de convite');
            console.error(error);
        })
    }

    async updateTeam(id: string, data: any) {
        const token = await authService.getToken();

        const api = await axios.post(routes.updateTeam, {
            id_group: id,
            name: data.modify_name,
            description: data.modify_description
        }, {
            headers: {
                "authToken": token
            }
        }).then((response) => {
            return true
        }).catch((error) => {
            console.error(error);
        });
    }

    async deleteTeam(id: string) {
        const session_id = await authService.getToken();

        const api = await axios.delete(routes.deleteTeam + id, {
            headers: {
                "authToken": session_id
            },
            // data: {
            //     id_group: id
            // }
        }).then((response) => {
            this.deleteAllTeams()
            return true
        }).catch((error) => {
            console.error(error);
        });
    }

    async getTeamByUser() {
        return getCookie('activeTeam');
    }

    async getActiveTeam() {
        if (await this.getTeamByUser()) {
            return true
        } else {
            return false
        }
    }

    async setTeamByUser(team: any) {
        setCookie('activeTeam', team);
    }

    async deleteActiveTeam() {
        deleteCookie('activeTeam');
        window.location.reload();
    }

    async setAllTeams(team: any) {
        setCookie('allTeams', team);
    }

    async getAllTeams() {
        return getCookie('allTeams');
    }
}

export const teamService = new TeamService();