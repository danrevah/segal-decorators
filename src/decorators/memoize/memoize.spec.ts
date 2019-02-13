import { expect } from 'chai';
import 'mocha';
import { Memoize } from './memoize';


class TestMemoize {
  counter = 0;

  @Memoize()
  count() {
    return ++this.counter;
  }
}

describe('Memoize', () => {
  it('should memoize values', () => {
    const test = new TestMemoize();

    expect(test.count()).to.equal(1);
    expect(test.count()).to.equal(1);
  });
});
