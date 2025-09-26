import axios from "axios";
import { getCookie } from "cookies-next/client";
import { routes } from "../routes";
import { authService } from "../auth-service";
import { toast } from "sonner";

class CommentsService {
    async createComment(data: any, id_task: string) {
        try {
            const session_id = getCookie("sessionId");
            let userData = await authService.getUserData()
            userData = JSON.parse(userData as string)

            if (!userData) {
                return
            }

            const res = await axios.post(routes.createComment,
                {
                    id_kanban: id_task,
                    comment: data.content,
                    commentBy: session_id
                },
                {
                    headers: {
                        authToken: session_id,
                    },
                }
            );

            return res.data;
        } catch (err) {
            console.error("Erro ao criar task:", err);
            throw err;
        }
    }

    async deleteComment(id_comment: string) {
        try {
            const session_id = getCookie("sessionId");
            let userData = await authService.getUserData()
            userData = JSON.parse(userData as string)

            if (!userData) {
                return
            }

            const res = await axios.delete(routes.deleteComment + id_comment,
                {
                    headers: {
                        authToken: session_id,
                    },
                }
            );

            toast.success("Comentário deletado com sucesso!")

            return res.data;
        } catch (err) {
            console.error("Erro ao deletar task:", err);
            throw err;
        }
    }
}

export const commentsService = new CommentsService();