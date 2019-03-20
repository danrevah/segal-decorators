import { generateFunctionDecorator } from '../../helpers/general';

export function Throttle(timeMs: number) {
  return generateFunctionDecorator('Throttle', decorator, timeMs);
}

function decorator(fn: (...args: any[]) => any, timeMs: number) {
  let timeout: NodeJS.Timeout;
  let nextCall: number;

  return function(...args: any[]) {
    const now = Date.now();

    if (!nextCall || nextCall <= timeMs) {
      nextCall = now + timeMs;

      return fn.apply(this, args);
    } else {
      const remaining = nextCall - now;
      timeout && clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), remaining);
    }
  };
}
