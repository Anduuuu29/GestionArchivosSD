const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Notificacion = sequelize.define('Notificacion', {
    mensaje: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'El mensaje de la notificación es obligatorio' }
        }
    },
    tipo: {
        type: DataTypes.ENUM('info', 'exito', 'advertencia', 'error'),
        defaultValue: 'info',
    },
    leida: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    referenciaId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    tipoReferencia: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuarios',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
});

module.exports = Notificacion;
