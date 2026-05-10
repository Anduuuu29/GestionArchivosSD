// src/utils/validators.ts

export const validateName = (name: string): boolean => {
  // Sólo letras (incluyendo acentos) y espacios.
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  return regex.test(name);
};

export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateRut = (rut: string): boolean => {
  // Limpia el RUT de puntos y guiones
  const cleanRut = rut.replace(/[^0-9kK]/g, '').toUpperCase();
  if (cleanRut.length < 8) return false;

  const rutBody = cleanRut.slice(0, -1);
  const rutDv = cleanRut.slice(-1);

  let sum = 0;
  let multiplier = 2;

  for (let i = rutBody.length - 1; i >= 0; i--) {
    sum += parseInt(rutBody.charAt(i), 10) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const expectedDv = 11 - (sum % 11);
  const dv = expectedDv === 11 ? '0' : expectedDv === 10 ? 'K' : expectedDv.toString();

  return dv === rutDv;
};

// Retorna si la contraseña es fuerte (4), moderada (3), débil (2) o muy débil (1)
export const checkPasswordStrength = (password: string): number => {
  if (!password) return 0;
  
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) score += 1;

  return score;
};
