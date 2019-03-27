import { generateFunctionDecorator } from '../../helpers/general';

export function Debounce(timeMs: number) {
  return generateFunctionDecorator('Debounce', decorator, timeMs);
}

function decorator(fn: (...args: any[]) => any, timeMs: number) {
  let timeout: NodeJS.Timeout;

  return function(...args: any[]): void {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), timeMs);
  };
}
