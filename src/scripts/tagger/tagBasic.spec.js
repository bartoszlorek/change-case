// @flow strict

import {tagBasic} from './tagBasic';

describe('tagBasic()', () => {
  it.each`
    value      | type
    ${'Hello'} | ${'unassigned'}
    ${','}     | ${'punctuation'}
    ${';'}     | ${'punctuation'}
    ${'('}     | ${'punctuation'}
    ${' '}     | ${'whitespace'}
    ${'   '}   | ${'whitespace'}
    ${':'}     | ${'colon'}
    ${'-'}     | ${'hyphen'}
    ${'.'}     | ${'end'}
    ${'?'}     | ${'end'}
    ${'!'}     | ${'end'}
  `('tags "$value" to $type', ({value, type}) => {
    expect(tagBasic([value])).toEqual([{value, type}]);
  });
});
