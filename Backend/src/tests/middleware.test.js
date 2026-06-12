jest.mock('../database/connection');

process.env.JWT_SECRET = 'test-secret-key';
process.env.JWT_EXPIRES_IN = '1h';

const jwt = require('jsonwebtoken');
const { auth, adminAuth } = require('../middleware/auth');

function mockReqRes() {
  const req = { headers: {} };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  const next = jest.fn();
  return { req, res, next };
}

describe('auth middleware', () => {
  it('debería rechazar si no hay token', () => {
    const { req, res, next } = mockReqRes();
    auth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token requerido' });
  });

  it('debería rechazar si el token no es Bearer', () => {
    const { req, res, next } = mockReqRes();
    req.headers.authorization = 'Invalid token';
    auth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('debería rechazar si el token es inválido', () => {
    const { req, res, next } = mockReqRes();
    req.headers.authorization = 'Bearer invalid-token';
    auth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('debería llamar next() si el token es válido', () => {
    const token = jwt.sign({ id: 1, rol: 'user' }, process.env.JWT_SECRET);
    const { req, res, next } = mockReqRes();
    req.headers.authorization = `Bearer ${token}`;
    auth(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.usuario).toBeDefined();
    expect(req.usuario.rol).toBe('user');
  });
});

describe('adminAuth middleware', () => {
  it('debería rechazar si el usuario no es admin', () => {
    const token = jwt.sign({ id: 1, rol: 'user' }, process.env.JWT_SECRET);
    const { req, res, next } = mockReqRes();
    req.headers.authorization = `Bearer ${token}`;
    adminAuth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
  });

  it('debería llamar next() si el usuario es admin', () => {
    const token = jwt.sign({ id: 1, rol: 'admin' }, process.env.JWT_SECRET);
    const { req, res, next } = mockReqRes();
    req.headers.authorization = `Bearer ${token}`;
    adminAuth(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
