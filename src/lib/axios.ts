import axios from 'axios';
import { env } from '@/env';

export const api = axios.create({
    baseURL: env.VITE_API_URL,
    withCredentials: true // -- to send the cookies received from the backend on the request
});
