import axios from "axios";
import { authService } from "../auth-service";
import { routes } from "../routes";

class TeamService {
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

    async deleteTeam(id: number) {
        const token = await authService.getToken();

        const api = await axios.delete(routes.deleteTeam, {
            headers: {
                "authToken": token
            },
            data: {
                id_group: id
            }
        }).then((response) => {
            return true
        }).catch((error) => {
            console.error(error);
        });
    }
}

export const teamService = new TeamService();