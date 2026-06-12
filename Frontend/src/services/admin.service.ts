import api from './api';

export const adminService = {
    getStorage: () =>
        api.get('/admin/storage'),

    getRetention: () =>
        api.get('/admin/retention'),

    purgeExpired: () =>
        api.post('/admin/purge/expired'),
};
