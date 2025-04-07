import api from '../api/apiService'

export const getUsers = async () => {
    try {
        return await api.get('/users/allUsers');
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const userLogin = async (userData) => {
    try {
        return await api.post('/auth/login', userData);
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

export const userRegister = async (userData) => {
    try {
        return await api.post('/auth/register', userData);
    } catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
}
