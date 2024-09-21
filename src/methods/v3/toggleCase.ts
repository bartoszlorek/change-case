import {lowerCase, upperCase} from '../../helpers';

export function toggleCase(input: string) {
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
