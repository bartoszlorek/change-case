// @flow strict

import {tagAbbreviation} from './tagAbbreviation';

describe('tagAbbreviation()', () => {
  it('does not tag words not followed by dot', () => {
    const tokens = [
      {value: 'Hello', type: 'unassigned'},
      {value: ' ', type: 'whitespace'},
      {value: 'world', type: 'unassigned'},
    ];
    expect(tagAbbreviation(tokens)).toEqual([
      {value: 'Hello', type: 'unassigned'},
      {value: ' ', type: 'whitespace'},
      {value: 'world', type: 'unassigned'},
    ]);
  });

  it('tags one letter abbreviation', () => {
    const tokens = [
      {value: 'A', type: 'unassigned'},
      {value: '.', type: 'end'},
      {value: 'B', type: 'unassigned'},
      {value: '.', type: 'end'},
    ];
    expect(tagAbbreviation(tokens)).toEqual([
      {value: 'A', type: 'unassigned'},
      {value: '.', type: 'abbreviation'},
      {value: 'B', type: 'unassigned'},
      {value: '.', type: 'abbreviation'},
    ]);
  });

  it('tags two letters abbreviation', () => {
    const tokens = [
      {value: 'no', type: 'unassigned'},
      {value: '.', type: 'end'},
    ];
    expect(tagAbbreviation(tokens)).toEqual([
      {value: 'no', type: 'unassigned'},
      {value: '.', type: 'abbreviation'},
    ]);
  });

  it('tags three letters abbreviation', () => {
    const tokens = [
      {value: 'est', type: 'unassigned'},
      {value: '.', type: 'end'},
    ];
    expect(tagAbbreviation(tokens)).toEqual([
      {value: 'est', type: 'unassigned'},
      {value: '.', type: 'abbreviation'},
    ]);
  });

  it('tags common four letters and more abbreviation', () => {
    const tokens = [
      {value: 'Capt', type: 'unassigned'},
      {value: '.', type: 'end'},
      {value: 'Acad', type: 'unassigned'},
      {value: '.', type: 'end'},
    ];
    expect(tagAbbreviation(tokens)).toEqual([
      {value: 'Capt', type: 'unassigned'},
      {value: '.', type: 'abbreviation'},
      {value: 'Acad', type: 'unassigned'},
      {value: '.', type: 'abbreviation'},
    ]);
  });

  it('ignore dots preceded by another dot', () => {
    const tokens = [
      {value: 'A', type: 'unassigned'},
      {value: '.', type: 'end'},
      {value: '.', type: 'end'},
    ];
    expect(tagAbbreviation(tokens)).toEqual([
      {value: 'A', type: 'unassigned'},
      {value: '.', type: 'abbreviation'},
      {value: '.', type: 'end'},
    ]);
  });
});
