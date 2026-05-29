const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Documento = sequelize.define('Documento', {
    idExpediente: { type: DataTypes.STRING, unique: true },
    solicitante: DataTypes.STRING,
    rut: DataTypes.STRING,
    tipo: DataTypes.STRING,
    asunto: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    estado: {
        type: DataTypes.ENUM('En Revisión', 'Urgente', 'Terminado', 'Ingresado', 'Pendiente de Firma', 'Rechazado', 'Aprobado'),
        defaultValue: 'Ingresado',
    },
    motivoRechazo: DataTypes.TEXT,
});

module.exports = Documento;