const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');
const { auth, adminAuth } = require('./middleware/auth');

const apiRoutes = require('./routes/index');

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization'] }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Demasiadas solicitudes, intente de nuevo en 15 minutos' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Demasiados intentos de inicio de sesión, intente de nuevo en 15 minutos' },
});

app.use(helmet());
// Removed duplicate cors call
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.use('/api', limiter);

app.use('/api/auth', authLimiter, require('./routes/auth.routes'));
app.use('/api', apiRoutes);
app.use('/api/documentos', auth, require('./routes/documentos.routes'));
app.use('/api/mis-documentos', auth, require('./routes/mis-documentos.routes'));
app.use('/api/admin', adminAuth, require('./routes/admin.routes'));
app.use('/api/tickets', auth, require('./routes/tickets.routes'));
app.use('/api/admin/tickets', adminAuth, require('./routes/admin-tickets.routes'));
app.use('/api/notificaciones', auth, require('./routes/notificaciones.routes'));
app.use('/api/documentos', auth, require('./routes/trazabilidad.routes'));

module.exports = app;
