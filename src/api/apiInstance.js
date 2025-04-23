import axios from 'axios';
import { useStore } from '../store/authStore';
import { toast } from 'react-toastify';

const apiBaseUrl = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiBaseUrl.interceptors.request.use(
    (config) => {
        const token = useStore.getState().token;
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiBaseUrl.interceptors.response.use(
    (response) => {
        console.log('Response from interceptor:', response);
        toast.success(response.data.message);
        return response.data;
    },
    (error) => {
        console.error('Error from interceptor:', error);
        toast.error(error.response.data.message || 'Something went wrong!');
    }
);

export default apiBaseUrl;