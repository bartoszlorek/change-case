import parseCommaList from '../../src/scripts/operators/.internal/parse-comma-list';

it('should return empty array', () => {
  expect(parseCommaList()).toEqual([]);
  expect(parseCommaList(null)).toEqual([]);
  expect(parseCommaList('')).toEqual([]);
  expect(parseCommaList('  ')).toEqual([]);
});

it('should split comma-separated string into array', () => {
  expect(parseCommaList('a,b,c')).toEqual(['a', 'b', 'c']);
});

it('should trim string', () => {
  expect(parseCommaList(' a,b bb , c ')).toEqual(['a', 'b bb', 'c']);
});
