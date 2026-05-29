// Array de usuarios de prueba
const users = [
    { id: 1, nombre: 'Admin', apellido: 'Municipalidad', rut: '11.111.111-1', correo: 'admin@santodomingo.cl', password: 'admin123', rol: 'admin' },
    { id: 2, nombre: 'María José', apellido: 'Urzúa', rut: '15.432.110-K', correo: 'maria@correo.com', password: 'user123', rol: 'user' },
];

// Array de documentos de prueba (5 registros como los del frontend)
const documentos = [
    { id: 'EXP-2024-0892', solicitante: 'María José Urzúa', rut: '15.432.110-K', tipo: 'Permiso Edificación', fecha: '12 Oct 2023', hora: '09:45', estado: 'En Revisión', descripcion: 'Solicitud de permiso...', archivos: ['doc1.pdf'], userId: 2 },
    // ... más registros similares
];

const tickets = [];
const storage = { used: 3.1, total: 4.0, percentage: 78, categories: { pdf: 1.8, images: 0.9, database: 0.4 } };
const retentionPolicies = [ /* ... */];

module.exports = { users, documentos, tickets, storage, retentionPolicies };