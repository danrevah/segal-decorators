import { generateFunctionDecorator, isUndefined } from '../../helpers';

export function Memoize(hashFn?: (...args: any[]) => string) {
  return generateFunctionDecorator('Memoize', decorator, hashFn);
}

function decorator(fn: (...args: any[]) => any, hashFn?: (...args: any[]) => string) {
  const cache: { [key: string]: any } = {};

  return function(...args: any[]) {
    const hash = hashFn ? hashFn.apply(this, args) : JSON.stringify(args);

    if (!isUndefined(cache[hash])) {
      return cache[hash];
    }

    return cache[hash] = fn.apply(this, args);
  };
}


