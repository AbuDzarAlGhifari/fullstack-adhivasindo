import api from './api';

export const reportsService = {
    list: async () => {
        const { data } = await api.get('/reports');
        return data;
    },
    create: async (payload) => {
        const { data } = await api.post('/reports', payload);
        return data;
    },
    get: async (id) => {
        const { data } = await api.get(`/reports/${id}`);
        return data;
    },
    update: async (id, payload) => {
        const { data } = await api.put(`/reports/${id}`, payload);
        return data;
    },
    remove: async (id) => {
        const { data } = await api.delete(`/reports/${id}`);
        return data;
    },
};
