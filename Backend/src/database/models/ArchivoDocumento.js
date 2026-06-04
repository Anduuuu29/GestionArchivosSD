const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const ArchivoDocumento = sequelize.define('ArchivoDocumento', {
    nombre: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notEmpty: { msg: 'El nombre del archivo es obligatorio' }
        }
    },
    ruta: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tamaño: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    tipoMime: {
        type: DataTypes.STRING,
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
    }
});

module.exports = ArchivoDocumento;