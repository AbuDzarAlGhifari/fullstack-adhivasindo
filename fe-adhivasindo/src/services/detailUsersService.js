import api from './api';

export const detailUsersService = {
    list: async () => {
        const { data } = await api.get('/detail-users');
        return data;
    },
    create: async (payload) => {
        const { data } = await api.post('/detail-users', payload);
        return data;
    },
    update: async (id, payload) => {
        const { data } = await api.put(`/detail-users/${id}`, payload);
        return data;
    },
};
