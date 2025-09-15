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

class TeamService {
    async deleteAllTeams() {
        deleteCookie('allTeams');
        deleteCookie('activeTeam');
        window.location.reload();
    }

    async createTeam(data: any) {
        const token = await authService.getToken();

        const api = await axios.post(routes.createTeam, {
            group_owner: token,
            name: data.name,
            description: data.description
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

    async getTeams() {

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

    deleteActiveTeam() {
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