const { Router } = require('express');
const router = Router();
const { body, validationResult } = require('express-validator');
const { Ticket } = require('../database/models');

//POST /api/tickets
//Crea un nuevo ticket

router.post('/', [
  body('asunto').trim().escape().notEmpty().withMessage('El asunto es obligatorio'),
  body('descripcion').trim().escape().notEmpty().withMessage('La descripción es obligatoria'),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg });
        }
        const { asunto, descripcion } = req.body;

        const newTicket = await Ticket.create({
            asunto,
            descripcion,
            estado: 'Abierto',
            usuarioId: req.usuario.id
        });
        res.status(201).json({ data: newTicket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

//GET /api/tickets
//Obtiene los tickets del usuario logueado

router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.findAll({
            where: { usuarioId: req.usuario.id },
            order: [['createdAt', 'DESC']]
        });
        res.json({ data: tickets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

//GET /api/tickets/:id
//Obtiene un ticket por ID

router.get('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket no encontrado' });
        }
        res.json({ data: ticket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;
