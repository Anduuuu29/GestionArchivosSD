const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.json({
        mensaje: 'API de Gestión de Archivos SD funcionando',
        version: '1.0.0',
    });
});

module.exports = router;