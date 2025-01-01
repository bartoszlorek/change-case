import type {MethodHandler} from '../types';

/**
 * @unimplemented
 */
export function titleCase(): MethodHandler {
  return token => token.toText();
}
