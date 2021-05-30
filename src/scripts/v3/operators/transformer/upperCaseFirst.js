// @flow strict

export function upperCaseFirst(value: string) {
  return value[0].toUpperCase() + value.substr(1);
}
