// Middleware placeholder que solo asigna rol según ruta
// Se reemplazará cuando implementemos JWT en EP 2.5
module.exports = (req, res, next) => {
    // Por ahora, simulamos autenticación leyendo header X-User-Role
    req.user = { role: req.headers['x-user-role'] || 'user', id: 1 };
    next();
};