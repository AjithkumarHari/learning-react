import apiBaseUrl from "./apiInstance";

const apiService = {
    get: async (url, config = {}) => {
        return await apiBaseUrl.get(url, config);
    },

    post: async (url, data, config = {}) => {
        return await apiBaseUrl.post(url, data, config);
    },

    put: async (url, data, config = {}) => {
        return await apiBaseUrl.put(url, data, config);
    },

    delete: async (url, config = {}) => {
        return await apiBaseUrl.delete(url, config);
    },
};

export default apiService;
