const { Router } = require('express');
const router = Router();
const { body, validationResult } = require('express-validator');
const { Documento, Usuario, ArchivoDocumento } = require('../database/models');
const upload = require('../middleware/upload');
const { registrarTrazabilidad, crearNotificacion } = require('../services/notificaciones.service');

//GET /api/documentos
//Obtiene todos los documentos

router.get('/', async (req, res) => {
    try {
        const { estado, page = 1, limit = 10 } = req.query;
        const where = {};
        if (estado && estado !== 'todos') where.estado = estado;

        const { rows, count } = await Documento.findAndCountAll({
            where,
            include: [{ model: Usuario, attributes: ['nombre', 'correo'] }],
            offset: (page - 1) * limit,
            limit: Number(limit),
            order: [['id', 'DESC']],
        });
        res.json({ data: rows, total: count, page: Number(page), limit: Number(limit) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

//GET /api/documentos/:id
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

//POST /api/documentos
//Crea un nuevo documento

router.post('/', [
  upload.array('archivos', 10),
  body('categoria').trim().escape().notEmpty().withMessage('La categoría es obligatoria'),
  body('asunto').trim().escape().notEmpty().withMessage('El asunto es obligatorio'),
  body('descripcion').optional().trim().escape(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg });
        }
        const { categoria, asunto, descripcion } = req.body;
        const user = await Usuario.findByPk(req.usuario.id, { attributes: ['nombre', 'apellido', 'rut'] });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        const newDocumento = await Documento.create({
            idExpediente: 'EXP-' + Date.now().toString(),
            solicitante: `${user.nombre} ${user.apellido}`,
            rut: user.rut,
            tipo: categoria,
            asunto,
            descripcion: descripcion || '',
            estado: 'Ingresado',
            usuarioId: req.usuario.id
        });
        //res.status(201).json({ data: newDocumento });

        // Crear registros en ArchivoDocumento
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

        // Registrar trazabilidad
        await registrarTrazabilidad(newDocumento.id, req.usuario.id, 'Documento creado', `Documento "${asunto}" creado con estado ${newDocumento.estado}`);

        // Notificar al admin si el creador es un usuario normal
        if (user.rol === 'user') {
            const admins = await Usuario.findAll({ where: { rol: 'admin' }, attributes: ['id'] });
            for (const admin of admins) {
                await crearNotificacion(admin.id, `Nuevo documento de ${user.nombre} ${user.apellido}: "${asunto}"`, 'info', newDocumento.id, 'documento');
            }
        }

        res.status(201).json({ data: newDocumento, archivos: req.files });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

//PUT /api/documentos/:id
//Actualiza un documento

router.put('/:id', [
  body('tipo').optional().trim().escape(),
  body('descripcion').optional().trim().escape(),
  body('estado').optional().trim().escape(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }
        const doc = await Documento.findByPk(req.params.id);
        if (!doc) {
            return res.status(404).json({ message: 'Documento no encontrado' });
        }
        const { tipo, descripcion, estado } = req.body;
        const cambios = [];
        if (tipo) { doc.tipo = tipo; cambios.push(`tipo: "${tipo}"`); }
        if (descripcion) { doc.descripcion = descripcion; cambios.push('descripción actualizada'); }
        if (estado && estado !== doc.estado) {
            const estadoAnterior = doc.estado;
            doc.estado = estado;
            cambios.push(`estado: "${estadoAnterior}" → "${estado}"`);

            // Notificar al usuario propietario del documento
            const documento = await Documento.findByPk(req.params.id);
            if (documento && documento.usuarioId !== req.usuario.id) {
                await crearNotificacion(
                    documento.usuarioId,
                    `Tu documento "${doc.asunto}" cambió de estado: ${estadoAnterior} → ${estado}`,
                    'exito',
                    doc.id,
                    'documento'
                );
            }
        }
        await doc.save();

        if (cambios.length > 0) {
            await registrarTrazabilidad(doc.id, req.usuario.id, 'Documento actualizado', cambios.join(', '));
        }

        res.json({ data: doc });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

//DELETE /api/documentos/:id
//Elimina un documento

router.delete('/:id', async (req, res) => {
    try {
        const doc = await Documento.findByPk(req.params.id);
        if (!doc) {
            return res.status(404).json({ message: 'Documento no encontrado' });
        }
        await doc.destroy();
        res.json({ message: 'Documento eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

//POST /api/documentos/:id/rechazar
//Rechaza un documento

router.post('/:id/rechazar', [
  body('motivo').trim().escape().notEmpty().withMessage('El motivo del rechazo es obligatorio'),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }
        const doc = await Documento.findByPk(req.params.id);
        if (!doc) {
            return res.status(404).json({ message: 'Documento no encontrado' });
        }
        const { motivo } = req.body;
        doc.estado = 'Rechazado';
        doc.motivoRechazo = motivo;
        await doc.save();

        // Registrar trazabilidad
        await registrarTrazabilidad(doc.id, req.usuario.id, 'Documento rechazado', `Motivo: ${motivo}`);

        // Notificar al usuario propietario
        if (doc.usuarioId !== req.usuario.id) {
            await crearNotificacion(doc.usuarioId, `Tu documento "${doc.asunto}" fue rechazado. Motivo: ${motivo}`, 'error', doc.id, 'documento');
        }

        res.json({ data: doc });
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
