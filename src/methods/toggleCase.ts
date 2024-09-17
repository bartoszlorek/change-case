import {lowerCase, upperCase} from '../helpers';

// legacy
import {lowerCase as legacyLoweCase} from './lowerCase';
import {upperCase as legacyUpperCase} from './upperCase';

export function toggleCase(value: string) {
  return value.split('').reduce((result, char) => {
    const upperChar = legacyUpperCase(char);

    if (char === upperChar) {
      return result + legacyLoweCase(char);
    }
    return result + upperChar;
  }, '');
}

export function toggleCaseV3(input: string) {
  return [...input]
    .map(char => {
      const upperChar = upperCase(char);

      if (char === upperChar) {
        return lowerCase(char);
      }
      return upperChar;
    })
    .join('');
}
