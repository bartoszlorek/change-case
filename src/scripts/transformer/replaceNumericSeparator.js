// @flow strict

export function replaceNumericSeparator(value: string, replacer: string) {
  return value.replace(/[.,]/g, replacer);
}
