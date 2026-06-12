const { Trazabilidad, Notificacion } = require('../database/models');

async function registrarTrazabilidad(documentoId, usuarioId, accion, descripcion = null) {
    try {
        await Trazabilidad.create({ accion, descripcion, documentoId, usuarioId });
    } catch (error) {
        console.error('Error al registrar trazabilidad:', error.message);
    }
}

async function crearNotificacion(usuarioId, mensaje, tipo = 'info', referenciaId = null, tipoReferencia = null) {
    try {
        await Notificacion.create({ mensaje, tipo, usuarioId, referenciaId, tipoReferencia });
    } catch (error) {
        console.error('Error al crear notificación:', error.message);
    }
}

module.exports = { registrarTrazabilidad, crearNotificacion };
