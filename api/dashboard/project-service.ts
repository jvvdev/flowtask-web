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

        console.log(data)

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
                resume: data.resume,
                owner_email: ownerInfo.email,
                owner: sessionId,
                owner_name: ownerInfo.name,
                owner_avatar: ownerInfo.avatar,
                id_group: JSON.parse(actualGroup as string).id_group
            }, {
                headers: {
                    authToken: sessionId
                }
            }).then(res => {
                window.location.reload();
            }).catch(err => {
                console.error(err)
            })
        }).catch(err => {
            console.error("Error fetching user data:", err)
        })
    }

    async deleteProject(id: string) {
        const sessionId = getCookie("sessionId")
        axios.delete(routes.deleteProject, {
            headers: {
                authToken: sessionId
            },
            data: {
                project_id: id
            }
        }).then(res => {
            window.location.reload();
        }).catch(err => {
            console.error(err)
        })
    }
}

export const projectService = new ProjectService()