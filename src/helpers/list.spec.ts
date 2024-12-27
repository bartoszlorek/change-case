import {parseCommaList} from './list';

describe('parseCommaList()', () => {
  it.each`
    input             | output
    ${''}             | ${[]}
    ${'  '}           | ${[]}
    ${'a,b,c'}        | ${['a', 'b', 'c']}
    ${'a,a,c'}        | ${['a', 'c']}
    ${' a,b bb , c '} | ${['a', 'b bb', 'c']}
  `('"$input" => $output', ({input, output}) => {
    expect(parseCommaList(input)).toEqual(output);
  });
});
