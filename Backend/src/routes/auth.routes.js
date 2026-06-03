const { Router } = require('express');
const router = Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../database/models');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/register', async (req, res) => {
    try {
        const { nombre, apellido, rut, correo, password, region, comuna } = req.body;
        
        if (!nombre || !apellido || !rut || !correo || !password || !region || !comuna) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        if (!emailRegex.test(correo)) {
            return res.status(400).json({ message: 'El correo electrónico no es válido' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
        }

        const existing = await Usuario.findOne({ where: { correo } });
        if (existing) {
            return res.status(409).json({ message: 'El correo ya está registrado' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        
        const newUser = await Usuario.create({
            nombre, apellido, rut, correo, region, comuna,
            password: hashed,
            rol: 'user'
        });

        const token = jwt.sign(
            { id: newUser.id, rol: newUser.rol },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
        );

        res.status(201).json({
            data: {
                token,
                usuario: { id: newUser.id, nombre, correo, rol: newUser.rol }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { correo, password } = req.body;
        
        if (!correo || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const user = await Usuario.findOne({ where: { correo } });
        if (!user) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }

        const token = jwt.sign(
            { id: user.id, rol: user.rol },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
        );

        res.status(200).json({
            data: {
                token,
                usuario: { id: user.id, nombre: user.nombre, correo: user.correo, rol: user.rol }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;