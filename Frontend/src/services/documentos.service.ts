import api from './api';

export const documentosService = {
    getAll: (params?: { estado?: string; page?: number; limit?: number }) =>
        api.get('/documentos', { params }),

    getById: (id: string) =>
        api.get(`/documentos/${id}`),

    create: (data: { categoria: string; asunto: string; descripcion?: string }) =>
        api.post('/documentos', data),

    update: (id: string, data: { tipo?: string; descripcion?: string; estado?: string }) =>
        api.put(`/documentos/${id}`, data),

    remove: (id: string) =>
        api.delete(`/documentos/${id}`),

    rechazar: (id: string, motivo: string) =>
        api.post(`/documentos/${id}/rechazar`, { motivo }),
};