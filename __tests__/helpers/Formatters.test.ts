import { onlyNumbersAllowed } from '../../src/helpers/Formatters';

describe('returns only numbers', () => {
  it('input is numbers', () => {
    expect(onlyNumbersAllowed('123')).toBe('123');
  });

  it('input is letters', () => {
    expect(onlyNumbersAllowed('coffee')).toBe('');
  });

  it('input is decimal number', () => {
    expect(onlyNumbersAllowed('10.50')).toBe('10.50');
  });

  it('input is 0', () => {
    expect(onlyNumbersAllowed('0')).toBe('0');
  });

  it('input is special characters', () => {
    expect(onlyNumbersAllowed('!@#$%^<>,~()')).toBe('');
  });
});
