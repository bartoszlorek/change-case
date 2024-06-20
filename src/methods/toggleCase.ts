import {createDefinition} from './types';
import {lowerCaseV3} from './lowerCase';
import {upperCaseV3} from './upperCase';

import {lowerCase} from './lowerCase';
import {upperCase} from './upperCase';

export const toggleCaseDef = createDefinition({
  name: 'toggleCase',
  text: 'tOGGLE cASE',
});

export function toggleCase(value: string) {
  return value.split('').reduce((result, char) => {
    const upperChar = upperCase(char);

    if (char === upperChar) {
      return result + lowerCase(char);
    }
    return result + upperChar;
  }, '');
}

export function toggleCaseV3(input: string) {
  return [...input]
    .map(char => {
      const upperChar = upperCaseV3(char);

      if (char === upperChar) {
        return lowerCaseV3(char);
      }
      return upperChar;
    })
    .join('');
}
