import { create } from "domain"
import { get } from "http"

// export const apiRoute = "http://26.13.17.173:8080"
export const apiRoute = "https://flowtask-dev.vemency.com"

export const routes = {
    // Auth Routes
    createAccount: apiRoute + "/create-account",
    authAccount: apiRoute + "/auth-account",
    authGoogle: apiRoute + "/auth/google",
    getUser: apiRoute + "/auth/get-account?session_id=",
    logout: apiRoute + "/auth/logout?session_id=",

    // Team Routes
    createTeam: apiRoute + "/create-group",
    updateTeam: apiRoute + "/update-group",
    deleteTeam: apiRoute + "/delete-group/",
    getTeam: apiRoute + "/get-group/",
    getTeams: apiRoute + "/get-groups",
    getTeamByUser: apiRoute + "/get-groups-by-user",
    getMembersByTeam: apiRoute + "/get-users-by-group/",
    inviteMember: apiRoute + "/groups/invite",
    removeMember: apiRoute + "/groups/remove-member",

    // Project Routes
    createProject: apiRoute + "/create-project",
    getProjectsByUser: apiRoute + "/get-projects/user",
    getProjects: apiRoute + "/list-projects/group/",
    getProjectsDetailsByUser: apiRoute + "/project-metrics/",
    getProjectDetails: apiRoute + "/projects/",
    deleteProject: apiRoute + "/delete-project",

    // Kanban Routes
    getKanbanByProject: apiRoute + "/list-by-project/",
    createKanban: apiRoute + "/create-kanban",
    updateKanban: apiRoute + "/update-kanban/",
    deleteKanban: apiRoute + "/delete-kanban/",

    // Relatory Routes
    createRelatory: apiRoute + "/create-relatory",
    updateRelatory: apiRoute + "/update-relatory",
    getRelatoryByGroup: apiRoute + "/group-relatory/",
    deleteRelatory: apiRoute + "/delete-relatory/",

    // Task Routes
    createTask: apiRoute + "/create-task",
    updateTask: apiRoute + "/update-task/",
    deleteTask: apiRoute + "/delete-task/",
    getTasksByGroup: apiRoute + "/tasks/group/",
    getTasksByUser: apiRoute + "/tasks/person",

    // Comment Routes
    createComment: apiRoute + "/kanban/comment",
    getCommentsByTask: apiRoute + "/kanban/",
    deleteComment: apiRoute + "/comment/",
}
