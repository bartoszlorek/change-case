// @flow strict

import {createToken} from '../tokenizer/createToken';
import {tagBasic} from './tagBasic';
import {tagExtended} from './tagExtended';

describe('tagExtended()', () => {
  it.each`
    value          | type
    ${'it'}        | ${'unassigned'}
    ${'all'}       | ${'unassigned'}
    ${'on'}        | ${'preposition'}
    ${'around'}    | ${'preposition'}
    ${'me'}        | ${'unassigned'}
    ${'.'}         | ${'end'}
    ${'again'}     | ${'unassigned'}
    ${'advice'}    | ${'unassigned'}
    ${'travelers'} | ${'unassigned'}
    ${'he'}        | ${'unassigned'}
    ${'for'}       | ${'coordinating_conjunction'}
    ${'or'}        | ${'coordinating_conjunction'}
    ${'until'}     | ${'subordinating_conjunction'}
    ${'before'}    | ${'subordinating_conjunction'}
    ${'a'}         | ${'article'}
    ${'an'}        | ${'article'}
    ${'the'}       | ${'article'}
  `('tags "$value" to $type', ({value, type}) => {
    const tokens = tagBasic([createToken(value)]);
    expect(tagExtended(tokens)[0].type).toBe(type);
  });
});
