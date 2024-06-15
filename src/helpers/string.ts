export function spliceString(
  value: string,
  replacement: string,
  start?: number,
  end?: number
) {
  return value.slice(0, start) + replacement + value.slice(end);
}
