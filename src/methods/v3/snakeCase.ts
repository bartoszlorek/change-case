import {lowerCase} from '../../helpers';
import type {MethodHandler} from '../types';

export function snakeCase(): MethodHandler {
  let didStart = false;

  return token => {
    if (token.isEmpty()) {
      return '';
    }

    if (!didStart) {
      didStart = true;
      return lowerCase(token.value);
    }

    return '_' + lowerCase(token.value);
  };
}
