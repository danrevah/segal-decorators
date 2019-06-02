import { Bind } from './bind';

class TestCallback {
  counter = 0;

  @Bind
  count() {
    return ++this.counter;
  }
}

function callbackCaller(fn: Function) {
  return fn();
}

describe('Bind', () => {
  it('should have the right context', () => {
    const test = new TestCallback();

    callbackCaller(test.count);
    callbackCaller(test.count);

    expect(test.counter).toEqual(2);
  });
});
