const { Router } = require('express');
const router = Router();
const { Documento, Trazabilidad, Usuario } = require('../database/models');

//GET /api/documentos
//Obtiene todos los documentos

router.get('/', (req, res) => {
    const { estado, page = 1, limit = 10 } = req.query;
    let filteredDocumentos = [...documentos];

    if (estado && estado !== 'todos') {
        filteredDocumentos = filteredDocumentos.filter(doc => doc.estado === estado);
    }
    const total = filteredDocumentos.length;
    const inicio = (page - 1) * limit;
    const items = filteredDocumentos.slice(inicio, inicio + Number(limit));
    res.json({ data: items, total, page: Number(page), limit: Number(limit) });
});

//GET /api/documentos/:id
//Obtiene un documento por ID

router.get('/:id', (req, res) => {
    const documento = documentos.find(doc => doc.id === req.params.id);
    if (!documento) {
        return res.status(404).json({ message: 'Documento no encontrado' });
    }
    res.json({ data: documento });
});

//POST /api/documentos
//Crea un nuevo documento

router.post('/', (req, res) => {
    const { categoria, asunto, descripcion } = req.body;
    if (!categoria || !asunto) {
        return res.status(400).json({ error: 'Categoria y asunto son obligatorios' });
    }

    const newDocumento = {
        id: 'EXP-' + Date.now().toString(),
        solicitante: 'USUARIO EJEMPLO',
        rut: '21.788.222-2',
        tipo: categoria,
        fecha: new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' }),
        hora: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
        estado: 'Ingresado',
        descripcion: descripcion || '',
        archivos: [],
        userId: 1
    };

    documentos.unshift(newDocumento);
    res.status(201).json({ data: newDocumento });
});

//PUT /api/documentos/:id
//Actualiza un documento

router.put('/:id', (req, res) => {
    const doc = documentos.find(doc => doc.id === req.params.id);
    if (!doc) {
        return res.status(404).json({ message: 'Documento no encontrado' });
    }
    const { tipo, descripcion, estado } = req.body;
    if (tipo) doc.tipo = tipo;
    if (descripcion) doc.descripcion = descripcion;
    if (estado) doc.estado = estado;
    res.json({ data: doc });
});

//DELETE /api/documentos/:id
//Elimina un documento

router.delete('/:id', (req, res) => {
    const docIndex = documentos.findIndex(doc => doc.id === req.params.id);
    if (docIndex === -1) {
        return res.status(404).json({ message: 'Documento no encontrado' });
    }
    documentos.splice(docIndex, 1);
    res.json({ message: 'Documento eliminado correctamente' });
});

//POST /api/documentos/:id/rechazar
//Rechaza un documento

router.post('/:id/rechazar', (req, res) => {
    const doc = documentos.find(doc => doc.id === req.params.id);
    if (!doc) {
        return res.status(404).json({ message: 'Documento no encontrado' });
    }
    const { motivo } = req.body;
    if (!motivo) {
        return res.status(400).json({ message: 'El motivo del rechazo es obligatorio' });
    }
    doc.estado = 'Rechazado';
    doc.motivoRechazo = motivo;
    res.json({ data: doc });
});

module.exports = router;


