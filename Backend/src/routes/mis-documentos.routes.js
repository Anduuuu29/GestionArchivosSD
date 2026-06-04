const { Router } = require('express');
const router = Router();
const { Documento, Usuario, ArchivoDocumento } = require('../database/models');
const upload = require('../middleware/upload');

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
        const documento = await Documento.findByPk(req.params.id, {
            include: [{ model: ArchivoDocumento, as: 'archivos' }]
        });
        if (!documento) {
            return res.status(404).json({ message: 'Documento no encontrado' });
        }
        res.json({ data: documento });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

//POST /api/mis-documentos
//Crea un nuevo documento

router.post('/', upload.array('archivos', 10), async (req, res) => {
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
        //res.status(201).json({ data: newDocumento });
        if (req.files && req.files.length > 0) {
            for (const archivo of req.files) {
                await ArchivoDocumento.create({
                nombre: archivo.originalname,
                ruta: archivo.path,
                tamaño: archivo.size,
                tipoMime: archivo.mimetype,
                documentoId: newDocumento.id,
                });
            }
        }

        res.status(201).json({ data: newDocumento, archivos: req.files });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// GET /api/documentos/:id/archivos
// Obtiene los archivos asociados a un documento
router.get('/:id/archivos', async (req, res) => {
    try {
        const archivos = await ArchivoDocumento.findAll({ 
            where: { documentoId: req.params.id } 
        });
        res.json({ data: archivos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// GET /api/documentos/archivo/:archivoId/descargar
// Descarga un archivo específico
router.get('/archivo/:archivoId/descargar', async (req, res) => {
    try {
        const archivo = await ArchivoDocumento.findByPk(req.params.archivoId);
        if (!archivo) {
            return res.status(404).json({ message: 'Archivo no encontrado' });
        }
        const path = require('path');
        const filePath = path.join(__dirname, '../../uploads', path.basename(archivo.ruta));
        res.download(filePath, archivo.nombre);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;
