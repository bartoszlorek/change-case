// @flow strict

import {upperCaseFirst} from './upperCaseFirst';

describe('upperCaseFirst()', () => {
  it('changes first letter only', () => {
    expect(upperCaseFirst('hello')).toBe('Hello');
  });
});
