// @flow strict

import {tagAbbreviation} from './tagAbbreviation';
import {createTokenContext} from '../token';

describe('tagAbbreviation()', () => {
  it('returns an untagged word', () => {
    const ctx = createTokenContext(['hello']);
    const token = tagAbbreviation(ctx)(ctx[0]);

    expect(token.type).toBe('unknown');
  });

  it('returns an untagged dot not preceded by another token', () => {
    const ctx = createTokenContext(['.']);
    const token = tagAbbreviation(ctx)(ctx[0]);

    expect(token.type).toBe('unknown');
  });

  it('returns an untagged dot preceded by another dot', () => {
    const ctx = createTokenContext(['.', '.']);
    const token = tagAbbreviation(ctx)(ctx[1]);

    expect(token.type).toBe('unknown');
  });

  it('returns tagged one letter abbreviation', () => {
    const ctx = createTokenContext(['A', '.']);
    const token = tagAbbreviation(ctx)(ctx[1]);

    expect(token.type).toBe('abbreviation');
  });

  it('returns tagged two letters abbreviation', () => {
    const ctx = createTokenContext(['no', '.']);
    const token = tagAbbreviation(ctx)(ctx[1]);

    expect(token.type).toBe('abbreviation');
  });

  it('returns tagged three letters abbreviation', () => {
    const ctx = createTokenContext(['est', '.']);
    const token = tagAbbreviation(ctx)(ctx[1]);

    expect(token.type).toBe('abbreviation');
  });

  it('returns tagged common abbreviation', () => {
    const ctx = createTokenContext(['Capt', '.']);
    const token = tagAbbreviation(ctx)(ctx[1]);

    expect(token.type).toBe('abbreviation');
  });
});
