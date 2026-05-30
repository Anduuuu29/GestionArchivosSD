import api from './api';

export const ticketsService = {
    create: (data: { asunto: string; descripcion: string }) =>
        api.post('/tickets', data),
};