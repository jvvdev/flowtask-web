export const apiRoute = "https://75cae8ee7110.ngrok-free.app"

export const routes = {
    // Auth Routes
    createAccount: apiRoute + "/create-account",
    authAccount: apiRoute + "/auth-account",
    authGoogle: apiRoute + "/auth/google",
    getUser: apiRoute + "/auth/get-account?session_id="
}
