const { Router } = require('express');
const router = Router();
const { Ticket } = require('../database/models');

//POST /api/tickets
//Crea un nuevo ticket
router.post('/', async (req, res) => {
    const { asunto, descripcion } = req.body;
    if (!asunto || !descripcion) {
        return res.status(400).json({ error: 'Asunto y descripcion son obligatorios' });
    }

    const newTicket = await Ticket.create({
        asunto,
        descripcion: descripcion || '',
        estado: 'Abierto',
        usuarioId: 1
    });
    res.status(201).json({ data: newTicket });
});

module.exports = router;
