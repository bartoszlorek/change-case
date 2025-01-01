import {renderString} from '../../tokenizer';
import {titleCase} from './titleCase';

describe('titleCase()', () => {
  it('is not implemented', () => {
    expect(renderString('hello world', titleCase())).toBe('hello world');
  });
});
