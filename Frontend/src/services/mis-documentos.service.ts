import api from './api';

export const misDocumentosService = {
    getAll: (params?: { page?: number; limit?: number }) =>
        api.get('/mis-documentos', { params }),

    getById: (id: string) =>
        api.get(`/mis-documentos/${id}`),

    create: (data: { categoria: string; asunto: string; descripcion?: string }) =>
        api.post('/mis-documentos', data),
};