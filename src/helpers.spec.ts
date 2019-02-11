import { expect } from 'chai';
import 'mocha';
import { isObject, isUndefined } from './helpers';

describe('Helpers', () => {
  it('should check isUndefined', () => {
    let foo;
    expect(isUndefined(1)).to.be.false;
    expect(isUndefined(undefined)).to.be.true;
    expect(isUndefined(foo)).to.be.true;
  });

  it('should check isObject', () => {
    expect(isObject(null)).to.be.false;
    expect(isObject({})).to.be.true;
    expect(isObject([])).to.be.false;
    expect(isObject(42)).to.be.false;
  });
});
