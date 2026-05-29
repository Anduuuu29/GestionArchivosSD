const { Router } = require('express');
const router = Router();
const { Ticket, Usuario, Trazabilidad } = require('../database/models');

//POST /api/tickets
//Crea un nuevo ticket
router.post('/', (req, res) => {
    const { asunto, descripcion } = req.body;
    if (!asunto || !descripcion) {
        return res.status(400).json({ error: 'Asunto y descripcion son obligatorios' });
    }

    const newTicket = {
        id: 'T-' + Date.now().toString(),
        solicitante: 'USUARIO EJEMPLO',
        rut: '21.788.222-2',
        asunto,
        fecha: new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' }),
        hora: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
        estado: 'Ingresado',
        descripcion: descripcion || '',
        archivos: [],
        userId: 1
    };

    tickets.unshift(newTicket);
    res.status(201).json({ data: newTicket });
});

module.exports = router;

