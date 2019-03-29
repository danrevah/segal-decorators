import { generateFunctionDecorator, isUndefined } from '../../helpers/general';

export function TimeMemoize(timeoutMs: number, hashFn?: (...args: any[]) => string) {
  return generateFunctionDecorator('TimeMemoize', decorator, timeoutMs, hashFn);
}

function decorator<T>(fn: (...args: any[]) => any, timeoutMs: number, hashFn?: (...args: any[]) => string) {
  const cache: { [key: string]: { value: string; timeoutTimestamp: number } } = {};

  return function(...args: any[]) {
    const now = Date.now();
    const key = hashFn ? hashFn.apply(this, args) : JSON.stringify(args);

    if (!isUndefined(cache[key]) && cache[key].timeoutTimestamp > now) {
      return cache[key].value;
    }

    cache[key] = {
      value: fn.apply(this, args),
      timeoutTimestamp: now + timeoutMs,
    };

    setTimeout(() => delete cache[key], timeoutMs);

    return cache[key].value;
  };
}
