const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Trazabilidad = sequelize.define('Trazabilidad', {
    accion: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notEmpty: { msg: 'La acción de trazabilidad es obligatoria' }
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
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
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuarios',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
});

module.exports = Trazabilidad;