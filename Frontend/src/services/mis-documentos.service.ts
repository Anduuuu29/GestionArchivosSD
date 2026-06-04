import api from './api';

export const misDocumentosService = {
    getAll: (params?: { page?: number; limit?: number }) =>
        api.get('/mis-documentos', { params }),

    getById: (id: string) =>
        api.get(`/mis-documentos/${id}`),

    create: (formData: FormData) => api.post('/mis-documentos', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),

    getArchivos: (documentoId: string) =>
    api.get(`/documentos/${documentoId}/archivos`),

    descargarArchivo: (archivoId: number, nombre: string) =>
        api.get(`/documentos/archivo/${archivoId}/descargar`, {
            responseType: 'blob',
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', nombre);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        }),

    verArchivo: (ruta: string) => {
        // ruta viene como 'uploads/archivos-xxx.pdf'
        return `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/${ruta}`;
},
};