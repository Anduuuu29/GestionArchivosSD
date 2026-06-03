const { Router } = require('express');
const router = Router();
const { Documento, Usuario } = require('../database/models');

//GET /api/mis-documentos
//Obtiene los documentos del usuario logueado

router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const { rows, count } = await Documento.findAndCountAll({
            where: { usuarioId: req.usuario.id },
            offset: (page - 1) * limit,
            limit: Number(limit),
            order: [['createdAt', 'DESC']],
        });
        res.json({
            data: rows,
            total: count,
            page: Number(page),
            limit: Number(limit)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

//GET /api/mis-documentos/:id
//Obtiene un documento por ID

router.get('/:id', async (req, res) => {
    try {
        const doc = await Documento.findOne({ where: { id: req.params.id, usuarioId: req.usuario.id } }); 
        if (!doc) {
            return res.status(404).json({ message: 'Documento no encontrado' });
        }
        res.json({ data: doc });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

//POST /api/mis-documentos
//Crea un nuevo documento

router.post('/', async (req, res) => {
    try {
        const { categoria, asunto, descripcion } = req.body;
        if (!categoria || !asunto) {
            return res.status(400).json({ error: 'Categoria y asunto son obligatorios' });
        }
        const user = await Usuario.findByPk(req.usuario.id, { attributes: ['nombre', 'apellido', 'rut'] });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        const newDocumento = await Documento.create({
            idExpediente: 'EXP-' + Date.now(),
            solicitante: `${user.nombre} ${user.apellido}`,
            rut: user.rut,
            tipo: categoria,
            asunto,
            descripcion: descripcion || '',
            estado: 'Ingresado',
            usuarioId: req.usuario.id
        });
        res.status(201).json({ data: newDocumento });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;
