import { generateFunctionDecorator, isUndefined } from '../../helpers/general';

export function Memoize(hashFn?: (...args: any[]) => string) {
  return generateFunctionDecorator('Memoize', decorator, hashFn);
}

function decorator(fn: (...args: any[]) => any, hashFn?: (...args: any[]) => string) {
  const cache: { [key: string]: { value: string } } = {};

  return function(...args: any[]) {
    const key = hashFn ? hashFn.apply(this, args) : JSON.stringify(args);

    if (!isUndefined(cache[key])) {
      return cache[key].value;
    }

    cache[key] = { value: fn.apply(this, args) };

    return cache[key].value;
  };
}
