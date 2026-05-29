const { Router } = require('express');
const router = Router();
const { Documento, Usuario } = require('../database/models');

//GET /api/documentos
//Obtiene todos los documentos

router.get('/', async (req, res) => {
    const { estado, page = 1, limit = 10 } = req.query;
    const where = {};
    if (estado && estado !== 'todos') where.estado = estado;

    const { rows, count } = await Documento.findAndCountAll({
        where,
        include: [{ model: Usuario, attributes: ['nombre', 'correo'] }],
        offset: (page - 1) * limit,
        limit: Number(limit),
        order: [['createdAt', 'DESC']],
    });
    res.json({ data: rows, total: count, page: Number(page), limit: Number(limit) });
});

//GET /api/documentos/:id
//Obtiene un documento por ID

router.get('/:id', async (req, res) => {
    const documento = await Documento.findByPk(req.params.id);
    if (!documento) {
        return res.status(404).json({ message: 'Documento no encontrado' });
    }
    res.json({ data: documento });
});

//POST /api/documentos
//Crea un nuevo documento

router.post('/', async (req, res) => {
    const { categoria, asunto, descripcion } = req.body;
    if (!categoria || !asunto) {
        return res.status(400).json({ error: 'Categoria y asunto son obligatorios' });
    }

    const newDocumento = await Documento.create({
        idExpediente: 'EXP-' + Date.now().toString(),
        solicitante: 'USUARIO EJEMPLO',
        rut: '21.788.222-2',
        tipo: categoria,
        asunto,
        descripcion: descripcion || '',
        estado: 'Ingresado',
        usuarioId: 1
    });
    res.status(201).json({ data: newDocumento });
});

//PUT /api/documentos/:id
//Actualiza un documento

router.put('/:id', async (req, res) => {
    const doc = await Documento.findByPk(req.params.id);
    if (!doc) {
        return res.status(404).json({ message: 'Documento no encontrado' });
    }
    const { tipo, descripcion, estado } = req.body;
    if (tipo) doc.tipo = tipo;
    if (descripcion) doc.descripcion = descripcion;
    if (estado) doc.estado = estado;
    await doc.save();
    res.json({ data: doc });
});

//DELETE /api/documentos/:id
//Elimina un documento

router.delete('/:id', async (req, res) => {
    const doc = await Documento.findByPk(req.params.id);
    if (!doc) {
        return res.status(404).json({ message: 'Documento no encontrado' });
    }
    await doc.destroy();
    res.json({ message: 'Documento eliminado correctamente' });
});

//POST /api/documentos/:id/rechazar
//Rechaza un documento

router.post('/:id/rechazar', async (req, res) => {
    const doc = await Documento.findByPk(req.params.id);
    if (!doc) {
        return res.status(404).json({ message: 'Documento no encontrado' });
    }
    const { motivo } = req.body;
    if (!motivo) {
        return res.status(400).json({ message: 'El motivo del rechazo es obligatorio' });
    }
    doc.estado = 'Rechazado';
    doc.motivoRechazo = motivo;
    await doc.save();
    res.json({ data: doc });
});

module.exports = router;
