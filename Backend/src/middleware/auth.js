const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token requerido' });
    }
    try {
        const decoded = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

const adminAuth = (req, res, next) => {
    auth(req, res, () => {
        if (req.usuario?.rol !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado: se requiere rol admin' });
        }
        next();
    });
};

module.exports = { auth, adminAuth };