const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Usuario = sequelize.define('Usuario', {
    nombre: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notEmpty: { msg: 'El nombre es obligatorio' }
        }
    },
    apellido: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notEmpty: { msg: 'El apellido es obligatorio' }
        }
    },
    rut: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true,
        validate: {
            notEmpty: { msg: 'El RUT es obligatorio' }
        }
    },
    correo: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true,
        validate: {
            isEmail: { msg: 'Debe ingresar un correo electrónico válido' },
            notEmpty: { msg: 'El correo electrónico es obligatorio' }
        }
    },
    region: {
        type: DataTypes.STRING,
        allowNull: true
    },
    comuna: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notEmpty: { msg: 'La contraseña es obligatoria' }
        }
    },
    rol: { 
        type: DataTypes.ENUM('admin', 'user'), 
        defaultValue: 'user',
        validate: {
            isIn: {
                args: [['admin', 'user']],
                msg: 'El rol debe ser admin o user'
            }
        }
    },
});

module.exports = Usuario;