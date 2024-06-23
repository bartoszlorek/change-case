export interface Token {
  index: number;
  value: string;
  break: string;
}

export function nextToken(token: Token, array: Token[]) {
  const index = array.indexOf(token);
  return (index >= 0 && array[index + 1]) || null;
}

export function prevToken(token: Token, array: Token[]) {
  const index = array.indexOf(token);
  return (index >= 0 && array[index - 1]) || null;
}

export function isEmptyToken(token: Token) {
  return token.value === '';
}

export function isNotEmptyToken(token: Token) {
  return token.value !== '';
}
