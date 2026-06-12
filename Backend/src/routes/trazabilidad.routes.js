const { Router } = require('express');
const router = Router();
const { Trazabilidad, Usuario } = require('../database/models');

//GET /api/documentos/:id/trazabilidad
//Obtiene el historial de cambios de un documento

router.get('/:id/trazabilidad', async (req, res) => {
    try {
        const registros = await Trazabilidad.findAll({
            where: { documentoId: req.params.id },
            include: [{ model: Usuario, attributes: ['nombre', 'apellido'] }],
            order: [['createdAt', 'ASC']],
        });
        res.json({ data: registros });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;
