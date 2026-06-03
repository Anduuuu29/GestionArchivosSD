const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const AccesoDocumento = sequelize.define('AccesoDocumento', {
    estado: {
        type: DataTypes.ENUM('Pendiente', 'Aprobado', 'Rechazado'),
        defaultValue: 'Pendiente',
    },
});

module.exports = AccesoDocumento;
