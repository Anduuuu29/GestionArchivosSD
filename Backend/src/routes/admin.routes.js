const { Router } = require('express');
const router = Router();
const { storage, retentionPolicies, documentos } = require('../data/db');

//GET /api/admin/storage
//Retorna el almacenamiento usado y disponible

router.get('/storage', (req, res) => {
    res.json({ data: storage })
});

//POST /api/admin/storage
//Actualiza el almacenamiento

router.post('/storage', (req, res) => {
    res.json({ data: storage });
});

//GET /api/admin/retention
//Retorna las politicas de retención

router.get('/retention', (req, res) => {
    res.json({ data: retentionPolicies });
});

//POST /api/admin/purge/expired
//Elimina documentos expirados

router.post('/purge/expired', (req, res) => {
    const before = documentos.length;
    res.json({
        data: {
            mensaje: 'Documentos expirados eliminados correctamente',
            documentosEliminados: 0,
            espacioLiberado: '0 MB'
        }
    })
});

module.exports = router;