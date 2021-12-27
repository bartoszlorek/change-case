// @flow strict

import {createToken} from '../tokenizer/createToken';
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
    ${"'"}     | ${'apostrophe'}
    ${'’'}     | ${'apostrophe'}
    ${'1'}     | ${'numeric'}
    ${'14'}    | ${'numeric'}
    ${'30kg'}  | ${'numeric'}
  `('tags "$value" to $type', ({value, type}) => {
    const tokens = [createToken(value)];
    expect(tagBasic(tokens)[0].type).toBe(type);
  });
});
