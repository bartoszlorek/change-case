// @flow strict

import {upperCaseFirst} from './upperCaseFirst';

describe('upperCaseFirst()', () => {
  it('uppercases only first letter', () => {
    expect(upperCaseFirst('hello')).toBe('Hello');
  });
});
