const app = require('./app');
const syncDatabase = require('./database/sync');
const PORT = process.env.PORT || 3000;

syncDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
});