// class for api request through axios

import { useAuthStore } from "@/store/auth.store";
import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

export default ({ requiresAuth = false } = {}): AxiosInstance => {
    const authStore = useAuthStore();
    return axios.create({
        // let's hardcode for now
        baseURL: 'http://localhost:8080/',
        headers: {
            ...(requiresAuth ? { 'Authorization': `Bearer ${authStore.getAuthToken()}`} : {})
        }
    })
};