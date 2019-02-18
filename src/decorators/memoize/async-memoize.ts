import { generateFunctionDecorator, isUndefined } from '../../helpers';

export function AsyncMemoize(hashFn?: (...args: any[]) => string) {
  return generateFunctionDecorator('AsyncMemoize', decorator, hashFn);
}

function decorator(fn: (...args: any[]) => any, hashFn?: (...args: any[]) => string) {
  const cache: { [key: string]: any } = {};

  return async function(...args: any[]) {
    const hash = hashFn ? hashFn.apply(this, args) : JSON.stringify(args);

    if (!isUndefined(cache[hash])) {
      return cache[hash];
    }

    return (cache[hash] = await fn.apply(this, args));
  };
}
