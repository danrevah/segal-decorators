import { isFunction } from '../../helpers/general';

export function Bind(target: object, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  if (!descriptor || !isFunction(descriptor.value)) {
    throw `Only put a @Bind decorator on a method or get accessor.`;
  }

  return {
    configurable: true,
    get() {
      const withBind = descriptor.value.bind(this);

      Object.defineProperty(this, propertyKey, {
        configurable: true,
        writable: true,
        value: withBind,
      });

      return withBind;
    },
  };
}
