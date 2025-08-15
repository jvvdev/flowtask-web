import axios from "axios"
import { routes } from "./routes"
import { redirect } from "next/navigation"

class AuthService {
    // register account
    async register(data: any) {
        const name = data.firstName + " " + data.lastName
        const userData = {
            name,
            email: data.email,
            password: data.password
        }

        // send to api
        try {
            await axios.post(routes.createAccount, userData)
        } catch (error) {
            console.error(error)
        }
    }

    // login in account
    async login(data: any) {
        const userData = {
            email: data.email,
            password: data.password
        }

        // send to api
        try {
            await axios.post(routes.authAccount, userData)
        } catch (error) {
            console.error(error)
        }
    }

    async loginWithGoogle() {
        redirect(routes.authGoogle);
        // await axios.get(routes.authGoogle).then((response) => {
        //     redirect(routes.authGoogle);
        // }).catch((err) => {
        //     console.error(err)
        // })
    }
}

export const authService = new AuthService()