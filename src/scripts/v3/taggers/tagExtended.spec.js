// @flow strict

import {createToken} from '../token';
import {tagBasic} from './tagBasic';
import {tagExtended} from './tagExtended';

describe('tagExtended()', () => {
  it.each`
    value          | type
    ${'it'}        | ${'unknown'}
    ${'all'}       | ${'unknown'}
    ${'on'}        | ${'preposition'}
    ${'around'}    | ${'preposition'}
    ${'me'}        | ${'unknown'}
    ${'again'}     | ${'unknown'}
    ${'advice'}    | ${'unknown'}
    ${'travelers'} | ${'unknown'}
    ${'he'}        | ${'unknown'}
    ${'for'}       | ${'coordinating_conjunction'}
    ${'or'}        | ${'coordinating_conjunction'}
    ${'until'}     | ${'subordinating_conjunction'}
    ${'before'}    | ${'subordinating_conjunction'}
    ${'a'}         | ${'article'}
    ${'an'}        | ${'article'}
    ${'the'}       | ${'article'}
  `('returns tagged "$value" to $type', ({value, type}) => {
    expect(tagExtended(createToken(value)).type).toBe(type);
  });
});
