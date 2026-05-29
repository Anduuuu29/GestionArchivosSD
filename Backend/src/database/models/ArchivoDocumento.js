const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const ArchivoDocumento = sequelize.define('ArchivoDocumento', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    ruta: DataTypes.STRING,
    tamaño: DataTypes.INTEGER,
    tipoMime: DataTypes.STRING,
});

module.exports = ArchivoDocumento;