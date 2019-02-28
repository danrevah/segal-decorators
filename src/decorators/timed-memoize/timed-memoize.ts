import { generateFunctionDecorator, isUndefined } from '../../helpers/general';

interface ITimedMemoizeProps {
  hashFn?: (...args: any[]) => string,
  invalidateOnTimeout?: boolean
}

export function TimedMemoize(timeoutMs: number, props: ITimedMemoizeProps = {}) {
  return generateFunctionDecorator('TimedMemoize', decorator, timeoutMs, props);
}

function decorator<T>(fn: (...args: any[]) => any, timeoutMs: number, { hashFn, invalidateOnTimeout }: ITimedMemoizeProps) {
  const cache: { [key: string]: { value: string, timeoutTimestamp: number } } = {};

  return function(...args: any[]) {
    const now = Date.now();
    const key = hashFn ? hashFn.apply(this, args) : JSON.stringify(args);

    if (!isUndefined(cache[key]) && cache[key].timeoutTimestamp > now) {
      return cache[key].value;
    }

    cache[key] = {
      value: fn.apply(this, args),
      timeoutTimestamp: now + timeoutMs
    };

    if (invalidateOnTimeout) {
      setTimeout(() => delete cache[key], timeoutMs);
    }

    return cache[key].value;
  };
}
