import axios from 'axios';
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
import { routes } from '../routes';

class ProjectService {
    async createProject(data: any) {
        const actualGroup = getCookie("activeTeam")
        const sessionId = getCookie("sessionId")
        let ownerInfo = {
            name: "",
            email: "",
            avatar: ""
        }

        axios.get(routes.getUser + sessionId, {
            headers: {
                authToken: sessionId
            }
        }).then(res => {
            ownerInfo.name = res.data.name
            ownerInfo.email = res.data.email
            ownerInfo.avatar = res.data.picture

            axios.post(routes.createProject, {
                title: data.name,
                resume: data.description,
                owner_email: ownerInfo.email,
                owner_name: ownerInfo.name,
                owner_avatar: ownerInfo.avatar,
                id_group: JSON.parse(actualGroup as string).id_group
            }, {
                headers: {
                    authToken: sessionId
                }
            }).then(res => {
                console.log("deu bão", res)
            }).catch(err => {
                console.error("Error creating project:", err)
            })
        }).catch(err => {
            console.error("Error fetching user data:", err)
        })
    }
}

export const projectService = new ProjectService()