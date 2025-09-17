import api from './api';

export const authService = {
    register: async (data) => {
        const response = await api.post('/register', data);
        return response.data;
    },

    login: async ({ email, password }) => {
        const response = await api.post('/login', { email, password });
        return response.data;
    },

    logout: async () => {
        const response = await api.post('/logout');
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get('/me');
        return response.data;
    },

    refreshUser: async () => {
        const response = await api.post('/refresh');
        return response.data;
    },
};
