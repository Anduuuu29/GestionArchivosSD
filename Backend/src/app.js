const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento en disco
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB máximo
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|jpg|jpeg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos PDF, JPG o PNG'));
    }
  }
});
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const { auth, adminAuth } = require('./middleware/auth');

const apiRoutes = require('./routes/index');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Servir archivos estáticos de la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas
app.use('/api', apiRoutes);
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/documentos', auth, require('./routes/documentos.routes'));
app.use('/api/mis-documentos', auth, require('./routes/mis-documentos.routes'));
app.use('/api/admin', adminAuth, require('./routes/admin.routes'));
app.use('/api/tickets', auth, require('./routes/tickets.routes'));
app.use('/api/admin/tickets', adminAuth, require('./routes/admin-tickets.routes'));
app.use('/api/notificaciones', auth, require('./routes/notificaciones.routes'));
app.use('/api/documentos', auth, require('./routes/trazabilidad.routes'));
module.exports = app;