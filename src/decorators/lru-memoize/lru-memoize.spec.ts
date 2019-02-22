import { LruMemoize } from './lru-memoize';

class TestLruMemoize {
  counter = 0;
  mock = jest.fn(() => 'hash');

  @LruMemoize(2)
  count(...args: any[]) {
    return ++this.counter;
  }

  @LruMemoize(2)
  async asyncCount(...args: any[]) {
    return ++this.counter;
  }

  @LruMemoize(2)
  mockCall(...args: any[]) {
    return this.mock();
  }
}

describe('LruMemoize', () => {
  it('should memoize values', () => {
    const test = new TestLruMemoize();
    expect(test.count()).toEqual(1);
    expect(test.count()).toEqual(1);
  });

  it('should not memoize different calls', () => {
    const test = new TestLruMemoize();
    expect(test.count(1)).toEqual(1);
    expect(test.count(1)).toEqual(1);
    expect(test.count(2)).toEqual(2);
    expect(test.count(2)).toEqual(2);
    expect(test.count(1, 2)).toEqual(3);
  });

  it('should really call by LRU', () => {
    const test = new TestLruMemoize();
    expect(test.mock).not.toBeCalled();
    test.mockCall(1);
    test.mockCall(2);
    test.mockCall(1);
    test.mockCall(2);
    expect(test.mock).toBeCalledTimes(2);
    test.mockCall(3);
    test.mockCall(4);
    test.mockCall(2);
    test.mockCall(1);
    expect(test.mock).toBeCalledTimes(6);
  });

  it('should work with promises', async () => {
    const test = new TestLruMemoize();
    expect(await test.asyncCount(1)).toEqual(1);
    expect(await test.asyncCount(1)).toEqual(1);
    expect(await test.asyncCount(2)).toEqual(2);
  });
});
