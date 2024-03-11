// class for api request through axios

import { useAuthStore } from "@/store/auth.store";
import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

export default (): AxiosInstance => {
    return axios.create({
        // let's hardcode for now
        baseURL: 'http://localhost:8080/',
        withCredentials: true,
        // removing this, implemented cookie session
        // headers: {
        //     ...(requiresAuth ? { 'Authorization': `Bearer ${authStore.getAuthToken()}`} : {})
        // }
    })
};