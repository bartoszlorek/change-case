import {lowerCase, upperCaseFirst, startsNumeric} from '../../helpers';
import type {MethodHandler} from '../types';

export function camelCase(): MethodHandler {
  let didStart = false;

  return token => {
    if (token.isEmpty()) {
      return '';
    }

    if (!didStart) {
      didStart = true;
      return lowerCase(token.value);
    }

    if (startsNumeric(token.value)) {
      return '_' + token.value;
    }

    return upperCaseFirst(token.value);
  };
}
