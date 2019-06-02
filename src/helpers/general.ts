export function isObject(val: unknown) {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
}

export function isUndefined(val: unknown) {
  return typeof val === 'undefined';
}

export function isFunction(val: unknown) {
  return typeof val === 'function';
}

export function generateFunctionDecorator(name: string, decorator: (...args: any[]) => any, ...args: any[]) {
  return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
    if (descriptor.value != null) {
      descriptor.value = decorator(descriptor.value, ...args);
    } else if (descriptor.get != null) {
      descriptor.get = decorator(descriptor.get, ...args);
    } else {
      throw `Only put a @${name}() decorator on a method or get accessor.`;
    }
  };
}
