import api from './api';

export const classesService = {
    list: async () => {
        const { data } = await api.get('/classes');
        return data;
    },
    create: async (payload) => {
        const { data } = await api.post('/classes', payload);
        return data;
    },
    get: async (id) => {
        const { data } = await api.get(`/classes/${id}`);
        return data;
    },
    update: async (id, payload) => {
        const { data } = await api.put(`/classes/${id}`, payload);
        return data;
    },
    remove: async (id) => {
        const { data } = await api.delete(`/classes/${id}`);
        return data;
    },
};
