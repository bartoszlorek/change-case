// @flow strict

import {getLastProperIndex} from './getLastProperIndex';

describe('getLastProperIndex()', () => {
  it('returns index of last unassigned token', () => {
    const tokens = [
      {value: 'in', type: 'preposition'},
      {value: ' ', type: 'whitespace'},
      {value: 'house', type: 'unassigned'},
      {value: '.', type: 'end'},
    ];
    expect(getLastProperIndex(tokens)).toBe(2);
  });

  it('returns index of last article token', () => {
    const tokens = [
      {value: ' ', type: 'whitespace'},
      {value: 'the', type: 'article'},
      {value: ' ', type: 'whitespace'},
      {value: '19th', type: 'numeric'},
      {value: '.', type: 'end'},
    ];
    expect(getLastProperIndex(tokens)).toBe(1);
  });

  it('returns index of last preposition token', () => {
    const tokens = [
      {value: 'maybe', type: 'unassigned'},
      {value: ' ', type: 'whitespace'},
      {value: 'in', type: 'preposition'},
      {value: '!', type: 'end'},
      {value: '?', type: 'end'},
    ];
    expect(getLastProperIndex(tokens)).toBe(2);
  });

  it('returns index of last subordinating_conjunction token', () => {
    const tokens = [
      {value: ' ', type: 'whitespace'},
      {value: 'after', type: 'subordinating_conjunction'},
      {value: '!', type: 'end'},
    ];
    expect(getLastProperIndex(tokens)).toBe(1);
  });

  it('returns index of last coordinating_conjunction token', () => {
    const tokens = [
      {value: 'for', type: 'coordinating_conjunction'},
      {value: ' ', type: 'whitespace'},
    ];
    expect(getLastProperIndex(tokens)).toBe(0);
  });

  it('returns -1 when array does not contain proper token', () => {
    const tokens = [
      {value: ' ', type: 'whitespace'},
      {value: '19th', type: 'numeric'},
      {value: ' ', type: 'whitespace'},
      {value: '1900', type: 'numeric'},
      {value: '.', type: 'end'},
    ];
    expect(getLastProperIndex(tokens)).toBe(-1);
  });
});
