import type {Token} from '../tokenizer';

export type MethodName =
  | 'camelCase'
  | 'constantCase'
  | 'dotCase'
  | 'lowerCase'
  | 'noAccents'
  | 'noCase'
  | 'paramCase'
  | 'pascalCase'
  | 'sentenceCase'
  | 'snakeCase'
  | 'titleCase'
  | 'toggleCase'
  | 'upperCase';

export type MethodHandler = (token: Token) => string;
