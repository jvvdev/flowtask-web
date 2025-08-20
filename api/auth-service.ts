import axios from "axios"
import { routes } from "./routes"
import { redirect } from "next/navigation"
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
            await axios.post(routes.createAccount, userData, {
                headers: { "ngrok-skip-browser-warning": "69420" }
            })
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
            await axios.post(routes.authAccount, userData, {
                headers: { "ngrok-skip-browser-warning": "69420" }
            })
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

    // get user 
    async getUser(data: any, setData: any) {
        const token = getCookie('token');

        const api = await axios.get(routes.getUser + token, {
            headers: { "ngrok-skip-browser-warning": "69420" }
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
    }
}

export const authService = new AuthService()