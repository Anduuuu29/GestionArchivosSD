import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    headers: { 'Content-Type': 'application/json' },
});

// Interceptor para agregar token JWT a cada petición
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor para manejar errores 401 (no autorizado)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const message = error.response?.data?.message || 'Error de comunicación con el servidor.';

        if (status === 401) {
            // Avoid redirecting if the error is from the auth endpoints
            const isAuthEndpoint = error.config?.url?.includes('/auth/login') || error.config?.url?.includes('/auth/register');
            
            if (!isAuthEndpoint) {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                localStorage.removeItem('isAuthenticated');
                
                if (window.location.pathname !== '/' && window.location.pathname !== '/admin/login') {
                    window.location.href = '/';
                }
            }
        }

        // Despachar evento para que el componente global de toast lo muestre en pantalla
        window.dispatchEvent(new CustomEvent('api-error', { 
            detail: { message } 
        }));

        return Promise.reject(error);
    }
);

export default api;