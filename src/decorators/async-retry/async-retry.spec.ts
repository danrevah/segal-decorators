import { AsyncRetry } from './async-retry';

class TestAsyncRetry {
  counter = 0;

  @AsyncRetry(2, 0)
  async fail() {
    ++this.counter;
    throw new Error();
  }

  @AsyncRetry(2, 0)
  async success() {
    return ++this.counter;
  }

  @AsyncRetry(2, 0)
  async successOnTwo() {
    ++this.counter;
    if (this.counter === 1) throw new Error();
    return this.counter;
  }
}

describe('AsyncRetry', () => {
  it('should return reject promise with increased counter', async () => {
    const test = new TestAsyncRetry();

    try {
      await test.fail();
    } catch (e) {
      expect(test.counter).toEqual(2);
    }
  });

  it('should return resolve promise on first attempt', async () => {
    const test = new TestAsyncRetry();
    expect(test.success()).resolves.toBe(1);
  });

  it('should return resolve promise on second attempt', async () => {
    const test = new TestAsyncRetry();
    expect(test.successOnTwo()).resolves.toBe(2);
  });
});
