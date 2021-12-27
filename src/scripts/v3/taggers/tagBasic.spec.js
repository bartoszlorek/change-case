// @flow strict

import {createToken} from '../token';
import {tagBasic} from './tagBasic';

describe('tagBasic()', () => {
  it.each`
    value           | type
    ${'Hello'}      | ${'unknown'}
    ${','}          | ${'punctuation'}
    ${';'}          | ${'punctuation'}
    ${'('}          | ${'punctuation'}
    ${' '}          | ${'whitespace'}
    ${'   '}        | ${'whitespace'}
    ${':'}          | ${'colon'}
    ${'-'}          | ${'hyphen'}
    ${'.'}          | ${'end'}
    ${'?'}          | ${'end'}
    ${'!'}          | ${'end'}
    ${"'"}          | ${'apostrophe'}
    ${'’'}          | ${'apostrophe'}
    ${'1'}          | ${'numeric'}
    ${'14'}         | ${'numeric'}
    ${'30kg'}       | ${'numeric'}
    ${'123.45'}     | ${'numeric'}
    ${'123,456.78'} | ${'numeric'}
  `('returns tagged "$value" to $type', ({value, type}) => {
    const tokens = createToken(value);
    expect(tagBasic(tokens).type).toBe(type);
  });
});
