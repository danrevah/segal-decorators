import { Throttle } from './Throttle';

class TestThrottle {
  counter = 0;
  value = '';

  @Throttle(5)
  count() {
    ++this.counter;
  }
}

describe('TestThrottle', () => {
  it('should run on first call', async () => {
    const test = new TestThrottle();

    test.count();
    expect(test.counter).toEqual(1);
  });
});
