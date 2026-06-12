const { Router } = require('express');
const router = Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { Usuario } = require('../database/models');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

router.post('/register', [
  body('nombre').trim().escape().notEmpty().withMessage('El nombre es obligatorio'),
  body('apellido').trim().escape().notEmpty().withMessage('El apellido es obligatorio'),
  body('rut').trim().escape().notEmpty().withMessage('El RUT es obligatorio'),
  body('correo').trim().escape().isEmail().withMessage('El correo no es válido'),
  body('region').trim().escape().notEmpty().withMessage('La región es obligatoria'),
  body('comuna').trim().escape().notEmpty().withMessage('La comuna es obligatoria'),
  body('password')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(passwordRegex).withMessage('La contraseña debe contener mayúscula, minúscula y un número'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { nombre, apellido, rut, correo, password, region, comuna } = req.body;

    const existing = await Usuario.findOne({ where: { correo } });
    if (existing) {
      return res.status(409).json({ message: 'El correo ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = await Usuario.create({
      nombre, apellido, rut, correo, region, comuna,
      password: hashed,
      rol: 'user',
    });

    const token = jwt.sign(
      { id: newUser.id, rol: newUser.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    res.status(201).json({
      data: {
        token,
        usuario: { id: newUser.id, nombre, correo, rol: newUser.rol },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

router.post('/login', [
  body('correo').trim().escape().isEmail().withMessage('El correo no es válido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { correo, password } = req.body;

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
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    res.status(200).json({
      data: {
        token,
        usuario: { id: user.id, nombre: user.nombre, correo: user.correo, rol: user.rol },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;
