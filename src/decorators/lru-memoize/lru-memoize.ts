import { generateFunctionDecorator, isUndefined } from '../../helpers/general';

export function LruMemoize(maxStorage: number, hashFn?: (...args: any[]) => string) {
  return generateFunctionDecorator('LruMemoize', decorator);
}

function decorator(fn: (...args: any[]) => any, maxStorage: number, hashFn?: (...args: any[]) => string) {
  const cache: { [key: string]: any } = {};

  return function(...args: any[]) {
    const hash = hashFn ? hashFn.apply(this, args) : JSON.stringify(args);

    if (!isUndefined(cache[hash])) {
      return cache[hash];
    }

    return (cache[hash] = fn.apply(this, args));
  };
}
