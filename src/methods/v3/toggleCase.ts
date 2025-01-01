import {lowerCase, upperCase} from '../../helpers';
import type {MethodHandler} from '../types';

export function toggleCase(): MethodHandler {
  return token => {
    let result = '';
    for (const char of [...token.toText()]) {
      const upperChar = upperCase(char);
      result += char !== upperChar ? upperChar : lowerCase(char);
    }
    return result;
  };
}
