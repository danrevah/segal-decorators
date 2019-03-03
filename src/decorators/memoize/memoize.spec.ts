import { Memoize } from './memoize';

const mock = jest.fn(() => 'hash');

class TestMemoize {
  counter = 0;

  @Memoize()
  count(...args: any[]) {
    return ++this.counter;
  }

  @Memoize()
  async asyncCount(...args: any[]) {
    return ++this.counter;
  }

  @Memoize(mock)
  countHash(...args: any[]) {
    return ++this.counter;
  }
}

describe('Lru', () => {
  it('should memoize values', () => {
    const test = new TestMemoize();
    expect(test.count()).toEqual(1);
    expect(test.count()).toEqual(1);
  });

  it('should not memoize different calls', () => {
    const test = new TestMemoize();
    expect(test.count(1)).toEqual(1);
    expect(test.count(1)).toEqual(1);
    expect(test.count(2)).toEqual(2);
    expect(test.count(1, 2)).toEqual(3);
    expect(test.count(2)).toEqual(2);
  });

  it('should work call hash function', () => {
    const test = new TestMemoize();
    expect(mock).not.toBeCalled();
    test.countHash();
    expect(mock).toBeCalled();
  });

  it('should work with promises', async () => {
    const test = new TestMemoize();
    expect(await test.asyncCount(1)).toEqual(1);
    expect(await test.asyncCount(1)).toEqual(1);
    expect(await test.asyncCount(2)).toEqual(2);
  });
});
