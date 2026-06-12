const { hashSync } = require('bcryptjs');

const sequelize = require('./connection');
const { Usuario, Documento, ArchivoDocumento, Ticket, Trazabilidad, Notificacion } = require('./models');

async function syncDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a PostgreSQL establecida correctamente.');

        await sequelize.sync({ force: false });
        console.log('Tablas sincronizadas.');

        // Seed si la BD está vacía
        const userCount = await Usuario.count();
        if (userCount === 0) {
            await Usuario.bulkCreate([
                { nombre: 'Admin', apellido: 'Municipalidad', rut: '11.111.111-1', correo: 'admin@santodomingo.cl', password: hashSync('admin123', 10), rol: 'admin' },
                { nombre: 'María José', apellido: 'Urzúa', rut: '15.432.110-K', correo: 'maria@correo.com', password: hashSync('user123', 10), rol: 'user' },
            ]);

            await Documento.bulkCreate([
                { idExpediente: 'EXP-2024-0892', solicitante: 'María José Urzúa', rut: '15.432.110-K', tipo: 'Permiso Edificación', asunto: 'Solicitud de permiso', descripcion: 'Solicitud de permiso para ampliación de vivienda', estado: 'En Revisión', usuarioId: 2 },
                { idExpediente: 'EXP-2024-0891', solicitante: 'Constructora Alerce SpA', rut: '76.543.210-8', tipo: 'Permiso de Obras', asunto: 'Construcción edificio', descripcion: 'Proyecto de construcción de edificio de departamentos', estado: 'Urgente', usuarioId: 1 },
                { idExpediente: 'EXP-2024-0890', solicitante: 'Ana Martínez', rut: '14.567.890-2', tipo: 'Renovación de Patente', asunto: 'Renovación anual', descripcion: 'Renovación de patente comercial', estado: 'Terminado', usuarioId: 2 },
                { idExpediente: 'EXP-2024-0889', solicitante: 'Pedro González', rut: '13.456.789-0', tipo: 'Otros Trámites', asunto: 'Certificado de residencia', descripcion: 'Solicitud de certificado de residencia', estado: 'Pendiente de Firma', usuarioId: 2 },
                { idExpediente: 'EXP-2024-0888', solicitante: 'Sociedad Inmobiliaria LTDA', rut: '77.777.777-7', tipo: 'Permiso Edificación', asunto: 'Construcción 12 deptos', descripcion: 'Construcción de 12 departamentos', estado: 'Ingresado', usuarioId: 1 },
            ]);
            console.log('Datos de prueba insertados.');
        }

        return true;
    } catch (error) {
        console.error('Error al sincronizar BD:', error);
        throw error;
    }
}

module.exports = syncDatabase;