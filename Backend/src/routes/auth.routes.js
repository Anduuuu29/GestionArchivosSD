const { Router } = require('express');
const router = Router();
const { Usuario } = require('../database/models');

//POST /api/auth/register
//Registra un nuevo usuario
router.post('/register', async (req, res) => {
    const { nombre, apellido, rut, correo, password, region, comuna } = req.body;
    if (!nombre || !apellido || !rut || !correo || !password || !region || !comuna) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    const user = await Usuario.findOne({ where: { correo } });
    if (user) {
        return res.status(400).json({ message: 'El correo ya está registrado' });
    }
    const newUser = await Usuario.create({
        nombre, apellido, rut, correo, region, comuna, password,
        rol: 'user'
    });
    res.status(201).json({
        data: { id: newUser.id, nombre, correo, rol: newUser.rol }
    });

});

//POST /api/auth/login
//Inicia sesión

router.post('/login', async (req, res) => {
    const { correo, password } = req.body;
    if (!correo || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    const user = await Usuario.findOne({ where: { correo, password } });
    if (!user) {
        return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }
    res.status(200).json({
        data: { id: user.id, nombre: user.nombre, correo: user.correo, rol: user.rol }
    });
});

module.exports = router;
