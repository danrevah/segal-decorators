import { LRU } from './lru';

describe('LRU', () => {
  it('should check isUndefined', () => {
    const lru = new LRU(3);

    lru.insert('foo', 1);
    lru.insert('bar', 2);
    lru.insert('baz', 3);

    expect(lru.toString()).toEqual('3, 2, 1');

    lru.insert('foo', 1.5);

    expect(lru.toString()).toEqual('1.5, 3, 2');

    lru.insert('foo', 1);

    expect(lru.toString()).toEqual('1, 3, 2');

    lru.insert('foo', 1);
    lru.insert('foo', 1);
    lru.insert('foo', 1);

    expect(lru.toString()).toEqual('1, 3, 2');

    lru.insert('bar', 2.5);
    lru.insert('bar', 2.5);

    expect(lru.toString()).toEqual('2.5, 1, 3');

    lru.insert('foobar', 4);

    expect(lru.toString()).toEqual('4, 2.5, 1');
  });
});
