import parseCommaList from './parse-comma-list';

describe('parseCommaList()', () => {
  it.each`
    data              | result
    ${undefined}      | ${[]}
    ${null}           | ${[]}
    ${''}             | ${[]}
    ${'  '}           | ${[]}
    ${'a,b,c'}        | ${['a', 'b', 'c']}
    ${' a,b bb , c '} | ${['a', 'b bb', 'c']}
  `('"$data" --> $result', ({data, result}) => {
    expect(parseCommaList(data)).toEqual(result);
  });
});
