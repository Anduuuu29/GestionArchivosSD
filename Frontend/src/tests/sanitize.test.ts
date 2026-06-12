import { describe, it, expect } from 'vitest';
import { sanitizeText, sanitizeHtml } from '../utils/sanitize';

describe('sanitizeText', () => {
  it('debería remover etiquetas HTML', () => {
    expect(sanitizeText('<script>alert(1)</script>')).not.toContain('<script>');
  });

  it('debería mantener texto plano', () => {
    expect(sanitizeText('Hola mundo')).toBe('Hola mundo');
  });
});

describe('sanitizeHtml', () => {
  it('debería sanitizar HTML malicioso', () => {
    const result = sanitizeHtml('<img onerror="alert(1)" src=x>');
    expect(result).not.toContain('onerror');
  });

  it('debería permitir texto seguro', () => {
    expect(sanitizeHtml('<b>hola</b>')).toBe('<b>hola</b>');
  });
});
