import api from './api';

export const ticketsService = {
    create: (data: { asunto: string; descripcion: string }) =>
        api.post('/tickets', data),

    getAll: () =>
        api.get('/tickets'),

    getById: (id: string) =>
        api.get(`/tickets/${id}`),

    getAllAdmin: (params?: { estado?: string; page?: number; limit?: number }) =>
        api.get('/admin/tickets', { params }),

    updateStatus: (id: string, estado: string) =>
        api.put(`/admin/tickets/${id}`, { estado }),
};
