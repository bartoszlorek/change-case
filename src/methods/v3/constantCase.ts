import {upperCase} from '../../helpers';
import type {MethodHandler} from '../types';

export function constantCase(): MethodHandler {
  let didStart = false;

  return token => {
    if (token.isEmpty()) {
      return '';
    }

    if (!didStart) {
      didStart = true;
      return upperCase(token.value);
    }

    return '_' + upperCase(token.value);
  };
}
