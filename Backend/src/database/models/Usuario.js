const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Usuario = sequelize.define('Usuario', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false },
    rut: { type: DataTypes.STRING, allowNull: false, unique: true },
    correo: { type: DataTypes.STRING, allowNull: false, unique: true },
    region: DataTypes.STRING,
    comuna: DataTypes.STRING,
    password: { type: DataTypes.STRING, allowNull: false },
    rol: { type: DataTypes.ENUM('admin', 'user'), defaultValue: 'user' },
});

module.exports = Usuario;