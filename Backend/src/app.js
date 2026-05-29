const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const syncDatabase = require('./database/sync');

const apiRoutes = require('./routes/index');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api', apiRoutes);
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/documentos', require('./routes/documentos.routes'));
app.use('/api/mis-documentos', require('./routes/mis-documentos.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/tickets', require('./routes/tickets.routes'));
syncDatabase();
module.exports = app;