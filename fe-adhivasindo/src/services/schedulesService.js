import api from './api';

export const schedulesService = {
    list: async () => {
        const { data } = await api.get('/schedules');
        return data;
    },
    create: async (payload) => {
        const { data } = await api.post('/schedules', payload);
        return data;
    },
    get: async (id) => {
        const { data } = await api.get(`/schedules/${id}`);
        return data;
    },
    update: async (id, payload) => {
        const { data } = await api.put(`/schedules/${id}`, payload);
        return data;
    },
    remove: async (id) => {
        const { data } = await api.delete(`/schedules/${id}`);
        return data;
    },
};
