import { describe, it, expect, vi } from 'vitest';
import { getNormalizedLang } from './languages';

vi.mock('../constants', () => ({
  ALLOWED_LANGUAGES: ['ua', 'en'],
  DEFAULT_LANGUAGE: 'en',
}));

describe('getNormalizedLang', () => {
  it('should normalize "uk" to "ua"', () => {
    expect(getNormalizedLang('uk')).toBe('ua');
  });

  it('should return the same language if it is allowed', () => {
    expect(getNormalizedLang('en')).toBe('en');
    expect(getNormalizedLang('ua')).toBe('ua');
  });

  it('should return DEFAULT_LANGUAGE for unsupported language', () => {
    expect(getNormalizedLang('fr')).toBe('en');
    expect(getNormalizedLang('de')).toBe('en');
  });

  it('should return DEFAULT_LANGUAGE if lang is undefined', () => {
    expect(getNormalizedLang(undefined)).toBe('en');
  });

  it('should return DEFAULT_LANGUAGE if lang is null', () => {
    expect(getNormalizedLang(null)).toBe('en');
  });
});
