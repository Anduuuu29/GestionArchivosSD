const { Router } = require('express');
const router = Router();
const { Notificacion } = require('../database/models');

//GET /api/notificaciones
//Obtiene las notificaciones del usuario logueado

router.get('/', async (req, res) => {
    try {
        const notificaciones = await Notificacion.findAll({
            where: { usuarioId: req.usuario.id },
            order: [['createdAt', 'DESC']],
            limit: 50,
        });
        res.json({ data: notificaciones });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

//GET /api/notificaciones/contador
//Retorna el número de notificaciones no leídas

router.get('/contador', async (req, res) => {
    try {
        const count = await Notificacion.count({
            where: { usuarioId: req.usuario.id, leida: false },
        });
        res.json({ data: { noLeidas: count } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

//PUT /api/notificaciones/:id/leer
//Marca una notificación como leída

router.put('/:id/leer', async (req, res) => {
    try {
        const notificacion = await Notificacion.findOne({
            where: { id: req.params.id, usuarioId: req.usuario.id },
        });
        if (!notificacion) {
            return res.status(404).json({ message: 'Notificación no encontrada' });
        }
        notificacion.leida = true;
        await notificacion.save();
        res.json({ data: notificacion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

//PUT /api/notificaciones/leer-todas
//Marca todas las notificaciones del usuario como leídas

router.put('/leer-todas', async (req, res) => {
    try {
        await Notificacion.update(
            { leida: true },
            { where: { usuarioId: req.usuario.id, leida: false } }
        );
        res.json({ message: 'Todas las notificaciones marcadas como leídas' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;
