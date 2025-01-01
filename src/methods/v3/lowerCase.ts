import type {MethodHandler} from '../types';

export function lowerCase(): MethodHandler {
  return token => token.toText().toLocaleLowerCase();
}
