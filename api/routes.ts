export const apiRoute = "http://26.13.17.173:3001"

export const routes = {
    // Auth Routes
    createAccount: apiRoute + "/create-account",
    authAccount: apiRoute + "/auth-account",
    authGoogle: apiRoute + "/auth/google",
    getUser: apiRoute + "/auth/get-account?session_id="
}
