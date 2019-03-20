import { generateFunctionDecorator } from '../../helpers/general';

export function AsyncRetry(retries: number, restMs: number = 100) {
  return generateFunctionDecorator('AsyncRetry', decorator, retries, restMs);
}

function decorator(fn: (...args: any[]) => any, retries: number, restMs: number) {
  return function(...args: any[]) {
    return new Promise(async (resolve, reject) => {
      return retry(this, fn, args, resolve, reject, retries, 1, restMs);
    });
  };
}

async function retry(
  ctx: any,
  fn: (...args: any[]) => any,
  args: any[],
  resolve: Function,
  reject: Function,
  maxRetries: number,
  attempt: number,
  restMs: number
): Promise<any> {
  try {
    const response = await fn.apply(ctx, args);
    return resolve(response);
  } catch (e) {
    if (maxRetries > attempt) {
      setTimeout(() => retry(ctx, fn, args, resolve, reject, maxRetries, attempt + 1, restMs), restMs);

      return;
    }

    return reject(e);
  }
}
