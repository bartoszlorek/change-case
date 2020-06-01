// @flow strict

import {tagBasic} from './tagBasic';

describe('tagBasic()', () => {
  it.each`
    value      | expectedType
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
  `('tags "$value" to $expectedType', ({value, expectedType}) => {
    const tokens = [{value, type: 'unassigned'}];
    const expected = [{value, type: expectedType}];
    expect(tagBasic(tokens)).toEqual(expected);
  });
});
