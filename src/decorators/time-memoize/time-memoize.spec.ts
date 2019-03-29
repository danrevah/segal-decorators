import { TimeMemoize } from './time-memoize';

class TestTimeMemoize {
  counter = 0;

  @TimeMemoize(2000)
  count(...args: any[]) {
    return ++this.counter;
  }
}

describe('TimeMemoize', () => {
  it('should really invalidate cache', () => {
    const past = Date.now() + 50000;
    const test = new TestTimeMemoize();
    expect(test.count(1)).toEqual(1);

    jest.spyOn(Date, 'now').mockImplementation(() => past);

    expect(test.count(1)).toEqual(2);
  });
});
