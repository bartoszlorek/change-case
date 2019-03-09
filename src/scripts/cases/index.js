/**
 * The most cases are based on change-case by Blake Embrey
 * https://github.com/blakeembrey/change-case
 */

import camelCase from './camel-case';
import constantCase from './constant-case';
import dotCase from './dot-case';
import lowerCase from './lower-case';
import noAccents from './no-accents';
import noCase from './no-case';
import paramCase from './param-case';
import pascalCase from './pascal-case';
import sentenceCase from './sentence-case';
import snakeCase from './snake-case';
import titleCase from './title-case';
import toggleCase from './toggle-case';
import upperCase from './upper-case';

export default {
  upperCase,
  lowerCase,
  titleCase,
  sentenceCase,

  camelCase,
  pascalCase,
  constantCase,

  paramCase,
  snakeCase,
  dotCase,

  toggleCase,
  noAccents,
  noCase: value => noCase(value, ' ')
};
