const { Router } = require('express');
const router = Router();
const { documentos } = require('../data/db');

const USER_ID = 2;

//GET /api/mis-documentos
//Obtiene los documentos del usuario logueado

router.get('/', (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const filteredDocuments = documentos.filter(doc => doc.userId === USER_ID);
    const total = filteredDocuments.length;
    const inicio = (page - 1) * limit;
    const item = filteredDocuments.slice(inicio, inicio + Number(limit));
    res.json({
        data: item,
        total,
        page: Number(page),
        limit: Number(limit)
    });
});

//GET /api/mis-documentos/:id
//Obtiene un documento por ID

router.get('/:id', (req, res) => {
    const doc = documentos.find(doc => doc.id === req.params.id && doc.userId === USER_ID);
    if (!doc) {
        return res.status(404).json({ message: 'Documento no encontrado' });
    }
    res.json({ data: doc });
});

//POST /api/mis-documentos
//Crea un nuevo documento

router.post('/', (req, res) => {
    const { categoria, asunto, descripcion } = req.body;
    if (!categoria || !asunto) {
        return res.status(400).json({ error: 'Categoria y asunto son obligatorios' });
    }

    const newDocumento = {
        id: 'EXP-' + Date.now(),
        solicitante: 'USUARIO EJEMPLO',
        rut: '21.788.222-2',
        tipo: categoria,
        fecha: new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' }),
        hora: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
        estado: 'Ingresado',
        descripcion: descripcion || '',
        archivos: [],
        userId: USER_ID
    };

    documentos.unshift(newDocumento);
    res.status(201).json({ data: newDocumento });
});

module.exports = router;
