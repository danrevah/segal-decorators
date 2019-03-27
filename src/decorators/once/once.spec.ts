import { Once } from './once';

class TestOnce {
  counter = 0;

  @Once()
  count(...args: any[]) {
    return ++this.counter;
  }
}

describe('Memoize', () => {
  it('should be called only once', () => {
    const test = new TestOnce();
    expect(test.count()).toEqual(1);
    expect(test.count()).toEqual(1);
  });

  it('should be called once even with different arguments', () => {
    const test = new TestOnce();
    expect(test.count(1)).toEqual(1);
    expect(test.count(1)).toEqual(1);
    expect(test.count(2)).toEqual(1);
    expect(test.count(1, 2)).toEqual(1);
    expect(test.count(2)).toEqual(1);
  });
});
