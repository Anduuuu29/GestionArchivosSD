import { describe, it, expect } from 'vitest';
import { validateName, validateEmail, validateRut, checkPasswordStrength } from '../utils/validators';

describe('validateName', () => {
  it('debería aceptar nombres con letras y acentos', () => {
    expect(validateName('María José')).toBe(true);
  });

  it('debería rechazar nombres con números', () => {
    expect(validateName('Juan123')).toBe(false);
  });

  it('debería rechazar strings vacíos', () => {
    expect(validateName('')).toBe(false);
  });
});

describe('validateEmail', () => {
  it('debería aceptar correos válidos', () => {
    expect(validateEmail('user@example.com')).toBe(true);
    expect(validateEmail('admin@santodomingo.cl')).toBe(true);
  });

  it('debería rechazar correos sin @', () => {
    expect(validateEmail('invalid')).toBe(false);
  });

  it('debería rechazar correos sin dominio', () => {
    expect(validateEmail('user@')).toBe(false);
  });
});

describe('validateRut', () => {
  it('debería aceptar RUTs válidos (12.345.678-5)', () => {
    expect(validateRut('12.345.678-5')).toBe(true);
  });

  it('debería rechazar RUTs con formato incorrecto', () => {
    expect(validateRut('12')).toBe(false);
  });

  it('debería rechazar RUT con dígito verificador incorrecto', () => {
    expect(validateRut('12.345.678-0')).toBe(false);
  });
});

describe('checkPasswordStrength', () => {
  it('debería retornar 0 para string vacío', () => {
    expect(checkPasswordStrength('')).toBe(0);
  });

  it('debería retornar 2 para contraseña débil (solo minúsculas)', () => {
    expect(checkPasswordStrength('abcdefgh')).toBe(2);
  });

  it('debería retornar 4 para contraseña fuerte', () => {
    expect(checkPasswordStrength('Pass1234')).toBe(4);
  });
});
