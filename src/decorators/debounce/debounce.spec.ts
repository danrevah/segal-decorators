import { Debounce } from './debounce';

class TestDebounce {
  counter = 0;

  @Debounce(0)
  count() {
    ++this.counter;
  }
}

describe('TestDebounce', () => {
  it('should not run unless a few ms has passed', async done => {
    const test = new TestDebounce();

    test.count();
    test.count();
    expect(test.counter).toEqual(0);

    setTimeout(() => {
      expect(test.counter).toEqual(1);
      done();
    }, 0);
  });
});
