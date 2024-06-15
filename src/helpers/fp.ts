export function pipe<A>(): (value: A) => A;
export function pipe<A, B>(fn1: (value: A) => B): (value: A) => B;

export function pipe<A, B, C>(
  fn1: (value: A) => B,
  fn2: (value: B) => C
): (value: A) => C;

export function pipe<A, B, C, D>(
  fn1: (value: A) => B,
  fn2: (value: B) => C,
  fn3: (value: C) => D
): (value: A) => D;

export function pipe<A, B, C, D, E>(
  fn1: (value: A) => B,
  fn2: (value: B) => C,
  fn3: (value: C) => D,
  fn4: (value: D) => E
): (value: A) => E;

export function pipe<A, B, C, D, E, F>(
  fn1: (value: A) => B,
  fn2: (value: B) => C,
  fn3: (value: C) => D,
  fn4: (value: D) => E,
  fn5: (value: E) => F
): (value: A) => F;

export function pipe<A, B, C, D, E, F, G>(
  fn1: (value: A) => B,
  fn2: (value: B) => C,
  fn3: (value: C) => D,
  fn4: (value: D) => E,
  fn5: (value: E) => F,
  fn6: (value: F) => G
): (value: A) => G;

export function pipe<A, B, C, D, E, F, G, H>(
  fn1: (value: A) => B,
  fn2: (value: B) => C,
  fn3: (value: C) => D,
  fn4: (value: D) => E,
  fn5: (value: E) => F,
  fn6: (value: F) => G,
  fn7: (value: G) => H
): (value: A) => H;

export function pipe<A, B, C, D, E, F, G, H, I>(
  fn1: (value: A) => B,
  fn2: (value: B) => C,
  fn3: (value: C) => D,
  fn4: (value: D) => E,
  fn5: (value: E) => F,
  fn6: (value: F) => G,
  fn7: (value: G) => H,
  fn8: (value: H) => I
): (value: A) => I;

/**
 * https://dev.to/nexxeln/implementing-the-pipe-operator-in-typescript-30ip
 * https://stackoverflow.com/questions/65154695/typescript-types-for-a-pipe-function
 */
export function pipe(...fns: Function[]): unknown {
  return (value: any) => fns.reduce((result, fn) => fn(result), value);
}
