import api from '../api/apiService';

export const getUsers = async () => {
    try {
        return await api.get('/users/allUsers');
    } catch (error) {
        throw error;
    }
};

export const userLogin = async (userData) => {
    try {
        return await api.post('/auth/login', userData);
    } catch (error) {
        throw error;
    }
}

export const userRegister = async (userData) => {
    try {
        return await api.post('/auth/register', userData);
    } catch (error) {
        throw error;
    }
}

export const userUpdate = async (userId, userData) => {
    try {
        return await api.put(`/users/update/${userId}`, userData);
    } catch (error) {
        throw error;
    }
}
