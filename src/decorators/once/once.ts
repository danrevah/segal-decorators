import { generateFunctionDecorator } from '../../helpers/general';

export function Once() {
  return generateFunctionDecorator('Once', decorator);
}

function decorator(fn: (...args: any[]) => any) {
  let called = false;
  let returnValue: unknown;

  return function(...args: any[]) {
    if (called) {
      return returnValue;
    }

    called = true;

    return (returnValue = fn.apply(this, args));
  };
}
