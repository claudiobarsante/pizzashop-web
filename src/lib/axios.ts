import axios from 'axios';
import { env } from '@/env';

export const api = axios.create({
    baseURL: env.VITE_API_URL,
    withCredentials: true // -- to send the cookies received from the backend on the request
});

// -- before  all requests, delay the requests in 2 seconds
if (env.VITE_ENABLE_API_DELAY) {
    // -- config is the object that contains the configuration of the request
    api.interceptors.request.use(async (config) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return config;
    });
}
