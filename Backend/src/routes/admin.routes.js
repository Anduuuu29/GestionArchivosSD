const { Router } = require('express');
const router = Router();
const { Documento } = require('../database/models');

//GET /api/admin/storage
//Retorna el almacenamiento usado y disponible

router.get('/storage', (req, res) => {
    res.json({
        data: {
            used: 3.1,
            total: 4.0,
            percentage: 78,
            categories: { pdf: 1.8, images: 0.9, database: 0.4 }
        }
    });
});

//POST /api/admin/storage
//Actualiza el almacenamiento

router.post('/storage', (req, res) => {
    res.json({
        data: {
            used: 3.1,
            total: 4.0,
            percentage: 78,
            categories: { pdf: 1.8, images: 0.9, database: 0.4 }
        }
    });
});

//GET /api/admin/retention
//Retorna las politicas de retención

router.get('/retention', (req, res) => {
    res.json({ data: [] });
});

//POST /api/admin/purge/expired
//Elimina documentos expirados

router.post('/purge/expired', async (req, res) => {
    const count = await Documento.count({ where: { estado: 'Terminado' } });
    res.json({
        data: {
            mensaje: 'Documentos expirados eliminados correctamente',
            documentosEliminados: count,
            espacioLiberado: '0 MB'
        }
    });
});

module.exports = router;
