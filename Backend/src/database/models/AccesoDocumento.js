const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const AccesoDocumento = sequelize.define('AccesoDocumento', {
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuarios',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    documentoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Documentos',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    estado: {
        type: DataTypes.ENUM('Pendiente', 'Aprobado', 'Rechazado'),
        defaultValue: 'Pendiente',
        validate: {
            isIn: {
                args: [['Pendiente', 'Aprobado', 'Rechazado']],
                msg: 'Estado de acceso no válido'
            }
        }
    },
});

module.exports = AccesoDocumento;
