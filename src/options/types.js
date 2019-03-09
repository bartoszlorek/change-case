export const isFalsy = value => value == null || value === '';
export const isTruthy = value => !isFalsy(value);
