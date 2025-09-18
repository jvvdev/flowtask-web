import axios from "axios";
import { getCookie } from "cookies-next/client";
import { routes } from "../routes";

class MemberService {
    async InviteMember(data: any) {
        const session_id = getCookie("sessionId");
        let actualProject = getCookie("activeTeam");
        actualProject = JSON.parse(actualProject as string);
        if (!actualProject) return;

        await axios.post(routes.inviteMember, {
            email: data.email,
            id_group: actualProject.id_group,
        }, {
            headers: {
                authToken: session_id
            }
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.error(err)
        });

    }

    async ModifyMember(data: any) {
        console.log(data)
    }

    async DeleteMember(memberId: string) {
        // Logic to delete a member
    }
}

export const memberService = new MemberService();