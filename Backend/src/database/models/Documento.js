const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Documento = sequelize.define('Documento', {
    idExpediente: { 
        type: DataTypes.STRING, 
        unique: true,
        validate: {
            notEmpty: { msg: 'El ID de expediente no puede estar vacío' }
        }
    },
    solicitante: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rut: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    asunto: {
        type: DataTypes.STRING,
        allowNull: true
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    estado: {
        type: DataTypes.ENUM('Pendiente', 'Terminado', 'Rechazado'),
        defaultValue: 'Pendiente',
        validate: {
            isIn: {
                args: [['Pendiente', 'Terminado', 'Rechazado']],
                msg: 'Estado no válido'
            }
        }
    },
    motivoRechazo: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Usuarios',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
});

module.exports = Documento;