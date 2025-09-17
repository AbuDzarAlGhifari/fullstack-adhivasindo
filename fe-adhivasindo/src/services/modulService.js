import api from './api';

export const modulService = {
    list: async () => {
        const { data } = await api.get('/moduls');
        return data;
    },
    create: async (payload) => {
        const { data } = await api.post('/moduls', payload);
        return data;
    },
    get: async (id) => {
        const { data } = await api.get(`/moduls/${id}`);
        return data;
    },
    update: async (id, payload) => {
        const { data } = await api.put(`/moduls/${id}`, payload);
        return data;
    },
    remove: async (id) => {
        const { data } = await api.delete(`/moduls/${id}`);
        return data;
    },
};
