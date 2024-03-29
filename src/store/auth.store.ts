import { defineStore } from "pinia";
import { nextTick, ref } from "vue";
import Api from '@/service/api.service';
import { User, UserResponse } from "@/types/user/user";
import { useCookies } from "vue3-cookies";
import apiService from "@/service/api.service";

const AUTH_TOKEN = 'auth-token';
const AUTH_COOKIE_TOKEN = 'accessToken';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);
    const initStatus = ref<boolean>(false);
    async function init() {
        console.log('init');
        // should run once per page load
        if (initStatus.value) {
            return;
        }
        // send /me to see if token is alive and get user object
        const me = await getMe();
        if (!me) {
            removeToken();
        }
        user.value = me; //this can be null or user, no user == no
    }

    function isLoggedIn(): boolean {
        return user.value !== null;
    }

    async function getMe(): Promise<User | null> {
        try {
            return (await Api().get<UserResponse>('/auth/me', {
            })).data as User;
        } catch (e) {
            console.error(e)
            return null;
        }
    }

    async function login(email: string, password: string): Promise<boolean> {
        // handles login through api, 

        const body = {
            email,
            password
        };

        try {
            const res = await Api().post<UserResponse | ErrorResponse>('/auth/login', body);
            user.value = res.data as UserResponse
            return true;
        } catch (e) {
            alert((e as any).response.data.message);
            console.error(e);
            return false;
        }
    }

    async function register(name: string, email: string, password: string, confirmPassword: string): Promise<boolean> {
        // handles register through api, 

        const body = {
            name,
            email,
            password,
            confirmPassword
        };

        try {
            const res = await Api().post<UserResponse | ErrorResponse>('/auth/register', body);
            alert('User registered')
            return true;
        } catch (e) {
            alert(`Failed to register user: ${e}`)
            console.error(e);
            return false;
        }
    }

    function getToken(): string | null {
        const value = localStorage.getItem(AUTH_TOKEN)

        if (typeof value === 'string') {
            return value; // ok
        }

        return null;
    }

    function setToken(token: string): boolean {
        try {
            localStorage.setItem(AUTH_TOKEN, token);

            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    function removeToken() {
        localStorage.removeItem(AUTH_TOKEN);
    }

    function getAuthToken() {
        return getToken();
    }

    async function logout() {

        try {
            // session token cookie is set to be httpOnly, JS cannot update or remove the cookie
            // logout api will set the token to be empty = logged out
            await Api().post('/auth/logout');
            user.value = null;
            // for some reason this breaks the router if push to next page on the same tick
            nextTick(() => {
                //@ts-ignore
                this.router.push('/login');
            });
        } catch (e) {
            console.error(e);
            alert('logout failed');
        }

    }


    return { init, user, login, isLoggedIn, getAuthToken, logout, register }
})