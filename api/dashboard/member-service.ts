import axios from "axios";
import { getCookie } from "cookies-next/client";
import { routes } from "../routes";
import { toast } from "sonner";

class MemberService {
    async InviteMember(data: any) {
        const session_id = getCookie("sessionId");
const actualProjectRaw = getCookie("activeTeam");
        const actualProject: { id_group: string } | null = actualProjectRaw ? JSON.parse(actualProjectRaw as string) : null;
        if (!actualProject) return;

        await axios.post(routes.inviteMember, {
            email: data.email,
            id_group: actualProject.id_group,
            type: "invite"
        }, {
            headers: {
                authToken: session_id
            }
        }).then(res => {
            toast.success("Convite enviado com sucesso!")
            window.location.reload();
            console.log(res)
        }).catch(err => {
            console.error(err)
        });

    }

    async ModifyMember(data: any) {
        console.log(data)
    }

    async DeleteMember(email: string) {
        const session_id = getCookie("sessionId");
const actualProjectRaw = getCookie("activeTeam");
        const actualProject: { id_group: string } | null = actualProjectRaw ? JSON.parse(actualProjectRaw as string) : null;
        if (!actualProject) return;

        axios.delete(routes.removeMember, {
            headers: {
                authToken: session_id
            },
            data: {
                email: email,
                id_group: actualProject.id_group
            }
        }).then(res => {
            toast.success("Membro expulso com sucesso!")
            window.location.reload();
        }).catch(err => {
            console.error(err)
        });
    }
}

export const memberService = new MemberService();