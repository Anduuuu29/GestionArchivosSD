const Usuario = require('./Usuario');
const Documento = require('./Documento');
const ArchivoDocumento = require('./ArchivoDocumento');
const Ticket = require('./Ticket');
const Trazabilidad = require('./Trazabilidad');
const AccesoDocumento = require('./AccesoDocumento');

// Relaciones
Usuario.hasMany(Documento, { foreignKey: 'usuarioId' });
Documento.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Usuario.hasMany(Ticket, { foreignKey: 'usuarioId' });
Ticket.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Documento.hasMany(ArchivoDocumento, { foreignKey: 'documentoId', onDelete: 'CASCADE' });
ArchivoDocumento.belongsTo(Documento, { foreignKey: 'documentoId' });

Documento.hasMany(Trazabilidad, { foreignKey: 'documentoId', onDelete: 'CASCADE' });
Trazabilidad.belongsTo(Documento, { foreignKey: 'documentoId' });

Usuario.hasMany(Trazabilidad, { foreignKey: 'usuarioId' });
Trazabilidad.belongsTo(Usuario, { foreignKey: 'usuarioId' });

// Acceso compartido a documentos (tabla intermedia)
Usuario.belongsToMany(Documento, { through: AccesoDocumento, as: 'documentosCompartidos', foreignKey: 'usuarioId' });
Documento.belongsToMany(Usuario, { through: AccesoDocumento, as: 'usuariosConAcceso', foreignKey: 'documentoId' });

module.exports = { Usuario, Documento, ArchivoDocumento, Ticket, Trazabilidad, AccesoDocumento };