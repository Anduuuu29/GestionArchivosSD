require('dotenv').config();

if (!process.env.JWT_SECRET) {
  console.error('FATAL: JWT_SECRET no está definido en las variables de entorno');
  process.exit(1);
}

const app = require('./app');
const syncDatabase = require('./database/sync');
const PORT = process.env.PORT || 3000;

syncDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
