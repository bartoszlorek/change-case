import type {MethodHandler} from '../types';

export function upperCase(): MethodHandler {
  return token => token.toText().toLocaleUpperCase();
}
