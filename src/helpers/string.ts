export function spliceString(
  value: string,
  replacement: string,
  start?: number,
  end?: number
) {
  return value.slice(0, start) + replacement + value.slice(end);
}

export function lowerCase(value: string) {
  return value.toLocaleLowerCase();
}

export function upperCase(value: string) {
  return value.toLocaleUpperCase();
}

export function upperCaseFirst(value: string) {
  if (value.length > 0) {
    return upperCase(value[0]) + lowerCase(value.slice(1));
  }
  return '';
}

export function startsNumeric(value: string) {
  return /^[0-9]/.test(value);
}
