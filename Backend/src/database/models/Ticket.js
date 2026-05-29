const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Ticket = sequelize.define('Ticket', {
    asunto: { type: DataTypes.STRING, allowNull: false },
    descripcion: DataTypes.TEXT,
    estado: { type: DataTypes.ENUM('Abierto', 'En Proceso', 'Cerrado'), defaultValue: 'Abierto' },
});

module.exports = Ticket;