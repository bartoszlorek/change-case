import noCase from './no-case';
import upperCase from './upper-case';

function camelCase(string, mergeNumbers) {
  string = noCase(string, ' ');

  if (!mergeNumbers) {
    string = string.replace(/ (?=\d)/g, '_');
  }

  return string.replace(/ (.)/g, function(m, $1) {
    return upperCase($1);
  });
}

export default camelCase;
