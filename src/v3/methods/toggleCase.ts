import {createDefinition} from './types';
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
