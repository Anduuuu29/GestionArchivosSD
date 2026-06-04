const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Ticket = sequelize.define('Ticket', {
    asunto: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notEmpty: { msg: 'El asunto es obligatorio' }
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    estado: { 
        type: DataTypes.ENUM('Abierto', 'En Proceso', 'Cerrado'), 
        defaultValue: 'Abierto',
        validate: {
            isIn: {
                args: [['Abierto', 'En Proceso', 'Cerrado']],
                msg: 'Estado del ticket no válido'
            }
        }
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

module.exports = Ticket;