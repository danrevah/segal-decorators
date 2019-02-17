import { expect } from 'chai';
import * as chai from 'chai';
import * as spies from 'chai-spies';
import 'mocha';
import { Memoize } from './memoize';

chai.use(spies);

function hash() {
  return 'hash';
}

const spyHash = chai.spy(hash);

class TestMemoize {
  counter = 0;

  @Memoize()
  count(...args: any[]) {
    return ++this.counter;
  }

  @Memoize(spyHash)
  countHash(...args: any[]) {
    return ++this.counter;
  }
}

describe('Memoize', () => {
  it('should memoize values', () => {
    const test = new TestMemoize();
    expect(test.count()).to.equal(1);
    expect(test.count()).to.equal(1);
  });

  it('should not memoize different calls', () => {
    const test = new TestMemoize();
    expect(test.count(1)).to.equal(1);
    expect(test.count(1)).to.equal(1);
    expect(test.count(2)).to.equal(2);
    expect(test.count(2)).to.equal(2);
    expect(test.count(1, 2)).to.equal(3);
  });

  it('should work call hash function', () => {
    const test = new TestMemoize();
    expect(spyHash).to.have.not.been.called();
    test.countHash();
    expect(spyHash).to.have.been.called();
  });
});
