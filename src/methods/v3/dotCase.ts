import {lowerCase} from '../../helpers';
import type {MethodHandler} from '../types';

export function dotCase(): MethodHandler {
  let didStart = false;

  return token => {
    if (token.isEmpty()) {
      return '';
    }

    if (!didStart) {
      didStart = true;
      return lowerCase(token.value);
    }

    return '.' + lowerCase(token.value);
  };
}
