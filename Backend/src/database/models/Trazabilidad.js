const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Trazabilidad = sequelize.define('Trazabilidad', {
    accion: { type: DataTypes.STRING, allowNull: false },
    descripcion: DataTypes.TEXT,
});

module.exports = Trazabilidad;