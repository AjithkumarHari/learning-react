import axios from 'axios';

const apiBaseUrl = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getUsers = async () => {
    try {
        const response = await apiBaseUrl.get('/users/allUsers');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const userLogin = async (userData) => {
    try {
        const response = await apiBaseUrl.post('/auth/login', userData);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

export const userRegister = async (userData) => {
    try {
        const response = await apiBaseUrl.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
}
