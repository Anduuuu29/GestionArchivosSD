import api from './api';

export const notificacionesService = {
    getAll: () =>
        api.get('/notificaciones'),

    getContador: () =>
        api.get('/notificaciones/contador'),

    marcarLeida: (id: number) =>
        api.put(`/notificaciones/${id}/leer`),

    marcarTodasLeidas: () =>
        api.put('/notificaciones/leer-todas'),
};
