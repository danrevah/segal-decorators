import { TimedMemoize } from './timed-memoize';

class TestTimedMemoize {
  counter = 0;

  @TimedMemoize(2000)
  count(...args: any[]) {
    return ++this.counter;
  }
}

describe('TimedMemoize', () => {
  it('should really invalidate cache', () => {
    const past = Date.now() + 50000;
    const test = new TestTimedMemoize();
    expect(test.count(1)).toEqual(1);

    jest.spyOn(Date, 'now').mockImplementation(() => past);

    expect(test.count(1)).toEqual(2);
  });
});
