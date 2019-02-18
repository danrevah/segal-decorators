import { isObject, isUndefined } from './helpers';

describe('Helpers', () => {
  it('should check isUndefined', () => {
    let foo;
    expect(isUndefined(1)).toBe(false);
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(foo)).toBe(true);
  });

  it('should check isObject', () => {
    expect(isObject(null)).toBe(false);
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(false);
    expect(isObject(42)).toBe(false);
  });
});
