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

    // login with google
    async loginWithGoogle() {
        redirect(routes.authGoogle);
    }

    // get token 
    async getToken() {
        return getCookie('sessionId');
    }

    async setUserData(data: any) {
        setCookie('userData', data, { maxAge: 120 });
    }

    async getUserData() {
        return getCookie('userData');
    }

    async logout() {
        const sessionId = getCookie("sessionId");
        await axios.post(routes.logout + sessionId, {
            headers: {
                authToken: sessionId
            }
        }).then(res => {
            deleteCookie("sessionId");
            deleteCookie("userData");
            deleteCookie("activeTeam");
            window.location.reload();
        }).catch(err => {
            console.error(err)
        });
    }
}

export const authService = new AuthService()