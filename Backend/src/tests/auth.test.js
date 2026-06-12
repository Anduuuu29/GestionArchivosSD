jest.mock('../database/connection');

process.env.JWT_SECRET = 'test-secret-key';
process.env.JWT_EXPIRES_IN = '1h';

const request = require('supertest');
const { createApp } = require('./helpers/test-app');
const authRoutes = require('../routes/auth.routes');
const sequelize = require('../database/connection');
const { Usuario } = require('../database/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterEach(async () => {
  await Usuario.destroy({ where: {}, truncate: true });
});

afterAll(async () => {
  await sequelize.close();
});

const app = createApp(authRoutes);

describe('POST /register', () => {
  const validUser = {
    nombre: 'Test',
    apellido: 'User',
    rut: '11.111.111-1',
    correo: 'test@test.com',
    password: 'TestPass1',
    region: 'Región Metropolitana',
    comuna: 'Santiago',
  };

  it('debería registrar un usuario con datos válidos', async () => {
    const res = await request(app).post('/register').send(validUser);
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('token');
    expect(res.body.data.usuario.correo).toBe(validUser.correo);
  });

  it('debería rechazar registro con contraseña débil', async () => {
    const res = await request(app).post('/register').send({ ...validUser, password: 'abc' });
    expect(res.status).toBe(400);
  });

  it('debería rechazar registro con correo inválido', async () => {
    const res = await request(app).post('/register').send({ ...validUser, correo: 'invalido' });
    expect(res.status).toBe(400);
  });

  it('debería rechazar registro sin campos obligatorios', async () => {
    const res = await request(app).post('/register').send({});
    expect(res.status).toBe(400);
  });

  it('debería rechazar registro duplicado', async () => {
    await request(app).post('/register').send(validUser);
    const res = await request(app).post('/register').send(validUser);
    expect(res.status).toBe(409);
  });
});

describe('POST /login', () => {
  const validUser = {
    nombre: 'Test',
    apellido: 'User',
    rut: '22.222.222-2',
    correo: 'login@test.com',
    password: 'Pass1234',
    region: 'RM',
    comuna: 'Santiago',
  };

  beforeEach(async () => {
    await request(app).post('/register').send(validUser);
  });

  it('debería iniciar sesión con credenciales correctas', async () => {
    const res = await request(app).post('/login').send({ correo: validUser.correo, password: validUser.password });
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('token');
  });

  it('debería rechazar login con contraseña incorrecta', async () => {
    const res = await request(app).post('/login').send({ correo: validUser.correo, password: 'WrongPass1' });
    expect(res.status).toBe(401);
  });

  it('debería rechazar login con correo inexistente', async () => {
    const res = await request(app).post('/login').send({ correo: 'noexiste@test.com', password: 'Pass1234' });
    expect(res.status).toBe(401);
  });

  it('debería rechazar login con correo inválido (express-validator)', async () => {
    const res = await request(app).post('/login').send({ correo: 'no-email', password: 'Pass1234' });
    expect(res.status).toBe(400);
  });
});
