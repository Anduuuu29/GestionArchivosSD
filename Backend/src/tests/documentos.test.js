jest.mock('../database/connection');

process.env.JWT_SECRET = 'test-secret-key';
process.env.JWT_EXPIRES_IN = '1h';

const request = require('supertest');
const express = require('express');
const documentosRoutes = require('../routes/documentos.routes');
const sequelize = require('../database/connection');
const { Documento, Usuario } = require('../database/models');

function createDocApp(usuarioOverride) {
  const app = express();
  app.use(express.json({ limit: '1mb' }));
  app.use((req, _res, next) => {
    req.usuario = usuarioOverride || { id: 1, rol: 'admin' };
    next();
  });
  app.use('/', documentosRoutes);
  return app;
}

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await Usuario.create({
    nombre: 'Admin', apellido: 'Test', rut: '11.111.111-1',
    correo: 'admin@test.com', password: '$2a$10$dummyhash', rol: 'admin',
  });
  await Usuario.create({
    nombre: 'User', apellido: 'Test', rut: '22.222.222-2',
    correo: 'user@test.com', password: '$2a$10$dummyhash', rol: 'user',
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe('GET /', () => {
  it('debería devolver lista vacía inicialmente', async () => {
    const app = createDocApp();
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
  });

  it('debería filtrar por estado', async () => {
    const app = createDocApp();
    await Documento.create({
      idExpediente: 'EXP-001', solicitante: 'Test', rut: '11.111.111-1',
      tipo: 'Permiso', asunto: 'Test', estado: 'Pendiente', usuarioId: 1,
    });
    await Documento.create({
      idExpediente: 'EXP-002', solicitante: 'Test', rut: '11.111.111-1',
      tipo: 'Permiso', asunto: 'Test2', estado: 'Terminado', usuarioId: 1,
    });
    const res = await request(app).get('/?estado=Pendiente');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].estado).toBe('Pendiente');
  });
});

describe('GET /:id', () => {
  it('debería devolver 404 si no existe', async () => {
    const app = createDocApp();
    const res = await request(app).get('/9999');
    expect(res.status).toBe(404);
  });

  it('debería devolver el documento si existe', async () => {
    const app = createDocApp();
    const doc = await Documento.create({
      idExpediente: 'EXP-003', solicitante: 'Test', rut: '11.111.111-1',
      tipo: 'Permiso', asunto: 'Test', estado: 'Ingresado', usuarioId: 1,
    });
    const res = await request(app).get(`/${doc.id}`);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(doc.id);
  });
});

describe('PUT /:id', () => {
  it('debería actualizar estado del documento', async () => {
    const app = createDocApp();
    const doc = await Documento.create({
      idExpediente: 'EXP-004', solicitante: 'Test', rut: '11.111.111-1',
      tipo: 'Permiso', asunto: 'Actualizar test', estado: 'Ingresado', usuarioId: 1,
    });
    const res = await request(app).put(`/${doc.id}`).send({ estado: 'Terminado' });
    expect(res.status).toBe(200);
    expect(res.body.data.estado).toBe('Terminado');
  });

  it('debería sanitizar inputs (express-validator)', async () => {
    const app = createDocApp();
    const doc = await Documento.create({
      idExpediente: 'EXP-005', solicitante: 'Test', rut: '11.111.111-1',
      tipo: 'Permiso', asunto: 'XSS test', estado: 'Ingresado', usuarioId: 1,
    });
    const res = await request(app).put(`/${doc.id}`).send({ descripcion: '<script>alert(1)</script>' });
    expect(res.status).toBe(200);
    expect(res.body.data.descripcion).not.toContain('<script>');
  });
});

describe('POST /:id/rechazar', () => {
  it('debería rechazar un documento con motivo', async () => {
    const app = createDocApp();
    const doc = await Documento.create({
      idExpediente: 'EXP-006', solicitante: 'Test', rut: '11.111.111-1',
      tipo: 'Permiso', asunto: 'Rechazar test', estado: 'Ingresado', usuarioId: 2,
    });
    const res = await request(app).post(`/${doc.id}/rechazar`).send({ motivo: 'Documento incompleto' });
    expect(res.status).toBe(200);
    expect(res.body.data.estado).toBe('Rechazado');
  });

  it('debería rechazar sin motivo (express-validator)', async () => {
    const app = createDocApp();
    const doc = await Documento.create({
      idExpediente: 'EXP-007', solicitante: 'Test', rut: '11.111.111-1',
      tipo: 'Permiso', asunto: 'Rechazar sin motivo', estado: 'Ingresado', usuarioId: 2,
    });
    const res = await request(app).post(`/${doc.id}/rechazar`).send({});
    expect(res.status).toBe(400);
  });
});

describe('DELETE /:id', () => {
  it('debería eliminar un documento', async () => {
    const app = createDocApp();
    const doc = await Documento.create({
      idExpediente: 'EXP-008', solicitante: 'Test', rut: '11.111.111-1',
      tipo: 'Permiso', asunto: 'Eliminar test', estado: 'Ingresado', usuarioId: 1,
    });
    const res = await request(app).delete(`/${doc.id}`);
    expect(res.status).toBe(200);
    const check = await Documento.findByPk(doc.id);
    expect(check).toBeNull();
  });
});
