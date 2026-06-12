import DOMPurify from 'dompurify';

export const sanitizeText = (input: string): string =>
  DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });

export const sanitizeHtml = (input: string): string =>
  DOMPurify.sanitize(input);
