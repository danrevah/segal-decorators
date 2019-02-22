import { generateFunctionDecorator, isUndefined } from '../../helpers/general';
import { LRU } from '../../helpers/lru';

export function LruMemoize(maxStorage: number, hashFn?: (...args: any[]) => string) {
  return generateFunctionDecorator('LruMemoize', decorator, maxStorage, hashFn);
}

function decorator<T>(fn: (...args: any[]) => any, maxStorage: number, hashFn?: (...args: any[]) => string) {
  const cache = new LRU(maxStorage);

  return function(...args: any[]) {
    const key = hashFn ? hashFn.apply(this, args) : JSON.stringify(args);
    const value: T = cache.get(key) as T;

    if (!isUndefined(value)) {
      return value;
    }

    const response = fn.apply(this, args);

    cache.insert(key, response);


    return response;
  };
}
