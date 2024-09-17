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

export type MethodType = (input: string) => string;
