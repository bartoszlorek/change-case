export function spliceString(
  value: string,
  replacement: string,
  start?: number,
  end?: number
) {
  return value.slice(0, start) + replacement + value.slice(end);
}

export function upperCaseFirst(value: string) {
  if (value.length > 0) {
    return value[0].toLocaleUpperCase() + value.slice(1).toLocaleLowerCase();
  }
  return '';
}

export function startsNumeric(value: string) {
  return /^[0-9]/.test(value);
}
