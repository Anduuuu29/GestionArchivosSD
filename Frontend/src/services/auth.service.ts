import api from './api';

export const authService = {
    login: (identifier: string, password: string) =>
        api.post('/auth/login', { correo: identifier, password }),

    register: (data: {
        nombre: string;
        apellido: string;
        rut: string;
        correo: string;
        region: string;
        comuna: string;
        password: string;
    }) => api.post('/auth/register', data),
};