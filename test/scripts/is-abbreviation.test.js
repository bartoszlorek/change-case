import isAbbreviation from '../../src/scripts/cases/.internal/is-abbreviation';

it('should handle errors', () => {
  expect(isAbbreviation()).toBe(false);
  expect(isAbbreviation(null)).toBe(false);
  expect(isAbbreviation('')).toBe(false);
});

it('should handle abbreviation value', () => {
  expect(isAbbreviation('I am A.B.')).toBe(true);
  expect(isAbbreviation('e.g.')).toBe(true);
  expect(isAbbreviation('and now A.D.')).toBe(true);
  expect(isAbbreviation('alt.')).toBe(true);
  expect(isAbbreviation('hello Sgt.')).toBe(true);
});

it('should handle non-abbreviation value', () => {
  expect(isAbbreviation('ok')).toBe(false);
  expect(isAbbreviation('doggy.')).toBe(false);
  expect(isAbbreviation('Mom?')).toBe(false);
  expect(isAbbreviation('there.')).toBe(false);
});
