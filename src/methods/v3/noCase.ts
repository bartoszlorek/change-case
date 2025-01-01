import type {MethodHandler} from '../types';

/**
 * @deprecated
 */
export function noCase(): MethodHandler {
  return token => token.toText();
}
