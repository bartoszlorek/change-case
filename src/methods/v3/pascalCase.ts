import {upperCaseFirst, startsNumeric} from '../../helpers';
import type {MethodHandler} from '../types';

export function pascalCase(): MethodHandler {
  let didStart = false;

  return token => {
    if (token.isEmpty()) {
      return '';
    }

    if (startsNumeric(token.value)) {
      return didStart ? '_' + token.value : token.value;
    }

    didStart = true;
    return upperCaseFirst(token.value);
  };
}
