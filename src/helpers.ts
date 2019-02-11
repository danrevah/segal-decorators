export function isObject(val: any) {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
}

export function isUndefined(val: any) {
  return typeof val === 'undefined';
}
