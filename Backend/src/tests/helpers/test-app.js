const express = require('express');

function createApp(routeModule, ...middleware) {
  const app = express();
  app.use(express.json({ limit: '1mb' }));
  if (middleware.length > 0) app.use(...middleware);
  app.use('/', routeModule);
  return app;
}

module.exports = { createApp };
