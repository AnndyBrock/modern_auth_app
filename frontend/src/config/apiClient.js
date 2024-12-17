import axios from "axios";
import queryClient from "./queryClient.js";
import {navigate} from "../lib/navigation.js";

const options = {
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials: true
}

const RefreshTokenClient = axios.create(options);
RefreshTokenClient.interceptors.response.use(
    (response) => response.data);

const API = axios.create(options);

API.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const {config, response} = error;
        const {status, data} = response || {};

        //try to refresh access token
        if (status === 401&& data?.errorCode === "InvalidAccessToken") {
            try{
                await RefreshTokenClient.get("/auth/refresh");
                return RefreshTokenClient(config)
            } catch (e) {
                queryClient.clear();
                navigate('/login');
            }
        }

        return Promise.reject({status,...data});
    }
)

export default API
