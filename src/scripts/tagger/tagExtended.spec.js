// @flow strict

import {tagExtended} from './tagExtended';

describe('tagExtended()', () => {
  it.each([
    [
      ['Tips', 'unassigned', 'noun'],
      [' ', 'whitespace'],
      ['and', 'unassigned', 'conjunction'],
      [' ', 'whitespace'],
      ['advice', 'unassigned', 'noun'],
      [' ', 'whitespace'],
      ['for', 'unassigned', 'preposition'],
      [' ', 'whitespace'],
      ['travelers', 'unassigned', 'noun'],
      ['!', 'end'],
    ],
    [
      ['Lay', 'unassigned', 'verb'],
      [' ', 'whitespace'],
      ['it', 'unassigned', 'pronoun'],
      [' ', 'whitespace'],
      ['all', 'unassigned', 'determiner'],
      [' ', 'whitespace'],
      ['on', 'unassigned', 'preposition'],
      [' ', 'whitespace'],
      ['me', 'unassigned', 'pronoun'],
      ['.', 'end'],
    ],
    [
      ['it', 'unassigned', 'pronoun'],
      ['’', 'punctuation'],
      ['s', 'unassigned', 'noun'],
      [' ', 'whitespace'],
      ['on', 'unassigned', 'preposition'],
      [' ', 'whitespace'],
      ['again', 'unassigned', 'adverb'],
    ],
    [
      ['There', 'unassigned', 'adverb'],
      [' ', 'whitespace'],
      ['he', 'unassigned', 'pronoun'],
      [' ', 'whitespace'],
      ['found', 'unassigned', 'verb'],
      [' ', 'whitespace'],
      ['an', 'unassigned', 'article'],
      [' ', 'whitespace'],
      ['inferno', 'unassigned', 'noun'],
    ],
  ])('tags correctly "%s"', (...args) => {
    const tokens = args.map(arg => ({
      value: arg[0],
      type: arg[1],
    }));

    const expected = args.map(arg => ({
      value: arg[0],
      type: arg[2] || arg[1],
    }));

    expect(tagExtended(tokens)).toEqual(expected);
  });
});
