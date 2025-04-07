import apiBaseUrl from './apiInstance';

const apiService = {
  get: async (url, config = {}) => {
    const response = await apiBaseUrl.get(url, config);
    return response.data;
  },

  post: async (url, data, config = {}) => {
    const response = await apiBaseUrl.post(url, data, config);
    console.log('response apiService', response);
    return response.data;
  },

  put: async (url, data, config = {}) => {
    const response = await apiBaseUrl.put(url, data, config);
    return response.data;
  },

  delete: async (url, config = {}) => {
    const response = await apiBaseUrl.delete(url, config);
    return response.data;
  },
};

export default apiService;
