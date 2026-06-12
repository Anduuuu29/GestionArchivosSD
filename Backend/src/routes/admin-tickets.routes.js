const { Router } = require('express');
const router = Router();
const { Ticket, Usuario } = require('../database/models');

//GET /api/admin/tickets
//Obtiene todos los tickets (admin)

router.get('/', async (req, res) => {
    try {
        const { estado, page = 1, limit = 20 } = req.query;
        const where = {};
        if (estado) where.estado = estado;

        const { rows, count } = await Ticket.findAndCountAll({
            where,
            include: [{ model: Usuario, attributes: ['nombre', 'apellido', 'correo'] }],
            offset: (page - 1) * limit,
            limit: Number(limit),
            order: [['createdAt', 'DESC']],
        });
        res.json({ data: rows, total: count, page: Number(page), limit: Number(limit) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

//PUT /api/admin/tickets/:id
//Actualiza el estado de un ticket

router.put('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket no encontrado' });
        }
        const { estado } = req.body;
        if (!estado || !['Abierto', 'En Proceso', 'Cerrado'].includes(estado)) {
            return res.status(400).json({ message: 'Estado no válido. Use: Abierto, En Proceso o Cerrado' });
        }
        ticket.estado = estado;
        await ticket.save();
        res.json({ data: ticket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;
