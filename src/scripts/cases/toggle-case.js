import lowerCase from './lower-case';
import upperCase from './upper-case';

function toggleCase(string) {
  return string.split('').reduce((result, char) => {
    const upperChar = upperCase(char);

    if (char === upperChar) {
      return result + lowerCase(char);
    }
    return result + upperChar;
  }, '');
}

export default toggleCase;
