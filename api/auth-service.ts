import axios from "axios"
import { routes } from "./routes"

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
}

export const service = new AuthService()