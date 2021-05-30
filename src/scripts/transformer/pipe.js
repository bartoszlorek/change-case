// @flow strict

export function pipe<T>(...fns: $ReadOnlyArray<(T) => T>): T => T {
  return x => fns.reduce((v, fn) => fn(v), x);
}
